import type { Marker } from "@googlemaps/markerclusterer";
import { MarkerClusterer } from '@googlemaps/markerclusterer';

import { useMap } from '@vis.gl/react-google-maps';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { currentLocationState, Location, locationsState } from '../../models/Locations';
import { NodeMarker } from './NodeMarker';

const LocationMarkers: React.FC = () => {

  const map = useMap();
  const [markers, setMarkers] = useState<{ [key: string]: Marker }>({});

  const setCurrentLocation = useSetRecoilState(currentLocationState)

  const clusterer = useMemo(() => {
    if (!map) return null;

    return new MarkerClusterer({ map });
  }, [map]);

  useEffect(() => {
    if (!clusterer) return;

    clusterer.clearMarkers();
    clusterer.addMarkers(Object.values(markers));
  }, [clusterer, markers]);

  
  const setMarkerRef = useCallback((marker: Marker | null, key: string) => {
    setMarkers(markers => {
      if ((marker && markers[key]) || (!marker && !markers[key]))
        return markers;

      if (marker) {
        return { ...markers, [key]: marker };
      } else {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { [key]: _, ...newMarkers } = markers;

        return newMarkers;
      }
    });
  }, [])

  const locations = useRecoilValue(locationsState);

  return (
    <>
      {
        locations.map((location: Location) => (
          <NodeMarker
            key={location.id}
            location={location}
            onClick={(loc) => {
              setCurrentLocation(loc)
            }}
            setMarkerRef={setMarkerRef}
          />
        ))
      }
    </>
  )
}

export default LocationMarkers;
