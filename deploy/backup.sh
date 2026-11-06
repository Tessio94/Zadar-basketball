#!/bin/bash
set -Eeuo pipefail
umask 077
mode=${1:-db}
[[ $mode == db || $mode == full ]] || { echo 'Mode must be db or full.' >&2; exit 1; }
root=/opt/likar
dc="$root/current/deploy/compose.sh"
if [[ ${LIKAR_LOCK_HELD:-0} != 1 ]]; then
  exec 9>"$root/shared/operations.lock"
  flock -w 300 9 || { echo 'Backup could not acquire operation lock.' >&2; exit 1; }
fi
stamp=$(date -u +%Y%m%dT%H%M%SZ)
folder="$root/backups/$mode-$stamp"
temporary="$folder.partial"
mkdir -p "$temporary"
trap 'echo "Backup job failed; inspect $temporary, $folder and remote upload logs" >&2' ERR
bash "$dc" exec -T db sh -c \
  'PGPASSWORD="$APP_DB_PASSWORD" exec pg_dump -h 127.0.0.1 -U likar -d likar -Fc --no-owner --no-acl' \
  > "$temporary/database.dump"
test -s "$temporary/database.dump"
bash "$dc" exec -T db pg_restore --list < "$temporary/database.dump" >/dev/null
if [[ $mode == full ]]; then
  bash "$dc" run --rm -T --no-deps --entrypoint tar app \
    -C /var/www/html/storage/app -cf - public private > "$temporary/uploads.tar"
  tar -tf "$temporary/uploads.tar" >/dev/null
  cp "$root/shared/app.env" "$root/shared/db.env" "$root/shared/compose.env" "$temporary/"
fi
cp "$root/current/.release.env" "$temporary/release.env"
mv "$temporary" "$folder"
if [[ -f "$root/shared/restic.env" ]]; then
  set -a
  source "$root/shared/restic.env"
  set +a
  restic backup "$root/backups" --exclude '*.partial' --tag likar
  date -u +%FT%TZ > "$root/shared/last-offsite-success"
else
  echo 'WARNING: local backup only; off-server restic is not configured.' >&2
fi
find "$root/backups" -mindepth 1 -maxdepth 1 -type d -name 'db-20*Z' -mtime +14 -exec rm -rf -- {} +
find "$root/backups" -mindepth 1 -maxdepth 1 -type d -name 'full-20*Z' -mtime +7 -exec rm -rf -- {} +
date -u +%FT%TZ > "$root/shared/last-backup-success"
if [[ $mode == full ]]; then date -u +%FT%TZ > "$root/shared/last-full-backup-success"; fi
echo "Backup complete: $folder"
