# 9M2PJU Lat Long to Kertau RSO Malaya Converter

[![Build APK](https://github.com/9M2PJU/9M2PJU-Lat-Long-to-Kertau-RSO-Malaya/actions/workflows/build-apk.yml/badge.svg)](https://github.com/9M2PJU/9M2PJU-Lat-Long-to-Kertau-RSO-Malaya/actions/workflows/build-apk.yml)
[![Latest release](https://img.shields.io/github/v/release/9M2PJU/9M2PJU-Lat-Long-to-Kertau-RSO-Malaya)](https://github.com/9M2PJU/9M2PJU-Lat-Long-to-Kertau-RSO-Malaya/releases/latest)
[![License: AGPL-3.0](https://img.shields.io/badge/License-AGPL--3.0-green.svg)](LICENSE)

Convert coordinates between **Latitude/Longitude (WGS84 or Kertau 1948)** and the
**Malayan RSO Kertau grid (EPSG:3168)** used on Peninsular Malaysia topographic maps.
Available as a website and as an installable Android app (same code, offline-capable).

* **Website:** https://kertau.hamradio.my/
* **Android APK:** [latest release](https://github.com/9M2PJU/9M2PJU-Lat-Long-to-Kertau-RSO-Malaya/releases/latest/download/kertau-rso-malaya.apk)
  (or Actions → latest *Build APK* run → Artifacts). Sideload: allow “Install unknown apps”.

Developed by **9M2PJU** ([hamradio.my](https://hamradio.my)).

---

## Features

* **Two-way conversion** — Lat/Long ⇄ RSO Easting/Northing, plus truncated grids
  (100 m: `E/100 N/100`, 10 m: `E/10 N/10`).
* **Datum selector** — WGS84 (phone/GPS/Google Maps, default) or Kertau 1948
  (old L7010 topo sheets). The ~150–200 m shift is shown with every result.
* **Interactive map** (OpenStreetMap) — click to fill inputs, hover readout,
  clickable marker popup, scale bar.
* **RSO grid overlay** — canvas grid lines clipped to the official coverage,
  with `X = Easting` / `Y = Northing` line labels, edge rulers, and density control.
* **Offline converter** — projection runs locally via vendored Proj4js; only map
  tiles need internet. Installable PWA (`manifest.json` + `sw.js`).
* **Android app** — thin WebView wrapper built by GitHub Actions, no local SDK needed.

---

## Coordinate systems

### Latitude & Longitude

Geographic coordinates: latitude (φ, north of the equator) and longitude
(λ, east of Greenwich). Phones, GPS units, and Google Maps output **WGS84**.

### Kertau 1948 / Malayan RSO (EPSG:3168)

The national grid for Peninsular Malaysia topographic maps. Peninsular Malaysia
runs diagonally NW–SE, so instead of UTM it uses an **oblique** cylinder aligned
with the peninsula — the Hotine Oblique Mercator (Variant A) — on the
**Everest 1830 (RSO 1969)** ellipsoid (`a = 6377295.664 m`, `1/f = 300.8017`).

Official projection parameters (EPSG:3168):

```
+proj=omerc +no_uoff +lat_0=4 +lonc=102.25
+alpha=323.0257905 +gamma=323.130102361111 +k=0.99984
+x_0=804670.24 +y_0=0 +ellps=evrst69 +towgs84=-11,851,5 +units=m
```

Official coverage: E 176,138–734,057 · N 124,944–744,338
(WGS84 approx. 1.13–6.72°N, 99.59–104.6°E).
Results outside these bounds are flagged as extrapolated.

---

## Accuracy

* Math is done with **Proj4js using the exact EPSG:3168 definition above**
  (both `alpha` and `gamma`, correct ellipsoid, false easting `804670.24`),
  verified against PROJ/`epsg.io` vectors to **< 2 m forward, < 0.5 m round-trip**.
* The **datum step** uses `towgs84=-11,851,5`. Entering GPS (WGS84) numbers as
  Kertau 1948 (or vice versa) without converting costs ~150–200 m — the app
  converts explicitly instead.

Reference vectors (WGS84 in → RSO out):

| Place | Lat, Lng | E | N |
|---|---|---|---|
| Kuala Lumpur | 3.1390, 101.6869 | 410267 | 347384 |
| Kuantan | 4.1769, 103.1443 | 572338 | 461880 |
| Penang | 5.4141, 100.3288 | 260411 | 599483 |
| Johor Bahru | 1.4655, 103.7578 | 640348 | 162059 |

---

## Use it

### Website

Open https://kertau.hamradio.my/, pick a direction, enter values (or click the
map), and copy any result with the copy buttons. Truncated grids center to the
square (`+50 m` / `+5 m`).

### Android app

Install the APK from the [latest release](https://github.com/9M2PJU/9M2PJU-Lat-Long-to-Kertau-RSO-Malaya/releases/latest/download/kertau-rso-malaya.apk).
It wraps this same page in an offline WebView (converter works offline;
map tiles need internet). Launcher name: **9M2PJU Lat Long To RSO**.

---

## Project layout

```
index.html                  Web app (single file: UI + Leaflet map + Proj4js calls)
vendor/                     Local Proj4js + Leaflet (no CDN dependency for the converter)
icons/, manifest.json, sw.js   PWA shell (installable, offline app shell)
android/                    Native WebView wrapper (Kotlin, no frameworks)
  sync-www.sh               Copies index.html + vendor/ + icons/ into APK assets
  app/src/main/...          MainActivity.kt, AndroidManifest.xml, icons
.github/workflows/build-apk.yml   CI: PROJ vector check + assembleDebug + Release on v* tags
CNAME                       Custom domain (kertau.hamradio.my)
```

---

## Development & releases

No local Android SDK needed — everything builds in CI:

```bash
git push origin main            # builds APK → Actions run → Artifacts
git tag v1.0.x && git push origin v1.0.x   # publishes APK to GitHub Releases
```

The workflow (`Build APK`) runs on every `main` push, PR, tag `v*`, or manually:
syncs the web app into the APK, checks the reference vectors above in Node,
then runs `gradle -p android assembleDebug`. The Pages download button points at
`releases/latest/download/kertau-rso-malaya.apk`, so push a tag to refresh it.

---

## License

**GNU Affero General Public License v3.0 (AGPL-3.0)** — see [LICENSE](LICENSE).
You may copy, modify, and distribute this software; if you host a modified
version, you must make the modified source available to its users.

Developed and maintained by **9M2PJU** — [hamradio.my](https://hamradio.my).

## Support

If you find this project useful, please consider supporting it:

[![Donate with PayPal](https://img.shields.io/badge/Donate-PayPal-blue.svg)](https://paypal.me/9M2PJU)
