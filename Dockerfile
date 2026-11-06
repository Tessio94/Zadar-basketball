FROM node:24-bookworm-slim AS node
FROM composer:2 AS composer
FROM php:8.4-fpm-bookworm AS php-base
RUN apt-get update && apt-get install -y --no-install-recommends \
    ca-certificates curl git unzip libpq-dev libzip-dev libicu-dev \
    libpng-dev libjpeg62-turbo-dev libfreetype6-dev libwebp-dev \
    libsqlite3-dev libfcgi-bin \
    && docker-php-ext-configure gd --with-freetype --with-jpeg --with-webp \
    && docker-php-ext-install -j2 pdo_pgsql pdo_sqlite gd intl zip bcmath exif pcntl opcache \
    && rm -rf /var/lib/apt/lists/*
WORKDIR /var/www/html
FROM php-base AS build
COPY --from=composer /usr/bin/composer /usr/local/bin/composer
COPY --from=node /usr/local/bin/node /usr/local/bin/node
COPY --from=node /usr/local/lib/node_modules/npm /usr/local/lib/node_modules/npm
RUN ln -s /usr/local/lib/node_modules/npm/bin/npm-cli.js /usr/local/bin/npm
ENV COMPOSER_ALLOW_SUPERUSER=1 APP_ENV=testing \
    APP_KEY=base64:AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA= \
    DB_CONNECTION=sqlite DB_DATABASE=:memory: CACHE_STORE=array SESSION_DRIVER=array
COPY composer.json composer.lock ./
RUN composer install --no-interaction --prefer-dist --no-progress --no-scripts
COPY . .
RUN touch .env && mkdir -p bootstrap/cache storage/framework/cache/data \
    storage/framework/sessions storage/framework/views storage/logs \
    storage/app/public storage/app/private && composer dump-autoload --optimize
ARG VITE_APP_NAME="Likar Krombacher"
ARG VITE_TINYMCE_API_KEY=""
ENV VITE_APP_NAME=${VITE_APP_NAME} VITE_TINYMCE_API_KEY=${VITE_TINYMCE_API_KEY}
RUN npm ci && npm run types && npm run lint:check && npm run build:ssr
RUN php artisan test
FROM build AS production-deps
RUN composer install --no-dev --no-interaction --prefer-dist --optimize-autoloader --no-scripts \
    && rm -f .env bootstrap/cache/*.php && rm -rf node_modules tests .github
FROM php-base AS app
ENV APP_ENV=production
COPY --from=production-deps /var/www/html /var/www/html
RUN mkdir -p storage/app/public storage/app/private storage/framework/cache/data \
    storage/framework/sessions storage/framework/views storage/logs bootstrap/cache \
    && rm -rf public/storage && ln -s /var/www/html/storage/app/public public/storage \
    && chown -R www-data:www-data storage bootstrap/cache
COPY deploy/php.ini /usr/local/etc/php/conf.d/zz-production.ini
COPY deploy/php-fpm.conf /usr/local/etc/php-fpm.d/zz-likar.conf
COPY --chmod=755 deploy/entrypoint.sh /usr/local/bin/likar-entrypoint
USER www-data
ENTRYPOINT ["likar-entrypoint"]
CMD ["php-fpm", "-F"]
FROM node:24-bookworm-slim AS ssr
WORKDIR /var/www/html
COPY --from=build --chown=node:node /var/www/html/bootstrap/ssr ./bootstrap/ssr
COPY --from=build --chown=node:node /var/www/html/package*.json ./
COPY --from=build --chown=node:node /var/www/html/node_modules ./node_modules
RUN npm prune --omit=dev --ignore-scripts && npm cache clean --force
ENV NODE_ENV=production
USER node
CMD ["node", "bootstrap/ssr/ssr.js"]
FROM caddy:2-alpine AS web
COPY --from=build /var/www/html/public /var/www/html/public
RUN rm -rf /var/www/html/public/storage \
    && ln -s /var/www/html/storage/app/public /var/www/html/public/storage
COPY deploy/Caddyfile /etc/caddy/Caddyfile
