import { createApiHooks } from '@/helpers/create-api';

import { hospitalApi } from '../api';

export const { useQuery: useHospitalQuery, useMutation: useHospitalMutation } =
  createApiHooks(hospitalApi);
