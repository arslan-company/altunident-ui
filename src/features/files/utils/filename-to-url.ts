import withImageUrl from '@/utils/with-image-url';

import { filenameType } from './filename-type';

export const filenameToUrl = (filename: string | undefined) => {
  return filenameType(filename || '') === 'unknown' ? null : withImageUrl(filename || '');
};
