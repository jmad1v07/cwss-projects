const map = new maplibregl.Map({
    container: 'map',
    style: {
        'id': 'raster',
        'version': 8,
        'name': 'Raster tiles',
        'center': [0, 0],
        'zoom': 0,
        'sources': {
            'raster-tiles': {
                'type': 'raster',
                'tiles': ['https://tile.openstreetmap.org/{z}/{x}/{y}.png'],
                'tileSize': 256,
                'minzoom': 0,
                'maxzoom': 18
            }
        },
        'layers': [
            {
                'id': 'background',
                'type': 'background',
                'paint': {
                    'background-color': '#e0dfdf'
                }
            },
            {
                'id': 'simple-tiles',
                'type': 'raster',
                'source': 'raster-tiles'
            }
        ]
    },
    center: [115.81609649894, -31.97812224129371],
    zoom: 2
});
map.on('load', async () => {
    const image = await map.loadImage('https://maplibre.org/maplibre-gl-js/docs/assets/custom_marker.png');
    // Add an image to use as a custom marker
    map.addImage('custom-marker', image.data);
    map.addSource('places', {
        'type': 'geojson',
        'data': {
            'type': 'FeatureCollection',
            'features': [
                {
                    'type': 'Feature',
                    'properties': {
                        'description':
                            '<strong>Water smart dams</strong><p>Developing knowledge and water planning tools for farmers who need their dams to work in all years and make water investment decisions with confidence.</p>'
                    },
                    'geometry': {
                        'type': 'Point',
                        'coordinates': [117.32230227412145, -33.846254181467394]
                    }
                },
                {
                    'type': 'Feature',
                    'properties': {
                        'description':
                            "<strong>Detecting flooding in Fiji's croplands</strong><p>Developing machine learning tools to convert satellite images into land cover and flood maps with Fiji's Ministry of Agriculture.</p>"
                    },
                    'geometry': {
                        'type': 'Point',
                        'coordinates': [177.5392402332834, -17.596380563834487]
                    }
                },
                {
                    'type': 'Feature',
                    'properties': {
                        'description':
                            "<strong>Mapping Pacific agricultural landscapes</strong><p>An open-source farm mapping system was built with Tonga's Ministry of Agriculture which has been used to map tens of thousands of farms to guide disaster response after the Hunga Tonga - Hunga Ha'apai volcanic eruption.</p>"
                    },
                    'geometry': {
                        'type': 'Point',
                        'coordinates': [-175.191283264805, -21.14194054123024]
                    }
                },
            ]
        }
    });
    // Add a layer showing the places.
    map.addLayer({
        'id': 'places',
        'type': 'symbol',
        'source': 'places',
        'layout': {
            'icon-image': 'custom-marker',
            'icon-overlap': 'always'
        }
    });
    // Create a popup, but don't add it to the map yet.
    const popup = new maplibregl.Popup({
        closeButton: false,
        closeOnClick: false
    });
    map.on('mouseenter', 'places', (e) => {
        // Change the cursor style as a UI indicator.
        map.getCanvas().style.cursor = 'pointer';
        const coordinates = e.features[0].geometry.coordinates.slice();
        const description = e.features[0].properties.description;
        // Ensure that if the map is zoomed out such that multiple
        // copies of the feature are visible, the popup appears
        // over the copy being pointed to.
        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
            coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }
        // Populate the popup and set its coordinates
        // based on the feature found.
        popup.setLngLat(coordinates).setHTML(description).addTo(map);
    });
    map.on('mouseleave', 'places', () => {
        map.getCanvas().style.cursor = '';
        popup.remove();
    });
});