#!/bin/bash
set -Eeuo pipefail
[[ ${1:-} == --schema-compatible ]] || { echo 'Confirm previous code supports the current database: --schema-compatible' >&2; exit 1; }
root=/opt/likar
exec 9>"$root/shared/operations.lock"
flock -n 9
previous=$(readlink -f "$root/previous")
current=$(readlink -f "$root/current")
test -f "$previous/.deployed"
dc="$previous/deploy/compose.sh"
while read -r image; do docker image inspect "$image" >/dev/null; done < <(bash "$dc" config --images)
bash "$current/deploy/compose.sh" exec -T app php artisan down --retry=60
bash "$current/deploy/compose.sh" stop app worker scheduler ssr
LIKAR_LOCK_HELD=1 bash "$current/deploy/backup.sh" full
bash "$dc" run --rm -T --no-deps app php artisan view:cache
ln -sfn "$previous" "$root/current"
bash "$dc" up -d --wait --wait-timeout 180 app ssr web
bash "$dc" exec -T app php artisan up
bash "$dc" up -d --wait --wait-timeout 90 worker scheduler
echo 'Previous application restored. Database migrations were not reversed.'
