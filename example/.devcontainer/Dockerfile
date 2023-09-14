# https://developers.home-assistant.io/docs/add-ons/configuration#add-on-dockerfile
ARG BUILD_FROM
FROM $BUILD_FROM

# Execute during the build of the image
ARG TEMPIO_VERSION BUILD_ARCH
RUN \
    curl -sSLf -o /usr/bin/tempio \
    "https://github.com/home-assistant/tempio/releases/download/${TEMPIO_VERSION}/tempio_${BUILD_ARCH}"

# Copy root filesystem
COPY rootfs /

CMD node node-server/server/dist/node-server/server/src/index.js \
   --http-port=$HTTP_PORT \
   --config-path=$CONFIG_PATH \
   --http-user=$HTTP_USER \
   --http-password=$HTTP_PASSWORD\
   --ssl-key-path=$SSL_KEY_PATH\
   --ssl-cert-path=$SSL_CERT_PATH

