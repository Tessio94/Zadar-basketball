#!/bin/bash
set -Eeuo pipefail
release_dir=$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")/.." && pwd -P)
exec docker compose --project-name likar \
  --env-file /opt/likar/shared/compose.env \
  --env-file "$release_dir/.release.env" \
  --file "$release_dir/compose.production.yaml" "$@"
