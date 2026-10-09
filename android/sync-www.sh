#!/usr/bin/env bash
# Copy the Pages web app into the Android WebView assets.
# Run from repo root: bash android/sync-www.sh
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
DEST="$ROOT/android/app/src/main/assets/www"
rm -rf "$DEST"
mkdir -p "$DEST/vendor" "$DEST/icons"
cp "$ROOT/index.html" "$DEST/"
cp "$ROOT/manifest.json" "$DEST/" 2>/dev/null || true
cp "$ROOT/sw.js" "$DEST/" 2>/dev/null || true
cp "$ROOT/vendor/proj4.min.js" "$ROOT/vendor/leaflet.js" "$ROOT/vendor/leaflet.css" "$DEST/vendor/"
cp "$ROOT/icons/icon.svg" "$ROOT/icons/icon-192.png" "$ROOT/icons/icon-512.png" "$DEST/icons/"
# Service workers + file:// don't mix: strip SW registration from the packaged copy
# (converter itself is fully offline once proj4/leaflet are bundled).
if command -v python3 >/dev/null 2>&1; then
  python3 - "$DEST/index.html" <<'EOF'
import sys
p = sys.argv[1]
s = open(p, encoding='utf-8').read()
s = s.replace("if('serviceWorker' in navigator){ try{ navigator.serviceWorker.register('sw.js'); }catch(e){} }", "/* service worker disabled inside APK (file://) */")
open(p, 'w', encoding='utf-8').write(s)
EOF
fi
echo "Synced web app -> $DEST"
ls -R "$DEST" | head -n 30
