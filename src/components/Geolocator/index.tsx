import { useCallback, useEffect } from 'react';

import { toast } from 'react-toastify';
import { useRecoilState } from 'recoil';
import { currentGeolocationState } from '../../models/Locations';

const Geolocator = () => {

  const [currentGeolocation, setCurrentGeolocation] = useRecoilState(currentGeolocationState);

  const getLocation = useCallback(
    () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setCurrentGeolocation({
              lat: position.coords.latitude,
              lng: position.coords.longitude
            });

          },
          (error) => {
            toast.error(error.message)
          }
        );
      } else {
        toast.error('Something went wrong: Enable permissions to access your location data  ')
      }

    }, [setCurrentGeolocation]
  );



  useEffect(
    () => {
      if (!currentGeolocation) {
        toast(() => <div onClick={() => getLocation()}>Enable Location</div>, { autoClose: false })
      } else {
        toast.dismiss()
      }
    }, [currentGeolocation, getLocation]
  );
  return null
}


export { Geolocator };
