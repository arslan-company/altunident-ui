import { useQuery } from '@tanstack/react-query';
import { getDepartment, getDepartments } from '../api/deparments';

/**
 * useDepartments
 * @param {Object} params - parameters
 * @param {number} params.hospitalIds - hospital id
 * @param {string} params.searchText - search text
 * @param {number} params.size - size
 * @param {string} params.language - language
 * @param {Object} options - react query options
 */
export function useDepartments(params = {}, options = {}) {
  const departmentsData = useQuery({
    queryKey: ['departments', { ...params }],
    queryFn: () => getDepartments(
      params.hospitalIds || undefined,
      params.searchText || undefined,
      params.size || undefined,
      params.language || undefined,
    ),
    ...options,
  });

  return {
    departments: departmentsData.data,
    ...departmentsData,
  };
}

/**
 * useDepartment
 * @param {{
 *  id: number;
 *  language: string;
 * }} params - parameters
 * @param {import('@tanstack/react-query').QueryObserverOptions} options - react query options
 */
export function useDepartment(params = {}, options = {}) {
  if (params.id === undefined || params.id == null) {
    // eslint-disable-next-line no-console
    console.error("The 'id' parameter is required. (reading for 'useDepartment').");
  }

  const departmentData = useQuery({
    queryKey: ['department', { ...params }],
    queryFn: () => getDepartment(
      params.id,
      params.language,
    ),
    ...options,
  });

  // helpers
  const getDepartmentName = () => {
    const { data, isLoading, isError } = departmentData;
    const departmentName = isLoading ? 'Loading...' : data?.name;

    return isError ? 'Department Not Found' : departmentName;
  };

  const departmentName = getDepartmentName();

  return {
    department: departmentData.data,
    departmentName,
    ...departmentData,
  };
}
