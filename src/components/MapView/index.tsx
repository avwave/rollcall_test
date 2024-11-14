import { APIProvider, Map, MapMouseEvent, useMap } from '@vis.gl/react-google-maps';
import { useCallback, useEffect, useState } from 'react';
import { InfoWindowMarker } from './InfoWindowMarker';
import LocationMarkers from './LocationMarkers';
import { currentLocationState } from '../../models/Locations';
import { useRecoilState } from 'recoil';
import { LocationDetailMarker } from './LocationDetailMarker';

const MapView = () => {

  const [screenMarker, setScreenMarker] = useState<google.maps.LatLngLiteral | null>();
  const [currentLocation, setCurrentLocation] = useRecoilState(currentLocationState);

  const map = useMap();

  useEffect(
    () => {
      if (!map) return
      if (currentLocation) {
        setScreenMarker(null)
      }
      if (currentLocation?.location) {
        map.panTo(currentLocation?.location)
      }
    }, [currentLocation, map]
  );
  const handleMapClick = useCallback(
    async (ev: MapMouseEvent) => {
      setScreenMarker(ev.detail.latLng)
      setCurrentLocation(null)
    }, [setCurrentLocation]
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
    >
      {screenMarker &&
        <InfoWindowMarker latLng={screenMarker} />
      }
      {currentLocation &&
        <LocationDetailMarker location={currentLocation} />
      }
      <LocationMarkers />
    </Map>
  )
}

const MapViewContainer = () => (
  <APIProvider apiKey={import.meta.env.VITE_MAPBOX_TOKEN}>
    <MapView />
  </APIProvider>
)

export { MapViewContainer as MapView };
