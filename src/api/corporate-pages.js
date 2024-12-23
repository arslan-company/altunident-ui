import axios from 'axios';

const BASE_URL = `${process.env.API_URL}/corporate_pages`;

export const getCorporatePages = (params) => {
  const path = `${BASE_URL}/`;

  const config = {
    params,
  };

  return axios.get(path, config).then((response) => response.data);
};

export const getCorporatePage = (id, language) => {
  const path = `${BASE_URL}/${id}`;

  const config = {
    params: {
      language,
    },
  };

  return axios.get(path, config).then((response) => response.data);
};
