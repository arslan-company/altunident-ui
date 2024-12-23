import { useQuery } from '@tanstack/react-query';

import {
  getDoctor,
  getDoctorHospitals,
  getDoctorYoutubeLinks,
  getDoctors,
} from '@/api/doctors';

/**
 * @param {{
 * params: {
 *  hospitalId: number | string;
 *  departmentId: number | string;
 *  name: string;
 *  size: number | string;
 *  page: number | string;
 *  language: string;
 * },
 * options: import('@/types/react-query').QueryOptions<import('@/types/doctors').Doctors>
 * }} params
*/
export function useDoctors({ params = {}, options = {} }) {
  return useQuery({
    queryKey: ['doctors', params],
    queryFn: () => getDoctors(
      params?.hospitalId,
      params?.departmentId,
      params?.name,
      params?.size,
      params?.page,
      params?.language,
    ),
    ...options,
  });
}

/**
 * @param {{
 * params: {
 *  id: number | string;
 *  language: string;
 * },
 * options: import('@/types/react-query').QueryOptions<import('@/types/doctors').Doctor>
 * }} params
*/
export function useDoctor({ params = {}, options = {} }) {
  return useQuery({
    queryKey: ['doctor', params],
    queryFn: () => getDoctor(
      params?.id,
      params?.language,
    ),
    options,
  });
}

/**
 * @param {{
 * params: { doctorId: string };
 * options: import('@/types/react-query').QueryOptions<import('@/types/doctors').DoctorHospitals>
 * }} params
*/
export function useDoctorHospitals({ params = {}, options = {} }) {
  return useQuery({
    queryKey: ['doctor-hospitals', params],
    queryFn: () => getDoctorHospitals(params.doctorId),
    ...options,
  });
}

/**
 * @param {{
 * params: { id: number, pageNumber: number, pageSize: number },
 * options: import('@/types/react-query').QueryOptions<import('@/types/doctors').DoctorYoutubeLinks>
 * }} params
*/
export function useDoctorYoutubeLinks({ params = {}, options = {} }) {
  return useQuery({
    queryKey: ['doctor-youtube-links', params],
    queryFn: () => getDoctorYoutubeLinks(
      params.id,
      params.pageNumber || 1,
      params.pageSize || 12,
    ),
    ...options,
  });
}
