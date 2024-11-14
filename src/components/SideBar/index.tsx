import { ArrowLeftIcon, Bars3Icon, TrashIcon } from '@heroicons/react/24/solid';
import { useState } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { currentLocationState, Location, locationsState } from '../../models/Locations';
import { getFullAddressFromLocation, getRouteAddressFromLocation } from '../../util/address';
import { Virtuoso } from 'react-virtuoso';
import { useMediaQuery } from 'usehooks-ts';

const SideBar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [locations, setLocations] = useRecoilState(locationsState);

  const setCurrentLocation = useSetRecoilState(currentLocationState)

  const isDesktop = useMediaQuery('(min-width: 768px)');

  return (
    <div className='flex flex-row min-h-screen bg-gray-100 relative'>
      <div className="fixed top-0 z-50">
        {isOpen ?
          (
            <ArrowLeftIcon className='size-10 p-1'
              onClick={() => setIsOpen(false)}
            />
          ) : (
            <Bars3Icon className='size-10 p-1 bg-white rounded border border-gray-200'
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
            data={locations}
            itemContent={(index, location: Location) => (
              <li key={location.id} className="w-full py-2 flex flex-row justify-between items-center gap-3 border-b-2">
                <button
                  className="flex flex-col flex-grow text-start justify-start text-gray-700 hover:bg-gray-100 focus:outline-none"
                  onClick={() => {
                    setCurrentLocation(location)
                    if (!isDesktop){
                      setIsOpen(false)
                    }
                  }}
                >
                  <span
                    className={
                      `text-sm font-semibold 
                      }`
                    }
                  >
                    {getRouteAddressFromLocation(location)}
                  </span>
                  <span
                    className={
                      `text-sm
                      }`
                    }
                  >
                    {getFullAddressFromLocation(location)}
                  </span>
                </button>
                <button
                  className="flex-shrink-0 p-1 min-h-10 min-w-10 rounded border border-red-500"
                  onClick={() => {
                    setLocations(locations.filter(loc => loc.id !== location.id))
                    if (!isDesktop) {
                      setIsOpen(false)
                    }
                  }}
                >
                  <TrashIcon className="text-gray-500 hover:bg-red-100" />
                </button>
              </li>
            )}
          />
        </div>
      </div>

    </div>
  )
}

export { SideBar };
