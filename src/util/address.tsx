import { Location } from "../models/Locations"

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

export { getRouteAddressFromLocation, getFullAddressFromLocation }

