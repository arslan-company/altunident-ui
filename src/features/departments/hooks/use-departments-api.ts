import { createApiHooks } from '@/helpers/create-api';

import { departmentsApi } from '../api';

export const { useQuery: useDepartmentsQuery, useMutation: useDepartmentsMutation } =
  createApiHooks(departmentsApi);
