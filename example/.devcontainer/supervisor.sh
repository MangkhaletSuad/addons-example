docker run \
  --rm --privileged \
        --name hassio_supervisor \
        --privileged \
        --security-opt seccomp=unconfined \
        --security-opt apparmor:unconfined \
        -v /run/docker.sock:/run/docker.sock:rw \
        -v /run/dbus:/run/dbus:ro \
        -v /run/udev:/run/udev:ro \
        -v /tmp/supervisor_data:/data:rw \
        -v "$WORKSPACE_DIRECTORY":/data/addons/local:rw \
        -v /etc/machine-id:/etc/machine-id:ro \
        -e SUPERVISOR_SHARE="/tmp/supervisor_data" \
        -e SUPERVISOR_NAME=hassio_supervisor \
        -e SUPERVISOR_DEV=1 \
        -e SUPERVISOR_MACHINE="qemux86-64" \
        "homeassistant/amd64-hassio-supervisor:${SUPERVISOR_VERSON}"

docker build \
  --build-arg BUILD_FROM="homeassistant/amd64-base:latest" \
  -t local/my-test-addon \
  .

docker run \
  --rm \
  -v /tmp/my_test_data:/data \
  -p PORT_STUFF_IF_NEEDED \
  local/my-test-addon