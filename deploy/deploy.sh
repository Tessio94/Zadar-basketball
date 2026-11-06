#!/bin/bash
set -Eeuo pipefail
umask 027
root=/opt/likar
[[ $# -ge 1 && $1 =~ ^[0-9a-f]{40}$ ]] || { echo 'Supply a full 40-character Git commit SHA.' >&2; exit 1; }
sha=$1
prepare=${2:-}
[[ -z $prepare || $prepare == --prepare ]] || exit 1
exec 9>"$root/shared/operations.lock"
flock -n 9 || { echo 'Another deployment or backup is running.' >&2; exit 1; }
git -C "$root/repo" fetch --prune origin
git -C "$root/repo" cat-file -e "$sha^{commit}"
release="$root/releases/${sha:0:12}-$(date -u +%Y%m%d%H%M%S)"
if [[ -L "$root/current" && ! -e "$root/current/.deployed" && -f "$root/current/.release.env" ]]; then
  candidate=$(readlink -f "$root/current")
  if [[ $(git -C "$candidate" rev-parse HEAD) == "$sha" ]]; then release="$candidate"; fi
fi
if [[ ! -d $release ]]; then git -C "$root/repo" worktree add --detach "$release" "$sha"; fi
[[ $(git -C "$release" rev-parse HEAD) == "$sha" ]] || exit 1
printf 'RELEASE_TAG=%s\nSOURCE_COMMIT=%s\n' "$(basename "$release")" "$sha" > "$release/.release.env"
dc="$release/deploy/compose.sh"
bash "$dc" config --quiet
COMPOSE_PARALLEL_LIMIT=1 bash "$dc" build --pull app ssr web
if [[ $prepare == --prepare ]]; then
  [[ ! -e "$root/current/.deployed" ]] || { echo 'Prepare is only for initial installation.' >&2; exit 1; }
  bash "$dc" up -d --wait db
  ln -sfn "$release" "$root/current"
  echo 'Database ready. Import existing data/uploads if required; then deploy the same SHA without --prepare.'
  exit 0
fi
trap 'echo "Deployment stopped. Maintenance may remain active; inspect logs before recovery. No automatic database rollback was attempted." >&2' ERR
previous=''
if [[ -e "$root/current/.deployed" ]]; then
  previous=$(readlink -f "$root/current")
  bash "$previous/deploy/compose.sh" exec -T app php artisan down --retry=60
  bash "$previous/deploy/compose.sh" stop app worker scheduler ssr
  LIKAR_LOCK_HELD=1 bash "$previous/deploy/backup.sh" full
fi
bash "$dc" up -d --wait db
bash "$dc" run --rm -T --no-deps app php artisan migrate --force
bash "$dc" run --rm -T --no-deps app php artisan view:cache
ln -sfn "$release" "$root/current"
bash "$dc" up -d --wait --wait-timeout 180 app ssr web
bash "$dc" exec -T app php artisan up
bash "$dc" up -d --wait --wait-timeout 90 worker scheduler
if [[ -n $previous ]]; then ln -sfn "$previous" "$root/previous"; fi
touch "$release/.deployed"
echo "Deployed $sha. Verify public HTTPS, login, uploads and a game page."
