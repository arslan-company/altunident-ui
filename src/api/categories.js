import axios from 'axios';

const baseUrl = `${process.env.API_URL}/categories`;

export const getCategories = () => {
  const path = `${baseUrl}/`;

  return axios.get(path).then((response) => response.data);
};

export const getCategory = (categoryId) => {
  const path = `${baseUrl}/${categoryId}`;

  return axios.get(path).then((response) => response.data);
};
