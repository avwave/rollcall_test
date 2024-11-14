import { TrashIcon } from '@heroicons/react/24/solid';
import React, { useCallback, useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { currentGeolocationState, Location } from '../../models/Locations';
import { getDistanceFromSelf, getFullAddressFromLocation, getRouteAddressFromLocation } from '../../util/address';

interface Props {
  location: Location;
  onLocationDelete: (loc: Location) => void;
  onLocationClick: (loc: Location) => void;
  routeService?: google.maps.DistanceMatrixService;
}
const LocationItem: React.FC<Props> = ({ location, onLocationClick, onLocationDelete, routeService }) => {

  const currentGeoLocation = useRecoilValue(currentGeolocationState)
  const [selfDistance, setSelfDistance] = useState('');

  const renderDistance = useCallback(
    async () => {
      const res = await getDistanceFromSelf(currentGeoLocation, location, routeService)
      setSelfDistance(res)
    }, [currentGeoLocation, location, routeService]
  );

  useEffect(
    () => {
      renderDistance()
    }, [currentGeoLocation, location, renderDistance, routeService]
  );

  return (
    <li key={location.id} className="w-full py-2 flex flex-row justify-between items-center gap-3 border-b-2">
      <button
        className="flex flex-col flex-grow text-start justify-start text-gray-700 hover:bg-gray-100 focus:outline-none"
        onClick={() => {
          onLocationClick(location)
        }}
      >
        <span
          className={
            `text-sm font-semibold`
          }
        >
          {getRouteAddressFromLocation(location)}
        </span>
        <span
          className={
            `text-sm`
          }
        >
          {getFullAddressFromLocation(location)}
        </span>
        <span
          className={
            `text-sm text-red-700`
          }
        >
          {selfDistance}
        </span>
      </button>
      <button
        className="flex-shrink-0 p-1 min-h-10 min-w-10 rounded border border-red-500"
        onClick={() => {
          onLocationDelete(location);
        }}
      >
        <TrashIcon className="text-gray-500 hover:bg-red-100" />
      </button>
    </li>
  )
}

export { LocationItem };

