#!/bin/bash
set -Eeuo pipefail
umask 077
exec 9>/opt/likar/shared/operations.lock
flock -w 300 9
set -a
source /opt/likar/shared/restic.env
set +a
restic forget --tag likar --group-by host,tags \
  --keep-daily 14 --keep-weekly 8 --keep-monthly 6 --prune
restic check
