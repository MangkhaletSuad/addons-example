docker run \
  --rm \
  -it \
  --name builder \
  --privileged \
  -v /path/to/addon:/data \
  -v /var/run/docker.sock:/var/run/docker.sock:ro \
  homeassistant/amd64-builder \
  -t /data \
  --all \
  --test \
  -i my-test-addon-{arch} \
  -d local

docker build \
  --build-arg BUILD_FROM="homeassistant/amd64-base:latest" \
  -t local/my-test-addon \
  .

docker run \
  --rm \
  -v /tmp/my_test_data:/data \
  -p PORT_STUFF_IF_NEEDED \
  local/my-test-addon