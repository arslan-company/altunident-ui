import { createApiHooks } from '@/helpers/create-api';

import { servicesApi } from '../api';

export const { useQuery: useServicesQuery, useMutation: useServicesMutation } =
  createApiHooks(servicesApi);
