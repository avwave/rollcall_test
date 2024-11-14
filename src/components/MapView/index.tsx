import { APIProvider, Map, MapMouseEvent } from '@vis.gl/react-google-maps';
import { useCallback, useState } from 'react';
import { InfoWindowMarker } from './InfoWindowMarker';
import { locationsState } from '../../models/Locations';
import { useRecoilState } from 'recoil';
import LocationMarkers from './LocationMarkers';

const MapView = () => {

  const [currentMarker, setCurrentMarker] = useState<google.maps.LatLngLiteral | null>();

  const [locations, setLocations] = useRecoilState(locationsState);

  const handleMapClick = useCallback(
    async (ev: MapMouseEvent) => {
      setCurrentMarker(ev.detail.latLng)
    }, []
  );

  return (

    <Map
      mapId={'DEMO_MAP_ID'}
      style={{ width: '100%', height: '100%' }}
      defaultCenter={{
        lat: -37.4502222,
        lng: 144.5742387
      }}
      defaultZoom={13}
      gestureHandling={"greedy"}
      disableDefaultUI={false}
      onClick={handleMapClick}
    > <LocationMarkers locations={locations} />
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
