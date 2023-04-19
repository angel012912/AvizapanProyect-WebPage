import * as React from 'react';
import Map, {Marker} from 'react-map-gl';

function PruebaMap({markers}) {
  return <Map
    initialViewState={{
      longitude: -99.2675,
      latitude: 19.5562,
      zoom: 9,
      scrollZoom: false,
    }}
    style={{width: '80vw', height: '50vh', borderRadius: '15px'}}
    mapStyle="mapbox://styles/mapbox/dark-v9"
    mapboxAccessToken= "pk.eyJ1IjoiYW5nZWwwMTI5MTIiLCJhIjoiY2wzOWpqampiMGFqdzNqbzUyN3VkbThoNSJ9.-Geofb50Jj2CZcZoYkMM4g"
  >
  {markers}
  </Map>
}

export default PruebaMap;