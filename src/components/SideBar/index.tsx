import { ArrowLeftIcon, Bars3Icon } from '@heroicons/react/24/solid';
import { useState } from 'react';

const SideBar = () => {
  const [isOpen, setIsOpen] = useState(false);


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
        onClick={() => setIsOpen(!isOpen)}
        className={`${isOpen ? 'w-screen md:w-64' : 'w-0'} duration-300`}
      >
        <div className="p-5">
          <ul className={`${isOpen ? 'block' : 'hidden'} list-none`}>
            <li className='mt-2'>Item</li>
            <li className='mt-2'>Item</li>
            <li className='mt-2'>Item</li>
            <li className='mt-2'>Item</li>
          </ul>

        </div>
      </div>

    </div>
  )
}

export { SideBar };
