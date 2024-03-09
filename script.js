mapboxgl.accessToken = 'pk.eyJ1Ijoic2FuaW5nMTIxNiIsImEiOiJjbHMyOWZleTgwaWVnMmtvOWphdnlxM3liIn0.z0dydDvm-LW0qRPM0BgsGw'
const map = new mapboxgl.Map({
	container: 'TDSB-map', // container ID
	style: 'mapbox://styles/mapbox/streets-v12', // style URL
	center: [-79.37, 43.71], // starting position [lng, lat]
	zoom: 10, // starting zoom
});

map.on('load', function () {
    // Add GeoJSON source from a remote URL
    map.addSource('schools-data', {
        type: 'geojson',
        data: 'https://raw.githubusercontent.com/saning1216/GGR472-Lab3/main/Toronto%20District%20School%20Board%20Locations.geojson'
    });

    map.addLayer({
        'id': 'schools-icon',
        'type': 'symbol',
        'source': 'schools-data',
        'layout': {
            'icon-image': 'school', // Ensure this icon is available in your Mapbox style
            'icon-size': 1
        },
        'minzoom': 9,  // When the map is zoomed out below zoom level 9, the layer won't be displayed
        'maxzoom': 22  // It will be visible up to a zoom level of 22
    });
});


map.on('load', function () {
  
    map.addLayer({
        'id': 'school-name',
        'type': 'symbol',
        'source': 'schools-data', 
        'layout': {
            'text-field': ['get', 'SCH_NAME'], // Uses the "SCH_NAME" property for the label
            'text-size': 12, 
            'text-anchor': 'top', // Anchor the text at the top to ensure it appears below the icon
            'text-offset': [0, 1.5], // Move the text below the school-icon layer
            'text-justify': 'center' 
        },
        'minzoom': 10 // Labels will become visible when zoom level larger than 10
    }, 'schools-icon'); 
});

map.on('mouseenter', 'schools-icon', () => {
    map.getCanvas().style.cursor = 'pointer'; // Switch cursor to pointer when mouse is over schools-icon layer
});

map.on('mouseleave', 'schools-icon', () => {
    map.getCanvas().style.cursor = ''; // Switch cursor back when mouse leaves schools-icon layer
});

map.on('click', 'schools-icon', (e) => {
    // Prevent the map from zooming when a school icon is clicked
    e.preventDefault();

    // Declare a new popup object on each click
    new mapboxgl.Popup()
        .setLngLat(e.lngLat) // Set the coordinates of the popup based on mouse click location
        .setHTML("<b>School Address:</b> " + e.features[0].properties.ADDRESS) // Display the "ADDRESS" property from the shools-data scource
        .addTo(map); // Show the popup on the map
});

// Add map controls
const navtools= new mapboxgl.NavigationControl();
document.getElementById('nav-tools').appendChild(navtools.onAdd(map));

const zoomtools= new mapboxgl.FullscreenControl();
document.getElementById('zoom-tools').appendChild(zoomtools.onAdd(map));

