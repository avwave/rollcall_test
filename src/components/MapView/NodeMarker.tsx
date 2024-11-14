import type { Marker } from '@googlemaps/markerclusterer';
import React, { useCallback } from 'react';
import { AdvancedMarker, Pin } from '@vis.gl/react-google-maps';
import { Location } from '../../models/Locations';

export type NodeMarkerProps = {
  location: Location;
  onClick: (location: Location) => void;
  setMarkerRef: (marker: Marker | null, key: string) => void;
};

export const NodeMarker = (props: NodeMarkerProps) => {
  const { location, onClick, setMarkerRef } = props;

  const handleClick = useCallback(() => onClick(location), [onClick, location]);
  const ref = useCallback(
    (marker: google.maps.marker.AdvancedMarkerElement) =>
      setMarkerRef(marker, location.id),
    [setMarkerRef, location.id]
  );

  return (
    <AdvancedMarker position={location.location} ref={ref} onClick={handleClick}>
      <Pin/>
    </AdvancedMarker>
  );
};