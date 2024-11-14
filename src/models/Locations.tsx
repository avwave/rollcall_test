import { atom, selector } from "recoil";

export interface Location {
  id: string;
  location?: google.maps.LatLngLiteral | null | undefined;
  geocode?: google.maps.GeocoderResult[];
  order: number
}

const locationsAtom = atom<Location[]>({
  key: 'locationStateAtom',
  default: [] as Location[]
})

export const currentLocationState = atom<Location|null>({
  key: 'currentLocationStateAtom',
  default: null as Location | null
})

export interface GeoLatLng extends google.maps.LatLngLiteral {
  accuracy?: number;
}

export const currentGeolocationState = atom<GeoLatLng|null>({
  key:'currentGeolocationAtom',
  default:null
})

export const locationsState = selector({
  key: "locationsStateSelector",
  get: ({ get }) => {
    return get(locationsAtom)
  },
  set: ({set }, newValue) => {
    set(locationsAtom, newValue);
    set(currentLocationState, null)
  }
})