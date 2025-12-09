FROM php:8.4-fpm-bookworm

ARG APP_ENV=prod
ENV APP_ENV=${APP_ENV} \
    APP_DEBUG=0 \
    COMPOSER_ALLOW_SUPERUSER=1 \
    PHP_MEMORY_LIMIT=512M \
    PHP_OPCACHE_VALIDATE_TIMESTAMPS=0 \
    PHP_OPCACHE_MAX_ACCELERATED_FILES=20000 \
    PHP_OPCACHE_MEMORY_CONSUMPTION=192 \
    PHP_OPCACHE_ENABLE_CLI=1 \
    PHP_OPCACHE_JIT=1255 \
    PHP_OPCACHE_JIT_BUFFER_SIZE=64M \
    PHP_FPM_PM=max \
    PHP_FPM_PM_MAX_CHILDREN=10 \
    PHP_FPM_PM_START_SERVERS=2 \
    PHP_FPM_PM_MIN_SPARE_SERVERS=1 \
    PHP_FPM_PM_MAX_SPARE_SERVERS=5

WORKDIR /var/www/html

# System deps
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
    git unzip libpq-dev nginx supervisor curl ca-certificates && \
    docker-php-ext-install pdo pdo_pgsql opcache && \
    rm -rf /var/lib/apt/lists/*

# Opcache tuning
RUN { \
    echo "opcache.enable=1"; \
    echo "opcache.enable_cli=${PHP_OPCACHE_ENABLE_CLI}"; \
    echo "opcache.memory_consumption=${PHP_OPCACHE_MEMORY_CONSUMPTION}"; \
    echo "opcache.max_accelerated_files=${PHP_OPCACHE_MAX_ACCELERATED_FILES}"; \
    echo "opcache.validate_timestamps=${PHP_OPCACHE_VALIDATE_TIMESTAMPS}"; \
    echo "opcache.jit=${PHP_OPCACHE_JIT}"; \
    echo "opcache.jit_buffer_size=${PHP_OPCACHE_JIT_BUFFER_SIZE}"; \
} > /usr/local/etc/php/conf.d/opcache.ini

# Composer
COPY --from=composer:2.7 /usr/bin/composer /usr/bin/composer

# Copy only composer files first for better caching
COPY composer.json composer.lock symfony.lock* ./ 
RUN composer install --no-dev --optimize-autoloader --no-interaction --prefer-dist

# Copy the rest of the code
COPY . .

# Build assets / warmup if needed
RUN composer dump-autoload --optimize --classmap-authoritative

# Nginx & Supervisor configs
COPY docker/nginx.conf /etc/nginx/templates/nginx.conf
COPY docker/supervisord.conf /etc/supervisor/supervisord.conf
COPY docker/entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

EXPOSE 8080

CMD ["/entrypoint.sh"]

