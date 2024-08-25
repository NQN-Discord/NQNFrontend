{ envsubst < /usr/share/nginx/html/index.html; } > /usr/share/nginx/html/index.html.new
mv /usr/share/nginx/html/index.html.new /usr/share/nginx/html/index.html

exec "$@"