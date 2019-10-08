FROM nginx:1.17

# Setup nginx
RUN chmod 777 -R /var/cache/nginx/
COPY nginx/nginx.conf /opt/nginx/nginx.conf
COPY nginx/default.conf /opt/nginx/conf.d/default.conf

# Bring over assets / files
COPY index.html /opt/nginx/www/
COPY moov.css /opt/nginx/www/
COPY ./assets/ /opt/nginx/www/assets/
COPY ./demo/ /opt/nginx/www/demo/
COPY ./start/ /opt/nginx/www/start/

# TODO(adam): nginx_exporter instead
RUN echo '# empty prometheus metrics response' > /opt/nginx/www/metrics

# Run commands
USER nobody
EXPOSE 8080
ENTRYPOINT ["nginx"]
CMD ["-c", "/opt/nginx/nginx.conf"]
