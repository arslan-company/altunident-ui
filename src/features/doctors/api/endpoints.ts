import { endpoint } from '@/helpers/create-api';

import type {
  DoctorResponse,
  DoctorsResponse,
  DoctorWorkingHoursResponse,
  DoctorYoutubeLinksResponse,
} from '../types';

export const doctorsEndpoints = {
  getDoctors: endpoint.path('/').get<
    never,
    {
      name?: string;
      hospital_ids?: string | number;
      department_id?: string;
      sort_by?: string;
      sort_order?: string;
      language?: string;
      page?: number;
      size?: number;
    },
    DoctorsResponse
  >(),
  getDoctor: endpoint.path('/:id').get<{ id: string }, { language?: string }, DoctorResponse>(),
  getDoctorWorkingHours: endpoint
    .path('/:id/working-hours')
    .get<
      { id: string },
      { language?: string; page?: number; size?: number },
      DoctorWorkingHoursResponse
    >(),
  getDoctorYoutubeLinks: endpoint
    .path('/:id/youtube-links')
    .get<
      { id: string },
      { page?: number; size?: number; language?: string },
      DoctorYoutubeLinksResponse
    >(),
} as const;
