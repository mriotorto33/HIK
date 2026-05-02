#!/bin/sh
# Fetches a GCP OIDC identity token from the metadata server and injects it
# into nginx as a proxy Authorization header. Refreshes every 55 minutes.

BACKEND_AUDIENCE="https://hik-backend-805730087505.us-east4.run.app"
TOKEN_FILE="/tmp/auth_token.conf"

fetch_token() {
  TOKEN=$(curl -sf \
    "http://metadata.google.internal/computeMetadata/v1/instance/service-accounts/default/identity?audience=${BACKEND_AUDIENCE}" \
    -H "Metadata-Flavor: Google" 2>/dev/null || echo "")

  if [ -n "$TOKEN" ]; then
    echo "proxy_set_header Authorization \"Bearer ${TOKEN}\";" > "${TOKEN_FILE}"
    echo "[entrypoint] GCP identity token fetched OK."
  else
    # Local dev / no metadata server — run without auth (mock client used locally)
    echo "# no GCP token (local or no metadata server)" > "${TOKEN_FILE}"
    echo "[entrypoint] No metadata server found, running without auth header."
  fi
}

# Write token file before nginx loads its config
fetch_token

# Background loop: refresh token and reload nginx every 55 minutes
(while true; do
  sleep 3300
  fetch_token
  if [ -f /var/run/nginx.pid ]; then
    nginx -s reload 2>/dev/null || true
  fi
done) &

# Start nginx in the foreground (PID 1)
exec nginx -g 'daemon off;'
