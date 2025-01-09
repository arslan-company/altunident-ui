import { createApiHooks } from '@/helpers/create-api';

import { doctorsApi } from '../api';

export const { useQuery: useDoctorsQuery, useMutation: useDoctorsMutation } =
  createApiHooks(doctorsApi);
