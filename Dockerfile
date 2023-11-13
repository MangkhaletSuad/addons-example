# ARG BUILD_FROM
# FROM ${BUILD_FROM} AS builder

# WORKDIR /usr/src/app

# COPY package*.json ./

# RUN npm install

# COPY . .
# RUN npm run build

# FROM nginx:1.13.12-alpine

# RUN rm -rf /usr/share/nginx/html/*

# COPY ./nginx.conf /etc/nginx/conf.d/default.conf

# EXPOSE 80

# # คัดลอกไฟล์จาก builder stage
# COPY --from=builder /usr/src/app/dist/my-app /usr/share/nginx/html

# CMD ["nginx", "-g", "daemon off;"]

ARG BUILD_FROM=ghcr.io/hassio-addons/base/amd64:9.1.6
# hadolint ignore=DL3006
FROM ${BUILD_FROM}

# Set workdir
WORKDIR /opt

# Set shell
SHELL ["/bin/bash", "-o", "pipefail", "-c"]

# Setup base
RUN \
    apk add --no-cache \
        git=2.30.2-r0 \
        nginx=1.18.0-r13  \
    && rm -fr \
        /tmp/* \
        /etc/nginx

# Copy root filesystem
COPY rootfs /

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
    maintainer="mangkhalet <mangkhalet.suad@gmail.com>" \
    org.opencontainers.image.title="${BUILD_NAME}" \
    org.opencontainers.image.description="${BUILD_DESCRIPTION}" \
    org.opencontainers.image.vendor="Home Assistant Community Add-ons" \
    org.opencontainers.image.authors="mangkhalet <mangkhalet.suad@gmail.com>" \
    org.opencontainers.image.licenses="MIT" \
    org.opencontainers.image.created=${BUILD_DATE} \
    org.opencontainers.image.revision=${BUILD_REF} \
    org.opencontainers.image.version=${BUILD_VERSION}