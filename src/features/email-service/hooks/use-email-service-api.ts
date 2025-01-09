import { createApiHooks } from '@/helpers/create-api';

import { emailServiceApi } from '../api';

export const { useQuery: useEmailServiceQuery, useMutation: useEmailServiceMutation } =
  createApiHooks(emailServiceApi);
