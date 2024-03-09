mapboxgl.accessToken = 'pk.eyJ1Ijoic2FuaW5nMTIxNiIsImEiOiJjbHMyOWZleTgwaWVnMmtvOWphdnlxM3liIn0.z0dydDvm-LW0qRPM0BgsGw'
const map = new mapboxgl.Map({
	container: 'TDSB-map', // container ID
	style: 'mapbox://styles/mapbox/streets-v12', // style URL
	center: [-79.37, 43.71], // starting position [lng, lat]
	zoom: 10, // starting zoom
});