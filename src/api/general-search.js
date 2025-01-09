import axios from 'axios';

const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}/search`;

// eslint-disable-next-line import/prefer-default-export
export const generalSearch = (params) => {
  const path = `${baseUrl}/`;

  const config = {
    params,
  };

  return axios.get(path, config).then((response) => response.data);
};
