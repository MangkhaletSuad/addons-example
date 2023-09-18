ARG BUILD_FROM
FROM ${BUILD_FROM}

ENV LANG C.UTF-8

ENV RUUVI_DISCOVERY_ENV homeassistant

# RUN \	
#   apk add --no-cache \	
#     python3

# WORKDIR /data

# EXPOSE 8080

# RUN chmod a+x ./devcontainer/index.js

# CMD [ "node", "./.devcontainer/index.js" ]

# # Build arguments
# ARG BUILD_ARCH
# ARG BUILD_DATE
# ARG BUILD_REF
# ARG BUILD_VERSION

# # Labels
# LABEL \
#     io.hass.name="ruuvitag-discovery" \
#     io.hass.description="home assistant ruuvitag discovery add-on" \
#     io.hass.arch="${BUILD_ARCH}" \
#     io.hass.type="addon" \
#     io.hass.version=${BUILD_VERSION} \
#     maintainer="Balda" \
#     org.label-schema.description="Home Assistant RuuviTag discovery add-on" \
#     org.label-schema.build-date=${BUILD_DATE} \
#     org.label-schema.name="ruuvitag-discovery" \
#     org.label-schema.schema-version="1.0" \
#     org.label-schema.url="https://github.com/balda/ruuvitag-discovery" \
#     org.label-schema.usage="https://github.com/balda/ruuvitag-discovery/README.md" \
#     org.label-schema.vcs-ref=${BUILD_REF} \
#     org.label-schema.vcs-url="https://github.com/balda/ruuvitag-discovery" \
#     org.label-schema.vendor="Community Hass.io Addons"

SHELL ["/bin/bash", "-o", "pipefail", "-c"]

# Setup base system
ARG BUILD_ARCH=amd64
RUN \
    ARCH="${BUILD_ARCH}" \
    && if [ "${BUILD_ARCH}" = "aarch64" ]; then ARCH="arm64"; fi \
    && if [ "${BUILD_ARCH}" = "armv7" ]; then ARCH="armhf"; fi \
    \
    && apt-get update \
    && apt-get install -y --no-install-recommends \
        libfontconfig1=2.14.1-4 \
        fonts-noto-cjk=1:20220127+repack1-1 \
        memcached=1.6.18-1 \
        nginx=1.22.1-9 \
    \
    && if [ "${BUILD_ARCH}" = "amd64" ]; then \
        apt-get install -y --no-install-recommends \
            libasound2=1.2.8-1+b1 \
            libcups2=2.4.2-3+deb12u1 \
            libdbus-1-3=1.14.8-2~deb12u1 \
            libdrm-amdgpu1=2.4.114-1+b1 \
            libgbm1=22.3.6-1+deb12u1 \
            libglib2.0-0=2.74.6-2 \
            libgtk-3-0=3.24.37-2 \
            libnss3=2:3.87.1-1 \
            libx11-6=2:1.8.4-2+deb12u1 \
            libx11-xcb1=2:1.8.4-2+deb12u1 \
            libxcb-dri3-0=1.15-1 \
            libxcomposite1=1:0.4.5-1 \
            libxcursor1=1:1.2.1-1 \
            libxdamage1=1:1.1.6-1 \
            libxext6=2:1.3.4-1+b1 \
            libxfixes3=1:6.0.0-2 \
            libxi6=2:1.8-1+b1 \
            libxrandr2=2:1.5.2-2+b1 \
            libxrender1=1:0.9.10-1.1 \
            libxshmfence1=1.3-1 \
            libxss1=1:1.2.3-1 \
            libxtst6=2:1.2.3-1.1 \
    fi \
    \
    && rm -fr \
        /tmp/* \
        /var/{cache,log}/* \
        /var/lib/apt/lists/* \
        /etc/nginx \
    \
    && mkdir -p /var/log/nginx \
    && touch /var/log/nginx/error.log

# Copy root filesystem
COPY supervisor.sh /

# Health check
HEALTHCHECK \
    CMD curl --fail http://127.0.0.1:8080 || exit 1

# Build arguments
ARG BUILD_ARCH
ARG BUILD_DATE
ARG BUILD_DESCRIPTION
ARG BUILD_NAME
ARG BUILD_REF
ARG BUILD_REPOSITORY
ARG BUILD_VERSION

# Labels
LABEL \
    io.hass.name="${BUILD_NAME}" \
    io.hass.description="${BUILD_DESCRIPTION}" \
    io.hass.arch="${BUILD_ARCH}" \
    io.hass.type="addon" \
    io.hass.version=${BUILD_VERSION} \
    maintainer="Franck Nijhof <frenck@addons.community>" \
    io.hass.name="${BUILD_NAME}" \
    io.hass.description="${BUILD_DESCRIPTION}" \
    org.opencontainers.image.vendor="Home Assistant Community Add-ons" \
    org.opencontainers.image.authors="Franck Nijhof <frenck@addons.community>" \
    org.opencontainers.image.licenses="MIT" \
    org.opencontainers.image.url="https://addons.community" \
    org.opencontainers.image.source="https://github.com/${BUILD_REPOSITORY}" \
    org.opencontainers.image.documentation="https://github.com/${BUILD_REPOSITORY}/blob/main/README.md" \
    org.opencontainers.image.created=${BUILD_DATE} \
    org.opencontainers.image.revision=${BUILD_REF} \
    org.opencontainers.image.version=${BUILD_VERSION}