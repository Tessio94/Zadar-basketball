#!/bin/sh
set -eu
cd /var/www/html
mkdir -p storage/framework/cache/data storage/framework/sessions storage/framework/views storage/logs
php artisan config:cache >/dev/null
php artisan route:cache >/dev/null
exec "$@"
