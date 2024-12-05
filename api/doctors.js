import axios from 'axios';

const baseUrl = `${process.env.API_URL}/doctor`;

export function getDoctors(
  hospitalIds,
  departmentId,
  searchText,
  size = 12,
  page = 1,
  language = undefined,
) {
  const path = `${baseUrl}/?size=${size}&page=${page}`;

  const params = {
    hospital_ids: hospitalIds,
    department_id: departmentId,
    name: searchText,
    language,
  };

  return axios.get(path, { params }).then((response) => response.data);
}

export function getDoctor(id, language) {
  const path = `${baseUrl}/${id}`;

  const params = {
    language,
  };

  return axios.get(path, { params }).then((response) => response.data);
}

export const getDoctorHospitals = (doctorId) => {
  const path = `${baseUrl}/${doctorId}/hospitals`;

  return axios.get(path).then((response) => response.data);
};

/**
 * @param {number} id
 * @param {number} page
 * @param {number} size
 * @param {string} language
 */
export function getDoctorWorkingHours(id, page = 1, size = 50, language = undefined) {
  const path = `${baseUrl}/${id}/working-hours`;

  const params = {
    doctor_id: id,
    page,
    size,
    language,
  };

  return axios.get(path, { params }).then((response) => response.data);
}

export const getDoctorYoutubeLinks = (doctorId, pageNumber = 1, pageSize = 50) => {
  const path = `${baseUrl}/${doctorId}/youtube-links`;

  const config = {
    headers: {
      'Cache-Control': 'no-cache, no-store, must-revalidate',
    },
    params: {
      page: pageNumber,
      size: pageSize,
    },
  };

  return axios.get(path, config).then((response) => response.data);
};
