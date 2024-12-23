import axios from 'axios';

const baseUrl = `${process.env.API_URL}/departments`;

export function getDepartments(hospitalIds, searchText, size, language) {
  const path = `${baseUrl}/`;

  const params = {
    hospital_ids: hospitalIds,
    name: searchText,
    size,
    language,
  };

  return axios.get(path, { params }).then((response) => response.data);
}

export function getDepartment(id, language) {
  const path = `${baseUrl}/${id}`;

  const params = {
    language,
  };

  return axios.get(path, { params }).then((response) => response.data);
}
