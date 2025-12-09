#!/bin/bash
set -euo pipefail

export PORT="${PORT:-8080}"

# Ensure runtime dirs exist
mkdir -p /run/php
mkdir -p /var/www/html/var/cache /var/www/html/var/log
chown -R www-data:www-data /var/www/html/var
chmod -R 775 /var/www/html/var

# Render nginx config with PORT
if [ -f /etc/nginx/templates/nginx.conf ]; then
  sed "s/\${PORT}/${PORT}/g" /etc/nginx/templates/nginx.conf > /etc/nginx/nginx.conf
fi

echo "Starting supervisord (php-fpm + nginx) on port ${PORT}..."
exec /usr/bin/supervisord -c /etc/supervisor/supervisord.conf

