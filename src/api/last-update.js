import axios from 'axios';

const baseUrl = `${process.env.API_URL}/last_update`;

// eslint-disable-next-line import/prefer-default-export
export const getLastUpdate = () => {
  const path = `${baseUrl}/`;

  return axios.get(path).then((response) => response.data);
};
