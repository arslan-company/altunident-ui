import axios from 'axios';

const BASE_URL = `${process.env.API_URL}/corporate_events_blog`;
/**
 * @param {{
 * title?: string;
 * sort_by?: string;
 * sort_order?: string;
 * language?: string;
 * page?: number | string;
 * size?: number | string;
 * }} params
*/
export const getCorporateEventsBlogs = (params) => {
  const path = BASE_URL;

  const config = {
    params,
  };

  return axios.get(path, config).then((response) => response.data);
};

export const getCorporateEventsBlog = (blogId) => {
  const path = `${BASE_URL}/${blogId}`;

  return axios.get(path).then((response) => response.data);
};

/**
 * @param {{
 * title: string;
 * author: string;
 * date: string;
 * content: string;
 * slug: string;
 * cover_image_url: string;
 * }} data
*/
export const createCorporateEventsBlog = (data) => {
  const path = BASE_URL;

  return axios.post(path, data).then((response) => response.data);
};

/**
 * @param {string | number} blogId
 * @param {{
 * title: string;
 * author: string;
 * date: string;
 * content: string;
 * slug: string;
 * cover_image_url: string;
 * order_weight?: number;
 * }} data
*/
export const updateCorporateEventsBlog = (blogId, data) => {
  const path = `${BASE_URL}/${blogId}`;

  return axios.patch(path, data).then((response) => response.data);
};

export const deleteCorporateEventsBlog = (blogId) => {
  const path = `${BASE_URL}/${blogId}`;

  return axios.delete(path).then((response) => response.data);
};
