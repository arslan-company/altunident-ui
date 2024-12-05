// @ts-check

import axios from 'axios';

const baseUrl = `${process.env.API_URL}/services/`;

/**
 * @typedef {{
 * name?: string;
 * sort_by?: string;
 * sort_order?: string;
 * language?: string;
 * page?: number | string;
 * size?: number | string;
 * }} GetServicesParams
*/

/**
 * @param {GetServicesParams} params
*/
export const getServices = (params) => {
  const path = baseUrl;

  const config = {
    headers: {
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      Pragma: 'no-cache',
    },
    params,
  };

  return axios.get(path, config).then((response) => response.data);
};

/**
 * @typedef {{
 * language?: string;
 * }} GetServiceParams
*/

/**
 * @param {number | string} serviceId
 * @param {GetServiceParams} params
*/
export const getService = (serviceId, params) => {
  const path = `${baseUrl}${serviceId}`;

  const config = {
    headers: {
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      Pragma: 'no-cache',
    },
    params,
  };

  return axios.get(path, config).then((response) => response.data);
};

// JSDOC type exports
export { };
