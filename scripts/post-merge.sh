#!/usr/bin/env bash
set -euo pipefail
echo "Running post-merge hook..."
pnpm install --frozen-lockfile
echo "Post-merge complete."
