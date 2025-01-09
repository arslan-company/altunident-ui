import { use } from 'react';

import {
  HospitalContext,
  type HospitalStoreData,
} from '../providers/hospital-store-provider/hospital-store-provider-client';

export function useHospital() {
  return use(HospitalContext) as HospitalStoreData;
}
