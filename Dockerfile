FROM nginx:1.17

# Setup nginx
RUN chmod 777 -R /var/cache/nginx/
COPY nginx/nginx.conf /opt/nginx/nginx.conf
COPY nginx/default.conf /opt/nginx/conf.d/default.conf.tpl

# Bring over assets / files
COPY index.html /opt/nginx/www/
COPY moov.css /opt/nginx/www/
COPY ./assets/ /opt/nginx/www/assets/
COPY ./demo/ /opt/nginx/www/demo/
COPY ./start/ /opt/nginx/www/start/

RUN echo '# empty prometheus metrics response' > /opt/nginx/www/metrics

EXPOSE 8080

COPY entrypoint.sh /entrypoint.sh
ENTRYPOINT ["/entrypoint.sh"]
CMD ["-c", "/opt/nginx/nginx.conf"]
