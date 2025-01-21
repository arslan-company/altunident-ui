import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';

import { servicesApi } from '../api';
import { ServiceResponse } from '../types';

interface UseServicesOptions {
  page?: number;
  size?: number;
  sort_by?: string;
  sort_order?: string;
}

export function useServices(options: UseServicesOptions = {}) {
  const params = useParams();
  const locale = params?.locale as string;
  const { page = 1, size = 100, sort_by, sort_order } = options;

  const { data, isLoading } = useQuery({
    queryKey: ['services', locale, page, size, sort_by, sort_order],
    queryFn: async () => {
      const response = await servicesApi.getServices({
        query: {
          page,
          size,
          sort_by,
          sort_order,
          language: locale,
        },
      });
      return response;
    },
    staleTime: 5 * 60 * 1000, // 5 dakika boyunca veriyi taze tut
    cacheTime: 30 * 60 * 1000, // 30 dakika boyunca cache'te tut
    refetchOnMount: false, // Component mount olduğunda yeni istek atma
    refetchOnWindowFocus: false, // Sekme aktif olduğunda yeni istek atma
  });

  return {
    services: data?.items as ServiceResponse[] | undefined,
    total: data?.total,
    currentPage: data?.page,
    totalPages: data?.pages,
    isLoading,
  };
} 