# 9M2PJU Lat long to Kertau RSO Malaya Converter

An elegant, responsive web application to convert between Latitude/Longitude (WGS84 / DD / DMS) coordinates and Malayan Rectified Skew Orthomorphic (RSO) Kertau 1948 (EPSG:3168) grid reference coordinates used in Peninsular Malaysia topographic maps.

## Features

- **Bidirectional Conversion**: 
  - Latitude/Longitude (Decimal Degrees & Degrees Minutes Seconds) ⇄ Malayan RSO Grid (Easting/Northing).
  - Support for direct parsing of 6-digit (EEE NNN) and 8-digit (EEEE NNNN) grid reference strings.
- **Interactive OpenStreetMap Map**: Click on the map to pin locations and automatically calculate coordinates.
- **Convenient Copying**: Copy results in various formats (DD, DMS, 8-Digit Grid, 6-Digit Grid, E/N) with a single click.
- **Premium Sleek Theme**: Dark UI with clean typography (Outfit, DM Mono, Fraunces) and smooth micro-animations.
- **Pure Client-Side Math**: Calculates transformations using Hotine Oblique Mercator projection (Variant A) in vanilla JavaScript with no server dependency.

## Hosting on GitHub Pages

This app is designed to be hosted directly on GitHub Pages:

1. Push this repository to GitHub.
2. Go to your repository settings on GitHub.
3. Select **Pages** from the left sidebar.
4. Under **Build and deployment**, select **Deploy from a branch**.
5. Set the branch to `main` (or the branch you pushed to) and the folder to `/ (root)`.
6. Click **Save**. Within a few minutes, your site will be live at `https://<your-username>.github.io/9M2PJU-Lat-Long-to-Kertau-RSO-Malaya/`.

## License

This project is open-source. Feel free to use and adapt!
