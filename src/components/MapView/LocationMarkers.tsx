import React from 'react';
import { Location } from '../../models/Locations';
import { AdvancedMarker, Marker, Pin } from '@vis.gl/react-google-maps';
interface Props {
  locations: Location[]
}

const LocationMarkers: React.FC<Props> = ({ locations }) => {
  return (
    <>
      {
        locations.map((location: Location) => (
          location.location &&
          <AdvancedMarker
            key={location.id}
            position={{
              lat: location.location?.lat || 0,
              lng: location.location?.lng || 0
            }}
            title={location.geocode?.formatted_address}>
            <Pin />
          </AdvancedMarker>
          
        ))
      }
    </>
  )
}

export default LocationMarkers;
