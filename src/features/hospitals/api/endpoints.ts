import { endpoint } from '@/helpers/create-api';

import type { HospitalDepartmentsResponse, HospitalResponse, HospitalsResponse } from '../types';

export const hospitalEndpoints = {
  getHospitals: endpoint.path('/').get<
    never,
    {
      name?: string;
      slug?: string;
      department_name?: string;
      departmnet_id?: number | string;
      address?: string;
      phone?: string;
      email?: string;
      sort_by?: string;
      sort_order?: string;
      page?: number;
      size?: number;
      language?: string;
    },
    HospitalsResponse
  >(),
  getHospital: endpoint.path('/:id').get<{ id: string }, { language: string }, HospitalResponse>(),
  getHospitalDepartmentsByHospitalId: endpoint
    .path('/:hospitalId/departments')
    .get<{ hospitalId: string }, { page?: number; size?: number }, HospitalDepartmentsResponse>(),
  getHospitalDepartmentsByDepartmentId: endpoint
    .path('/departments/:departmentId')
    .get<{ departmentId: string }, { page?: number; size?: number }, HospitalDepartmentsResponse>(),
} as const;
