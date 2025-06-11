import type { Location } from '@/types/location'

export interface LocationStore {
  locations: Location[]
  _searched?: Location[]
}
