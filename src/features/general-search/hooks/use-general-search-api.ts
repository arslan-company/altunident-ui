import { createApiHooks } from '@/helpers/create-api';

import { generalSearchApi } from '../api';

export const { useQuery: useGeneralSearchQuery, useMutation: useGeneralSearchMutation } =
  createApiHooks(generalSearchApi);
