import { createApiHooks } from '@/helpers/create-api';

import { blogApi } from '../api';

export const { useQuery: useBlogQuery, useMutation: useBlogMutation } = createApiHooks(blogApi);
