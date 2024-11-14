import { PlusIcon } from '@heroicons/react/24/solid';
import { AdvancedMarker, InfoWindow, Marker, useAdvancedMarkerRef, useMapsLibrary } from '@vis.gl/react-google-maps';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useRecoilState } from 'recoil';
import { v4 } from "uuid";
import { Location, locationsState } from '../../../models/Locations';


interface Props {
  latLng: google.maps.LatLngLiteral | null | undefined;
  geocodeData?: google.maps.GeocoderResponse;
}
const InfoWindowMarker: React.FC<Props> = ({ latLng, geocodeData }) => {

  const geocodingLibrary = useMapsLibrary('geocoding')

  const [geocodingService, setGeocodingService] = useState<google.maps.Geocoder>();

  const [geocode, setGeocode] = useState<google.maps.GeocoderResponse | null | undefined>(geocodeData);

  const [locations, setLocations] = useRecoilState(locationsState);

  const [markerRef, marker] = useAdvancedMarkerRef();

  useEffect(
    () => {
      if (!geocodingLibrary) return
      setGeocodingService(new geocodingLibrary.Geocoder())
    }, [geocodingLibrary]
  );

  const handleMarkerClick = useCallback(
    async () => {

      return null
    }, []
  );

  const fetchGeocode = useCallback(
    async (latLng: google.maps.LatLngLiteral) => {
      try {
        const geocodeResult = await geocodingService?.geocode({ location: latLng })
        setGeocode(geocodeResult)
      } catch (error) {
        console.error(error)
      }
      return null
    }, [geocodingService]
  );
  useEffect(
    () => {
      if (!geocodeData) {
        if (latLng) {
          fetchGeocode(latLng)
        }
      }
    }, [fetchGeocode, geocodeData, latLng]
  );


  const addLocation = useCallback(
    (
      geocode: google.maps.GeocoderResponse | null | undefined,
      location: google.maps.LatLngLiteral | null | undefined
    ) => {
      const newLocation: Location = {
        location: location,
        geocode: geocode?.results,
        id: v4(),
        order: 0
      }
      const newLocations = [...locations, newLocation]
      setLocations(newLocations)

    }, [locations, setLocations]
  );

  return (
    <>
      <AdvancedMarker
        ref={markerRef}
        position={latLng}
        onClick={handleMarkerClick}
      />

      <InfoWindow
        // position={latLng}
        headerDisabled
        anchor={marker}
      >
        <div className="flex flex-col gap-3">
          <div className="flex flex-row gap-1 items-center justify-end">
            <button
              className='p-1 rounded border border-blue-600 flex items-center'
              onClick={() => addLocation(geocode, latLng)}
            >
              Add
              <PlusIcon className="w-4 h-4 text-blue-600" />
            </button>

          </div>
          {geocode?.results[0]?.formatted_address}
        </div>
      </InfoWindow>
    </>


  )
}

export { InfoWindowMarker };
