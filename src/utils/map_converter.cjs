/**
 * GTA V Map Coordinate Converter
 * 
 * Converts between geographic coordinates (from gta-5-map.com dump)
 * and app-specific pixel coordinates (L.CRS.Simple).
 * 
 * Based on empirical matching of Playing Card locations.
 * Uses Mercator projection for latitude.
 */

const lngScale = 65.7995375348499;
const lngOffset = 11963.34541278139;
const latScale = 3876.0212761419816;
const latOffset = -12192.531120786436;

/**
 * Converts geographic lat/lng to app pixel coordinates
 * @param {number} lat - Geographic latitude
 * @param {number} lng - Geographic longitude
 * @returns {{lat: number, lng: number}} App coordinates
 */
function geographicToApp(lat, lng) {
    const latRad = lat * Math.PI / 180;
    const mercY = Math.log(Math.tan(Math.PI / 4 + latRad / 2));
    
    return {
        lat: mercY * latScale + latOffset,
        lng: lng * lngScale + lngOffset
    };
}

/**
 * Converts app pixel coordinates back to geographic
 * @param {number} lat - App latitude
 * @param {number} lng - App longitude
 * @returns {{lat: number, lng: number}} Geographic coordinates
 */
function appToGeographic(lat, lng) {
    const mercY = (lat - latOffset) / latScale;
    const latRad = 2 * Math.atan(Math.exp(mercY)) - Math.PI / 2;
    
    return {
        lat: latRad * 180 / Math.PI,
        lng: (lng - lngOffset) / lngScale
    };
}

// Export for commonjs use
if (typeof module !== 'undefined') {
    module.exports = { geographicToApp, appToGeographic };
}

// Verification
if (require.main === module) {
    const testPoints = [
        { name: "Rebel Radio", geo: { lat: 76.6704, lng: -117.3693 }, app: { lat: -3871.25, lng: 4240.5 } },
        { name: "Vanilla Unicorn", geo: { lat: 64.8260, lng: -123.5358 }, app: { lat: -6381.25, lng: 3834.75 } }
    ];

    console.log("Verifying Coordinate Conversion:");
    testPoints.forEach(p => {
        const result = geographicToApp(p.geo.lat, p.geo.lng);
        const dist = Math.sqrt(Math.pow(result.lat - p.app.lat, 2) + Math.pow(result.lng - p.app.lng, 2));
        console.log(`- ${p.name}: Error = ${dist.toFixed(4)} pixels`);
    });
}
