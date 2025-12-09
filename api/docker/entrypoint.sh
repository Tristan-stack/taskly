#!/bin/bash
set -euo pipefail

export PORT="${PORT:-8080}"

# Ensure runtime dirs exist
mkdir -p /run/php

# Render nginx config with PORT
if [ -f /etc/nginx/templates/nginx.conf ]; then
  envsubst '\$PORT' < /etc/nginx/templates/nginx.conf > /etc/nginx/nginx.conf
fi

echo "Starting supervisord (php-fpm + nginx) on port ${PORT}..."
exec /usr/bin/supervisord -c /etc/supervisor/supervisord.conf

