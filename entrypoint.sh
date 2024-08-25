{ cat src/index.html envsubst } > src/index.html

nginx -g daemon off;