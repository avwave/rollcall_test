import { Map, MapMouseEvent, useMap } from '@vis.gl/react-google-maps';
import { useCallback, useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { currentLocationState } from '../../models/Locations';
import { InfoWindowMarker } from './InfoWindowMarker';
import { LocationDetailMarker } from './LocationDetailMarker';
import LocationMarkers from './LocationMarkers';

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
      defaultZoom={15}
      gestureHandling={"greedy"}
      disableDefaultUI
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


export { MapView };
