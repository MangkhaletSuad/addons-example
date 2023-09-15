ARG BUILD_FROM
FROM $BUILD_FROM

# Install requirements for add-on
RUN \
  apk add --no-cache \
    python3

# Python 3 HTTP Server serves the current working dir
# So let's set it to our add-on persistent data directory.
WORKDIR /data

EXPOSE 8080

# Copy data for add-on
COPY ./devcontainer/supervisor.sh /
RUN chmod a+x ./devcontainer/supervisor.sh

CMD [ "./.devcontainer/supervisor.sh" ]