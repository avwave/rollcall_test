import { atom } from "recoil";

export interface Location {
  id: string;
  location?: google.maps.LatLngLiteral | null | undefined;
  geocode?: google.maps.GeocoderResult;
  order: number
}

export const locationsState = atom({
  key: 'locationStateAtom',
  default: [] as Location[]
})