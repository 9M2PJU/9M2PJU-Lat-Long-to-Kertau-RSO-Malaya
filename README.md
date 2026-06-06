# 9M2PJU Lat-Long to Kertau RSO Malaya Converter

[![License: AGPL v3](https://img.shields.shields.io/badge/License-AGPL_v3-blue.svg)](LICENSE)
![GitHub Pages](https://img.shields.shields.shields.io/badge/GitHub_Pages-222222?style=flat&logo=github&logoColor=white)
![HTML5](https://img.shields.shields.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS3](https://img.shields.shields.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.shields.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)
![Leaflet](https://img.shields.shields.shields.io/badge/Leaflet-19992E?style=flat&logo=leaflet&logoColor=white)
[![HamRadio.my](https://img.shields.shields.shields.io/badge/Made%20by-9M2PJU-green.svg)](https://hamradio.my)

An elegant, responsive web utility designed for ham radio operators, land surveyors, hikers, and mapping enthusiasts to convert coordinates between standard Latitude/Longitude and the Malayan Rectified Skew Orthomorphic (RSO) Kertau 1948 grid system used in topographic maps of Peninsular Malaysia.

Developed by **9M2PJU** ([https://hamradio.my](https://hamradio.my)).

---

## What are these Coordinate Systems?

### 1. Latitude & Longitude (Geographic Coordinates)
Latitude ($\phi$) and Longitude ($\lambda$) represent position on a three-dimensional ellipsoidal model of the Earth. 
* **Latitude** measures how far north or south a point is from the Equator (ranging from $0^\circ$ to $90^\circ$ North or South).
* **Longitude** measures how far east or west a point is from the Prime Meridian in Greenwich, England (ranging from $0^\circ$ to $180^\circ$ East or West).
* GPS systems, Google Maps, and smartphones output geographic coordinates using the global **WGS84** datum.

### 2. Kertau 1948 / Malayan RSO (EPSG:3168)
The **Malayan Rectified Skew Orthomorphic (RSO)** is the national grid projection system used on official topographic maps (e.g., L7010 series) of Peninsular Malaysia.
* **Why RSO instead of standard UTM/Mercator?** Peninsular Malaysia is oriented diagonally (from Northwest to Southeast). Standard conformal projections like Transverse Mercator or UTM introduce significant scale distortion when covering long, narrow diagonal strips. The RSO projection solves this by using a oblique cylinder skewed to align exactly with the peninsula's natural diagonal axis.
* **Datum & Ellipsoid**: It is based on the **Kertau 1948** datum using the **Modified Everest** ellipsoid. The origin is located at the Kertau triangulation station in Temerloh, Pahang.

---

## How the Calculation is Made

The converter implements the **Hotine Oblique Mercator (Variant A)** map projection math defined in the *EPSG Geodetic Parameter Dataset Guidance Note 7-2*. 

### Mathematical Formulation
The conversion utilizes the following ellipsoid parameters for the **Modified Everest** ellipsoid:
* **Semi-major axis ($a$)**: $6,377,304.063\text{ m}$
* **Semi-minor axis ($b$)**: $6,356,103.039\text{ m}$
* **Scale factor at origin ($k_0$)**: $0.99984$
* **Projection center latitude ($\phi_0$)**: $4^\circ\text{ N}$ (or $4 \times \pi / 180\text{ rad}$)
* **Projection center longitude ($\lambda_c$)**: $102.25^\circ\text{ E}$ (or $102.25 \times \pi / 180\text{ rad}$)
* **Azimuth of initial line ($\alpha_c$)**: $323.0257964^\circ$ (or $323.0257964 \times \pi / 180\text{ rad}$)
* **False Easting ($FE$)**: $804,671.0\text{ m}$
* **False Northing ($FN$)**: $0.0\text{ m}$

### Projection & Iteration Process
1. **Lat/Long to RSO Grid**: The latitude and longitude are converted to conformal coordinates on a sphere, followed by calculation of the rectified coordinates ($u, v$), which are then rotated and shifted by the False Easting/Northing constants to yield $E$ (Easting) and $N$ (Northing).
2. **RSO Grid to Lat/Long**: The process is reversed. However, converting the isometric latitude back to geodetic latitude ($\phi$) lacks a direct algebraic solution due to the Earth's eccentricity. The app solves this using a high-precision **Newton-Raphson numerical iteration** loop:
   $$\phi_{i+1} = \frac{\pi}{2} - 2\arctan\left( t \cdot \left[ \frac{1 - e\sin\phi_i}{1 + e\sin\phi_i} \right]^{e/2} \right)$$
   The loop runs until the difference between consecutive steps converges to less than $10^{-11}$ radians (which represents sub-millimeter level mathematical precision).

---

## Why It Is Accurate

* **True Oblique Math**: Many simplified web converters use flat approximations or polynomial equations that drift away from the projection center. This app uses the exact trigonometric and hyperbolic Hotine Oblique Mercator formulation.
* **Newton-Raphson Solver**: The iterative numerical solver converges to $10^{-11}$ radians, ensuring no mathematical precision is lost during reverse projection.
* **Accurate EPSG:3168 Constants**: The projection constants implemented are sourced directly from the EPSG geodetic dataset to match local Malaysian department maps.
* **WGS84 Note**: WGS84 coordinates (GPS/Google Maps) and Kertau 1948 coordinates differ by approximately $150\text{ m}$ to $200\text{ m}$ due to different ellipsoidal datums. This app expects coordinates to be in their respective datum. When GPS coordinates are entered, they are plotted on OpenStreetMap (WGS84) and converted to Kertau RSO coordinates using the EPSG:3168 projection.

---

## License

This software is licensed under the **GNU Affero General Public License v3.0 (AGPL-3.0)**. 

Under the AGPL-3.0:
* You are free to copy, modify, and distribute this software.
* If you host a modified version of this application on a network/website, you **must make your modified source code available** to the users of that website.
* The license file is included in this repository as [LICENSE](LICENSE).

Developed and maintained by **9M2PJU** — [hamradio.my](https://hamradio.my).
