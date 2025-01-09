import { BASE_API_URL } from '@/constants/api-urls';

const withImageUrl = (path: string) => {
  const url = `${BASE_API_URL}/files/${path}`;
  return url;
};

export default withImageUrl;
