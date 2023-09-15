ARG BUILD_FROM
FROM ${BUILD_FROM}

ENV LANG C.UTF-8

ENV RUUVI_DISCOVERY_ENV homeassistant

CMD [ "node", "./.devcontainer/index.js" ]

# Build arguments
ARG BUILD_ARCH
ARG BUILD_DATE
ARG BUILD_REF
ARG BUILD_VERSION

# Labels
LABEL \
    io.hass.name="ruuvitag-discovery" \
    io.hass.description="home assistant ruuvitag discovery add-on" \
    io.hass.arch="${BUILD_ARCH}" \
    io.hass.type="addon" \
    io.hass.version=${BUILD_VERSION} \
    maintainer="Balda" \
    org.label-schema.description="Home Assistant RuuviTag discovery add-on" \
    org.label-schema.build-date=${BUILD_DATE} \
    org.label-schema.name="ruuvitag-discovery" \
    org.label-schema.schema-version="1.0" \
    org.label-schema.url="https://github.com/balda/ruuvitag-discovery" \
    org.label-schema.usage="https://github.com/balda/ruuvitag-discovery/README.md" \
    org.label-schema.vcs-ref=${BUILD_REF} \
    org.label-schema.vcs-url="https://github.com/balda/ruuvitag-discovery" \
    org.label-schema.vendor="Community Hass.io Addons"