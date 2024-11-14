import { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { currentGeolocationState } from "../../../models/Locations";

import { HomeModernIcon } from "@heroicons/react/24/solid";
import { AdvancedMarker, useMap } from "@vis.gl/react-google-maps";

const SelfMarker = () => {

  const currentGeoLocation = useRecoilValue(currentGeolocationState)

  const map = useMap()


  useEffect(
    () => {
      if (!map || !currentGeoLocation) { return }

      map.panTo(currentGeoLocation)

    }, [currentGeoLocation, map]
  );
  return <>
    <AdvancedMarker
      position={currentGeoLocation}
    >
      <div className="rounded-full bg-blue-400 border-2 border-white shadow-slate-400 shadow-md">
        <HomeModernIcon className="h-8 w-8 p-1 text-white" />
      </div>


    </AdvancedMarker>


  </>

}

export { SelfMarker };
