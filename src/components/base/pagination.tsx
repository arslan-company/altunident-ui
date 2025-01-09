'use client';

/* eslint-disable no-confusing-arrow */

import { ChevronLeft, ChevronRight } from 'lucide-react';

import { cn } from '@/lib/cn';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const showEllipsis = totalPages > 7;

    if (showEllipsis) {
      if (currentPage <= 4) {
        // İlk sayfalar
        for (let i = 1; i <= 5; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push('...');
        pageNumbers.push(totalPages);
      } else if (currentPage >= totalPages - 3) {
        // Son sayfalar
        pageNumbers.push(1);
        pageNumbers.push('...');
        for (let i = totalPages - 4; i <= totalPages; i++) {
          pageNumbers.push(i);
        }
      } else {
        // Orta sayfalar
        pageNumbers.push(1);
        pageNumbers.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push('...');
        pageNumbers.push(totalPages);
      }
    } else {
      pageNumbers.push(...pages);
    }

    return pageNumbers;
  };

  return (
    <nav className="tw-flex tw-justify-center tw-gap-2">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={cn(
          'tw-flex tw-h-10 tw-w-10 tw-items-center tw-justify-center tw-rounded-md tw-border',
          'tw-text-sm tw-transition-colors',
          currentPage === 1
            ? 'tw-border-gray-200 tw-text-gray-300'
            : 'tw-border-gray-300 tw-text-gray-700 hover:tw-bg-gray-50',
        )}
      >
        <ChevronLeft className="tw-h-5 tw-w-5" />
      </button>

      {renderPageNumbers().map((page, index) =>
        page === '...' ? (
          <span
            // eslint-disable-next-line react/no-array-index-key
            key={`ellipsis-${index}`}
            className="tw-flex tw-h-10 tw-w-10 tw-items-center tw-justify-center tw-text-gray-500"
          >
            ...
          </span>
        ) : (
          <button
            key={`page-${page}`}
            onClick={() => onPageChange(Number(page))}
            className={cn(
              'tw-flex tw-h-10 tw-w-10 tw-items-center tw-justify-center tw-rounded-md tw-text-sm',
              currentPage === page
                ? 'tw-bg-primary tw-text-white'
                : 'tw-text-gray-700 hover:tw-bg-gray-50',
            )}
          >
            {page}
          </button>
        ),
      )}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={cn(
          'tw-flex tw-h-10 tw-w-10 tw-items-center tw-justify-center tw-rounded-md tw-border',
          'tw-text-sm tw-transition-colors',
          currentPage === totalPages
            ? 'tw-border-gray-200 tw-text-gray-300'
            : 'tw-border-gray-300 tw-text-gray-700 hover:tw-bg-gray-50',
        )}
      >
        <ChevronRight className="tw-h-5 tw-w-5" />
      </button>
    </nav>
  );
}
