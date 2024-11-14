import { APIProvider, Map, MapMouseEvent } from '@vis.gl/react-google-maps';
import { useCallback, useState } from 'react';
import { InfoWindowMarker } from './InfoWindowMarker';

const MapView = () => {

  const [currentMarker, setCurrentMarker] = useState<google.maps.LatLngLiteral | null>();


  const handleMapClick = useCallback(
    async (ev: MapMouseEvent) => {
      setCurrentMarker(ev.detail.latLng)
    }, []
  );

  return (

    <Map
      style={{ width: '100%', height: '100%' }}
      defaultCenter={{
        lat: -37.4502222,
        lng: 144.5742387
      }}
      defaultZoom={13}
      gestureHandling={"greedy"}
      disableDefaultUI={false}
      onClick={handleMapClick}
    >
      <InfoWindowMarker latLng={currentMarker} />
    </Map>
  )
}

const MapViewContainer = () => (
  <APIProvider apiKey={import.meta.env.VITE_MAPBOX_TOKEN}>
    <MapView />
  </APIProvider>
)

export { MapViewContainer as MapView };
