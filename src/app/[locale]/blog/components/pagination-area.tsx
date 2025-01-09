'use client';

import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import { Pagination } from '@/components/base/pagination';

import { createSearchParams } from '@/utils/search-params';

export default function PaginationArea({ totalPages }: { totalPages: number }) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const pageParam = searchParams.get('page');

  const handlePageChange = (newPage: number) => {
    const newParmas = createSearchParams(searchParams).set({ page: newPage.toString() }).toString();

    router.push(newParmas);
  };

  return (
    <Pagination
      currentPage={Number(pageParam) || 1}
      totalPages={totalPages}
      onPageChange={handlePageChange}
    />
  );
}
