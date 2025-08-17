#!/usr/bin/env bash
set -euo pipefail

# === config ===
DOMAIN_DEFAULT="thespacewaffles.com"
EMAIL_DEFAULT="admin@thespacewaffles.com"

DOMAIN="${DOMAIN:-${1:-$DOMAIN_DEFAULT}}"
EMAIL="${EMAIL:-${2:-$EMAIL_DEFAULT}}"

echo ">>> Deploying for DOMAIN=$DOMAIN  EMAIL=$EMAIL"

# quick sanity hints
if ! command -v docker >/dev/null; then
  echo "Docker is required. Install Docker and retry."; exit 1
fi

export DOMAIN EMAIL

# build & run in background
docker compose up -d --build

echo ">>> Done. Give Let's Encrypt ~30s."
echo ">>> Visit: https://$DOMAIN"
