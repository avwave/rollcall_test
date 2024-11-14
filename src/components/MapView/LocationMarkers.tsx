import type { Marker } from "@googlemaps/markerclusterer";
import { MarkerClusterer } from '@googlemaps/markerclusterer';

import { useMap } from '@vis.gl/react-google-maps';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { Location, locationsState } from '../../models/Locations';
import { NodeMarker } from './NodeMarker';

const LocationMarkers: React.FC = () => {

  const map = useMap();
  const [markers, setMarkers] = useState<{ [key: string]: Marker }>({});

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
            location={location}
            onClick={(loc) => {
              console.log(loc);
            }}
            setMarkerRef={setMarkerRef}
          />
        ))
      }
    </>
  )
}

export default LocationMarkers;
