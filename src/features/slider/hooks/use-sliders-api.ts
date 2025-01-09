import { createApiHooks } from '@/helpers/create-api';

import { slidersApi } from '../api';

export const { useQuery: useSlidersQuery, useMutation: useSlidersMutation } =
  createApiHooks(slidersApi);
