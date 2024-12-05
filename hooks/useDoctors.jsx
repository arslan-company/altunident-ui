import { useContext } from 'react';
import { useQuery } from '@tanstack/react-query';

import {
  getDoctor,
  getDoctorHospitals,
  getDoctorWorkingHours,
  getDoctorYoutubeLinks,
  getDoctors,
} from '../api/doctors';
import { useHospital } from './useHospitals';
import { useDate } from './useDate';
import { GlobalContext } from '../context';

// mock
import appointmentLinks from '../mock_data/appointment-links.json';

/**
 * useDoctors
 * @param {{
 *  hospitalId: number;
*   departmentId: number;
*   searchText: string;
*   size: number;
*   page: number;
*   language: string;
 * }} params
 * @param {import('@tanstack/react-query').QueryObserverOptions} options
 */
function useDoctors(params = {}, options = {}) {
  const doctorsData = useQuery({
    queryKey: ['doctors', params],
    queryFn: () => getDoctors(
      params.hospitalId || undefined,
      params.departmentId || undefined,
      params.searchText || undefined,
      params.size || undefined,
      params.page || undefined,
      params.language || undefined,
    ),
    ...options,
  });

  // helpers
  const getDoctorsTotal = () => {
    const { data, isLoading, isError } = doctorsData;
    const totalData = isLoading ? 'Loading...' : data?.total;

    return isError ? 'Data Not Found' : totalData;
  };

  const doctorsTotal = getDoctorsTotal();

  return {
    doctors: doctorsData.data,
    doctorsTotal,
    ...doctorsData,
  };
}

/**
 * useDoctor
 * @param {number} id - doctor id
 * @param {string} language - language
 * @param {Object} options - react query options
 */
function useDoctor(id, language = undefined, options = undefined) {
  const { translatedDaysOfTheWeek } = useDate();
  const { languages } = useContext(GlobalContext);

  // requests
  const doctorData = useQuery({
    queryKey: ['doctor', { id, language }],
    queryFn: () => getDoctor(id, language),
    options,
  });

  const doctorWorkingHoursData = useQuery({
    queryKey: ['doctor-working-hours', { id, language }],
    queryFn: () => getDoctorWorkingHours(
      id,
      undefined, // page
      undefined, // size
      language,
    ),
    options,
  });

  const { hospitalAppointmentLink } = useHospital({ id: doctorData?.data?.hospital_id });

  // helpers
  const getTranslatedWorkingHours = () => {
    const { data } = doctorWorkingHoursData;
    const workingHoursData = data?.items || [];

    const datas = {
      tr: [],
      en: [],
      de: [],
      fr: [],
      ru: [],
      ar: [],
    };

    languages.forEach((locale) => {
      const weeks = translatedDaysOfTheWeek[locale.language];

      workingHoursData.forEach((item, index) => {
        datas[locale.language].push({ week: weeks[index], ...item });
      });
    });

    return datas;
  };

  const translatedDoctorWorkingHours = getTranslatedWorkingHours();
  const doctorAppointmentLink = hospitalAppointmentLink;

  return {
    doctor: doctorData.data,
    doctorWorkingHours: doctorWorkingHoursData.data,
    doctorWorkingHoursQuerys: doctorWorkingHoursData,
    translatedDoctorWorkingHours,
    doctorAppointmentLink,
    ...doctorData,
  };
}

/**
 * @param {{
 * params: { doctorId: string };
 * options: import('@tanstack/react-query').QueryObserverOptions
 * }} params
*/
export function useDoctorHospitals({ params = {}, options = {} }) {
  const doctorHospitalsQuery = useQuery({
    queryKey: ['doctor-hospitals', params],
    queryFn: () => getDoctorHospitals(params.doctorId),
    ...options,
  });

  const getHospitalAppointmentLinks = () => {
    const { data, isError } = doctorHospitalsQuery;
    const linkData = appointmentLinks.filter(
      (item) => data?.items?.some(
        (doctorHospitalData) => doctorHospitalData.hospital_id === item.hospitalId,
      ),
    ) || { link: '/' };

    return isError ? '/' : linkData;
  };

  const doctorHospitals = doctorHospitalsQuery.data;
  const hospitalAppointmentLinks = getHospitalAppointmentLinks();

  return {
    doctorHospitals,
    hospitalAppointmentLinks,
    ...doctorHospitalsQuery,
  };
}

/**
 * @param {{
* params: { id: number, pageNumber: number, pageSize: number },
* options: Object,
* }} params
*/
export function useDoctorYoutubeLinks({ params = {}, options = {} }) {
  const doctorYoutubeLinksQuery = useQuery({
    queryKey: ['doctor-youtube-links', params],
    queryFn: () => getDoctorYoutubeLinks(
      params.id,
      params.pageNumber || 1,
      params.pageSize || 12,
    ),
    ...options,
  });

  /**
    * @type {{
    * items: Array<{ id: number, link: string, doctor_id: number }>
    * }}
  */
  const doctorYoutubeLinks = doctorYoutubeLinksQuery.data;

  return {
    doctorYoutubeLinks,
    ...doctorYoutubeLinksQuery,
  };
}

export { useDoctor, useDoctors };
