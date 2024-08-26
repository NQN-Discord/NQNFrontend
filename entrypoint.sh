for file in $(find /usr/share/nginx/html -type f -name "*.html")
do
  { envsubst < ${file}; } > ${file}.new
  mv ${file}.new ${file}
done

exec "$@"