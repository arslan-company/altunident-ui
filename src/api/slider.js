import axios from 'axios';

const baseUrl = `${process.env.API_URL}/slider`;

export const getSliders = (hospitalId, language) => {
  const path = `${baseUrl}/`;

  const params = {
    hospital_id: hospitalId,
    language,
  };

  return axios.get(path, { params }).then((response) => response.data);
};

export const getSlider = (sliderId) => {
  const path = `${baseUrl}/${sliderId}`;

  return axios.get(path).then((response) => response.data);
};
