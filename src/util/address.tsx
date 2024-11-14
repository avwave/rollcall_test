import { toast } from "react-toastify"
import { GeoLatLng, Location } from "../models/Locations"

const getRouteAddressFromLocation = (location: Location): string => {
  const routeAddress = location.geocode?.filter(loc => {
    return loc.types.includes('route')
  })[0]

  let address = ''
  if (routeAddress) {
    address = routeAddress.formatted_address;
  } else {
    address = location.geocode?.[0]?.formatted_address ?? '';
  }
  return address
}


const getFullAddressFromLocation = (location: Location): string => {
  const routeAddress = location.geocode?.filter(loc => {
    return loc.types.includes('premise')
  })[0]

  let address = ''
  if (routeAddress) {
    address = routeAddress.formatted_address;
  } else {
    address = location.geocode?.[0]?.formatted_address ?? '';
  }
  return address
}


const getDistanceFromSelf = async (selfLocation:GeoLatLng|null, destination: Location, library:google.maps.DistanceMatrixService|undefined): Promise<string> => {
  if (!library || !selfLocation || !destination) return 'n/a'

  try {
    const result = await library.getDistanceMatrix({
      origins: [selfLocation],
      destinations: [destination?.location as google.maps.LatLngLiteral],
      travelMode: google.maps.TravelMode.DRIVING,
      unitSystem: google.maps.UnitSystem.METRIC
    })
    return result?.rows[0]?.elements[0]?.distance?.text ?? 'n/a'
  } catch (error) {
    toast.error(`Error getting distance: ${error}`)
    return 'n/a'
  } 

}

export { getRouteAddressFromLocation, getFullAddressFromLocation , getDistanceFromSelf}

