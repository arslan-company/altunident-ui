import { createApiHooks } from '@/helpers/create-api';

import { corporateApi } from '../api';

export const { useQuery: useCorporateQuery, useMutation: useCorporateMutation } =
  createApiHooks(corporateApi);
