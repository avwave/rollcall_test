import { APIProvider, APIProviderContext, Map, MapMouseEvent, useMap, useMapsLibrary } from '@vis.gl/react-google-maps';
import { useCallback, useEffect, useState } from 'react';

const MapView = () => {

  const geocodingLibrary = useMapsLibrary('geocoding')
  const map = useMap()

  const [geocodingService, setGeocodingService] = useState<google.maps.Geocoder>();

  useEffect(
    () => {
      if (!geocodingLibrary || !map) return
      setGeocodingService(new geocodingLibrary.Geocoder())
    }, [geocodingLibrary, map]
  );

  const handleMapClick = useCallback(
    async (ev: MapMouseEvent) => {
      try {
        const geocodeResult = await geocodingService?.geocode({location: ev.detail.latLng})
        console.log('index.tsx (21)', geocodeResult)
      } catch (error) {
        console.error(error)
      }

    }, [geocodingService]
  );

  return (
    
      <Map
        style={{ width: '100%', height: '100%' }}
        defaultCenter={{
          lat: -37.4502222,
          lng: 144.5742387
        }}
        defaultZoom={13}
        gestureHandling={"greedy"}
        disableDefaultUI={false}
        onClick={handleMapClick}
      >
        
      </Map>
  )
}

const MapViewContainer = () => (
  <APIProvider apiKey={import.meta.env.VITE_MAPBOX_TOKEN}>
    <MapView/>
  </APIProvider>
)

export { MapViewContainer as MapView };
