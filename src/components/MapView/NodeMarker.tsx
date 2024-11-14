import type { Marker } from '@googlemaps/markerclusterer';
import { AdvancedMarker, Pin } from '@vis.gl/react-google-maps';
import { useCallback } from 'react';
import { Location } from '../../models/Locations';

export type NodeMarkerProps = {
  location: Location;
  index: number;
  onClick: (location: Location) => void;
  setMarkerRef: (marker: Marker | null, key: string) => void;
};

export const NodeMarker = (props: NodeMarkerProps) => {
  const { location, onClick, setMarkerRef, index } = props;

  const handleClick = useCallback(() => onClick(location), [onClick, location]);
  const ref = useCallback(
    (marker: google.maps.marker.AdvancedMarkerElement) =>
      setMarkerRef(marker, location.id),
    [setMarkerRef, location.id]
  );

  return (
    <AdvancedMarker position={location.location} ref={ref} onClick={handleClick}>
      <Pin 
        glyph={`${index +1}`}
        glyphColor={'white'}
      />
    </AdvancedMarker>
  );
};