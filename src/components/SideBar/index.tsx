import { ArrowLeftIcon, Bars3Icon } from '@heroicons/react/24/solid';
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
        className={`${isOpen ? 'w-screen md:w-64' : 'w-0'} duration-300 pt-10`}
      >
        <div className="p-1">
          <ul className={`${isOpen ? 'block' : 'hidden'} list-none`}>

            {locations.map((location, index) => (
              <li key={index} className="py-2">
                <button
                  onClick={() => setLocations(locations.filter(loc => loc !== location))}
                  className="flex text-start justify-start text-gray-700 hover:bg-gray-100 focus:outline-none"
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
              </li>
            ))}
          </ul>

        </div>
      </div>

    </div>
  )
}

export { SideBar };
