import axios from 'axios';

const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}/hospital`;

export function getHospitals(searchText, size = 12, language = undefined) {
  const path = `${baseUrl}/`;

  const config = {
    params: {
      name: searchText,
      size,
      language: language === 'tr' ? undefined : language,
    },
  };

  return axios.get(path, config).then((response) => response.data);
}

export function getHospital(id, language = undefined) {
  const path = `${baseUrl}/${id}`;

  const params = {
    language,
  };

  return axios.get(path, { params }).then((response) => response.data);
}
