import { useQuery } from '@tanstack/react-query';

import { getFile } from '../api/files';

/**
 * @param {{
 * params: {
 *   fileName: string;
 * };
 * options: import('@tanstack/react-query').QueryObserverOptions
 * }} params
*/
// eslint-disable-next-line import/prefer-default-export
export function useFile({ params = {}, options = {} }) {
  const fileData = useQuery({
    queryKey: ['file', params],
    queryFn: () => getFile(params.fileName),
    ...options,
  });

  return {
    ...fileData,
  };
}
