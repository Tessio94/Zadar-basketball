#!/bin/bash
set -Eeuo pipefail
umask 077
[[ $# == 2 ]] || { echo 'Usage: bash deploy/create-env.sh example.com admin@example.com' >&2; exit 1; }
domain=$1
email=$2
[[ $domain =~ ^[a-z0-9][a-z0-9.-]*\.[a-z]{2,}$ ]] || exit 1
[[ $email =~ ^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$ ]] || exit 1
shared=/opt/likar/shared
mkdir -p "$shared"
for file in app.env db.env compose.env; do
  [[ ! -e "$shared/$file" ]] || { echo "Already exists: $shared/$file; nothing overwritten." >&2; exit 1; }
done
read -r -s -p 'Existing APP_KEY when migrating; blank only for a new database: ' app_key
printf '\n'
if [[ -z $app_key ]]; then app_key="base64:$(openssl rand -base64 32)"; fi
[[ $app_key =~ ^base64:[A-Za-z0-9+/]{43}=$ ]] || { echo 'Expected a Laravel base64 APP_KEY.' >&2; exit 1; }
db_password=$(openssl rand -hex 32)
postgres_password=$(openssl rand -hex 32)
cat > "$shared/app.env" <<EOF
APP_NAME="Likar Zadar"
APP_ENV=production
APP_KEY=$app_key
APP_DEBUG=false
APP_URL=https://$domain
APP_MAINTENANCE_DRIVER=file
LOG_CHANNEL=stderr
LOG_LEVEL=warning
DB_CONNECTION=pgsql
DB_HOST=db
DB_PORT=5432
DB_DATABASE=likar
DB_USERNAME=likar
DB_PASSWORD=$db_password
SESSION_DRIVER=database
SESSION_SECURE_COOKIE=true
SESSION_HTTP_ONLY=true
SESSION_SAME_SITE=lax
CACHE_STORE=database
QUEUE_CONNECTION=database
DB_QUEUE_RETRY_AFTER=90
FILESYSTEM_DISK=local
INERTIA_SSR_ENABLED=true
INERTIA_SSR_URL=http://ssr:13714
MAIL_MAILER=log
MAIL_SCHEME=smtp
MAIL_HOST=REPLACE_WITH_SMTP_HOST
MAIL_PORT=587
MAIL_USERNAME=REPLACE_WITH_SMTP_USERNAME
MAIL_PASSWORD=REPLACE_WITH_SMTP_PASSWORD
MAIL_FROM_ADDRESS=noreply@$domain
MAIL_FROM_NAME="Likar Zadar"
EOF
cat > "$shared/db.env" <<EOF
POSTGRES_DB=likar
POSTGRES_USER=postgres
POSTGRES_PASSWORD=$postgres_password
APP_DB_PASSWORD=$db_password
EOF
cat > "$shared/compose.env" <<EOF
DOMAIN=$domain
ACME_EMAIL=$email
VITE_TINYMCE_API_KEY=
EOF
echo 'Created private environment files. Configure SMTP and the public TinyMCE browser key before launch.'
