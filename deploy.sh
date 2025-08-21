#!/usr/bin/env bash
set -euo pipefail

DOMAIN_DEFAULT="thespacewaffles.com"
EMAIL_DEFAULT="admin@thespacewaffles.com"

DOMAIN="${DOMAIN:-${1:-$DOMAIN_DEFAULT}}"
EMAIL="${EMAIL:-${2:-$EMAIL_DEFAULT}}"

export DOMAIN EMAIL

AUTO_FREE="${AUTO_FREE:-1}"   # try to stop nginx/apache/caddy if they block 80/443 (1=yes)

FALLBACK_PREVIEW="${FALLBACK_PREVIEW:-1}"  # if still blocked, run no-TLS preview on a random port (1=yes)


compose() {
  if docker compose version >/dev/null 2>&1; then
    docker compose "$@"
  elif command -v docker-compose >/dev/null 2>&1; then
    docker-compose "$@"
  else
    echo "ERROR: Docker Compose not found. Install docker-compose-plugin (v2) or docker-compose (v1)." >&2
    exit 1
  fi
}

port_in_use() {
  local p="$1"
  ss -tulpn 2>/dev/null | grep -q ":$p " || lsof -i ":$p" -sTCP:LISTEN -n -P 2>/dev/null | grep -q ":$p"
}

show_port_owner() {
  local p="$1"
  echo "Port $p is in use by:"
  ss -tulpn 2>/dev/null | grep ":$p " || true
  lsof -i ":$p" -sTCP:LISTEN -n -P 2>/dev/null || true
}

free_ports_if_needed() {
  local changed=0
  for p in 80 443; do
    if port_in_use "$p"; then
      echo ">>> Port $p is busy."
      show_port_owner "$p"
      if [ "$AUTO_FREE" = "1" ]; then
        echo ">>> Attempting to stop common services (nginx/apache2/httpd/caddy)..."
        sudo systemctl stop nginx apache2 httpd caddy 2>/dev/null || true
        sleep 1
        if port_in_use "$p"; then
          echo ">>> Still busy: $p"
        else
          echo ">>> Freed: $p"
          changed=1
        fi
      fi
    fi
  done
  return $changed
}


echo ">>> Deploying for DOMAIN=$DOMAIN  EMAIL=$EMAIL"

# ensure docker daemon

if ! docker info >/dev/null 2>&1; then
  echo "Starting Docker..."
  sudo systemctl enable --now docker
fi

# Try to free 80/443 if needed

free_ports_if_needed || true

if port_in_use 80 || port_in_use 443; then
  echo ">>> 80/443 still busy."

  if [ "$FALLBACK_PREVIEW" = "1" ]; then
    echo ">>> Running NO-TLS PREVIEW on a RANDOM port (good for quick tests)."
    echo ">>> Note: real HTTPS certificates require ports 80/443 to be free."
    compose -f docker-compose.yml -f docker-compose.notls.yml up -d --build web
    # discover chosen host port
    PORT_LINE="$(compose port web 3000 | tail -n1 | awk '{print $NF}')"
    HOST_PORT="${PORT_LINE##*:}"
    echo ">>> Preview up on:  http://$(hostname -I | awk '{print $1}'):${HOST_PORT}"
    echo ">>> When you're ready for HTTPS, free 80/443 and run ./deploy.sh again."
    exit 0
  else
    echo "ERROR: Ports 80/443 are required for HTTPS. Free them and rerun."
    exit 1
  fi
fi

# Full HTTPS path (Traefik + Let's Encrypt)

compose up -d --build

echo ">>> First-time certificates may take ~30s."
echo ">>> Visit: https://$DOMAIN"

