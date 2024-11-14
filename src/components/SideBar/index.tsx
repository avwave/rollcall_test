import { ArrowLeftIcon, Bars3Icon, TrashIcon } from '@heroicons/react/24/solid';
import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { locationsState } from '../../models/Locations';

const SideBar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [locations, setLocations] = useRecoilState(locationsState);

  return (
    <div className='flex hin-h-screen bg-gray-100 relative'>
      {isOpen ?
        (
          <ArrowLeftIcon className='size-10 p-1'
            onClick={() => setIsOpen(false)}
          />
        ) : (
          <Bars3Icon className='size-10 p-1'
            onClick={() => setIsOpen(true)}
          />
        )}
      <div
        className={`${isOpen ? 'w-screen md:w-80' : 'w-0'} duration-300 pt-10`}
      >
        <div className="p-1">
          <ul className={`${isOpen ? 'block' : 'hidden'} list-none`}>

            {locations.map((location, index) => (
              <li key={index} className="py-2 flex flex-row justify-between items-center">
                <button
                  className="flex-grow text-start justify-start text-gray-700 hover:bg-gray-100 focus:outline-none"
                >
                  <span
                    className={
                      `text-sm font-semibold 
                      }`
                    }
                  >
                    {location?.geocode?.formatted_address}
                  </span>
                </button>
                <button
                  className="flex-shrink-0 p-1 min-h-10 min-w-10 rounded border border-red-500"
                  onClick={() => setLocations(locations.filter(loc => loc !== location))}
                >
                  <TrashIcon className="text-gray-500 hover:bg-red-100" />
                </button>
              </li>
            ))}
          </ul>

        </div>
      </div>

    </div>
  )
}

export { SideBar };
