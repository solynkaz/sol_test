#!/bin/sh
set -e

PORT="${PORT:-80}"
BACKEND_URL="${BACKEND_URL:-}"

API_LOCATION=""
if [ -n "$BACKEND_URL" ]; then
  BACKEND_URL="${BACKEND_URL%/}"
  API_LOCATION="
    location /api/ {
        resolver 127.0.0.11 8.8.8.8 1.1.1.1 valid=10s ipv6=off;
        resolver_timeout 5s;
        set \$backend_upstream \"${BACKEND_URL}\";
        proxy_pass \$backend_upstream;
        proxy_http_version 1.1;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
    }
"
fi

cat > /etc/nginx/conf.d/default.conf <<EOF
server {
    listen ${PORT};
    server_name localhost;
    root /usr/share/nginx/html;
    index index.html;
${API_LOCATION}
    location / {
        try_files \$uri \$uri/ /index.html;
    }

    location ~* \.(?:css|js|mjs|map|ico|svg|woff2?|ttf|eot)\$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
EOF

exec nginx -g 'daemon off;'