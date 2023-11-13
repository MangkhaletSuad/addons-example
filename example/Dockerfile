ARG BUILD_FROM
FROM ${BUILD_FROM}

RUN \	
  apk add --no-cache \	
    python3

WORKDIR /data

EXPOSE 8080

COPY supervisor.sh /
RUN chmod a+x /supervisor.sh

CMD ["/supervisor.sh" ]