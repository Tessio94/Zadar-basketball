#!/bin/bash
set -Eeuo pipefail
psql --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" --set=ON_ERROR_STOP=1 \
  --set=app_password="$APP_DB_PASSWORD" <<'SQL'
CREATE ROLE likar LOGIN NOSUPERUSER NOCREATEDB NOCREATEROLE PASSWORD :'app_password';
ALTER DATABASE likar OWNER TO likar;
ALTER SCHEMA public OWNER TO likar;
SQL
