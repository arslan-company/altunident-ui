import { hospitalEndpoints } from '@/features/hospitals';

export interface GeneralSearchResponse {
  hospitals: typeof hospitalEndpoints.getHospitals.response.items;
  doctors: any[];
  departments: any[];
}
