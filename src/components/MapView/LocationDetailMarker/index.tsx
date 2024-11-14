import { MinusIcon } from '@heroicons/react/24/solid';
import { AdvancedMarker, InfoWindow, useAdvancedMarkerRef } from '@vis.gl/react-google-maps';
import React from 'react';
import { useRecoilState } from 'recoil';
import { Location, locationsState } from '../../../models/Locations';
import { getFullAddressFromLocation } from '../../../util/address';
interface Props {
  location: Location
}
const LocationDetailMarker: React.FC<Props> = ({ location }) => {
  const [markerRef, marker] = useAdvancedMarkerRef();

  const [locations, setLocations] = useRecoilState(locationsState);
  return (
    <>
      <AdvancedMarker
        ref={markerRef}
        position={location.location}
      >
      </AdvancedMarker>
      <InfoWindow
        headerDisabled
        anchor={marker}
      >
        <div className="flex flex-col gap-3">
          <div className="flex flex-row gap-1 items-center justify-end">
            <button
              className='p-1 rounded border border-red-600 text-red-700 flex items-center'
              onClick={() => setLocations(locations.filter(loc => loc.id !== location.id))}
            >
              Remove
              <MinusIcon className="w-4 h-4 text-red-600" />
            </button>

          </div>
          {getFullAddressFromLocation(location)}
        </div>
      </InfoWindow>
    </>


  )
}

export { LocationDetailMarker };

