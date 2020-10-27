import React from 'react';
// import locationiq map module
import mapboxgl from 'mapbox-gl';
 

class LocationMap extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            zoom: 10
        };
    }

    componentDidMount() {
        // access token key for public use
        const public_key = "pk.aaa6516ad9b6cbb929d470960a2812ce";
        // create map
        const map = new mapboxgl.Map({
            container: this.mapContainer,
            style: 'https://tiles.locationiq.com/v2/streets/vector.json?key='+public_key,
            center: [this.props.lon, this.props.lat],
            zoom: this.state.zoom
        });
        // create user location marker
        var marker_element = document.createElement('div');
        marker_element.id = 'marker';
        // search location map marker
        var map_marker = new mapboxgl.Marker(marker_element)
            .setLngLat([this.props.lon, this.props.lat])
            .addTo(map);
    }

    render() {
        return (
            <div className="map-container">
                <div className='sidebar-style'>
                    <div>Longitude: {Math.round(this.props.lon * 100)/100} | Latitude: {Math.round(this.props.lat * 100)/100}</div>
                </div>
                <div ref={el => this.mapContainer = el} className='map-canvas' />
            </div>
        )
    }
}

export default LocationMap;
