import axios from 'axios';

const baseUrl = `${process.env.API_URL}/email`;

export const sendEmail = (data) => {
  const path = `${baseUrl}/reach-us`;

  return axios.post(path, data).then((response) => response.data);
};

export const sendEmailTest = (data) => {
  const path = `${baseUrl}/reach-us`;

  return axios.post(path, data).then((response) => response.data);
};

export const sendCv = (data, file) => {
  const path = `${baseUrl}/send-cv`;

  const formData = new FormData();
  formData.append('cv', file);

  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
    },

    params: data,
  };

  return axios.post(path, formData, config).then((response) => response.data);
};
