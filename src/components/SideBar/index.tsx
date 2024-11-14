import { ArrowLeftIcon, Bars3Icon } from '@heroicons/react/24/solid';
import { useMediaQuery } from '@uidotdev/usehooks';
import { useMap, useMapsLibrary } from '@vis.gl/react-google-maps';
import { useEffect, useState } from 'react';
import { Virtuoso } from 'react-virtuoso';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { currentLocationState, Location, locationsState } from '../../models/Locations';
import { LocationItem } from '../LocationItem';
import { EmptyLocations } from './EmptyLocations';

const SideBar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [locations, setLocations] = useRecoilState(locationsState);

  const setCurrentLocation = useSetRecoilState(currentLocationState)

  const isSmallDevice = useMediaQuery("only screen and (max-width : 768px)");

  const map = useMap();
  const routeLibrary = useMapsLibrary('routes')
  const [routeService, setRouteService] = useState<google.maps.DistanceMatrixService | undefined>(undefined);

  useEffect(
    () => {
      if (!routeLibrary || !map) return
      const svc = new routeLibrary.DistanceMatrixService()
      setRouteService(svc)
    }, [routeLibrary, map]
  );


  return (
    <div className='flex flex-row min-h-screen relative shadow-lg'>
      <div className="fixed top-0 z-50">
        {isOpen ?
          (
            <ArrowLeftIcon className='size-10 p-1'
              onClick={() => setIsOpen(false)}
            />
          ) : (
            <Bars3Icon className='size-10 p-1 bg-white rounded border border-gray-200 '
              onClick={() => setIsOpen(true)}
            />
          )}
      </div>
      <div
        className={`${isOpen ? 'w-screen md:w-80' : 'w-0'} duration-300 pt-10`}
      >
        <div className={`${isOpen ? 'block' : 'hidden'} p-1 h-full `}>
          <Virtuoso
            className=''
            style={{
              width: '100%',
              height: '100%',
              scrollbarGutter: 'stable both-edges'
            }}
            components={{
              EmptyPlaceholder: EmptyLocations
            }}

            data={locations}
            itemContent={(_index, location: Location) => (
              <LocationItem
                routeService={routeService}
                location={location}
                onLocationClick={(selLocation) => {
                  setCurrentLocation(selLocation)
                  if (isSmallDevice) {
                    setIsOpen(false)
                  }
                }}
                onLocationDelete={(selLocation) => {
                  setLocations(locations.filter(loc => loc.id !== selLocation.id))
                  if (isSmallDevice) {
                    setIsOpen(false)
                  }
                }}
              />
            )}
          />
        </div>
      </div>

    </div>
  )
}

export { SideBar };
