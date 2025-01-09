'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/cn';

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/base/tooltip';

import { Media } from '@/features/files';
import formatDate from '@/utils/format-date';

interface BlogData {
  id: string | number;
  title: string;
  imageSrc?: string | null;
  createdAt: string;
  parentCategories?: number[];
  slug: string;
}

interface BlogCardProps {
  readonly data: BlogData;
  readonly variant?: 'grid' | 'list';
  readonly href?: string;
}

export function BlogCard({ data, variant = 'grid', href }: BlogCardProps) {
  const t = useTranslations();

  return (
    <article
      className={cn(
        'tw-group tw-overflow-hidden tw-rounded-md tw-border tw-border-gray-200 tw-bg-white tw-shadow-md tw-transition-all hover:tw-shadow-lg',
        variant === 'list' ? 'tw-flex tw-h-48' : 'tw-flex tw-flex-col',
      )}
    >
      <div
        className={cn(
          'tw-relative tw-overflow-hidden tw-p-3',
          variant === 'list' ? 'tw-w-48' : 'tw-aspect-video tw-w-full',
        )}
      >
        <Link
          href={`${href}`}
          className="tw-flex tw-h-full tw-w-full tw-items-center tw-justify-center tw-rounded-md tw-overflow-hidden"
        >
          <Media
            src={data?.imageSrc || '/img/blog/no-image.jpg'}
            className="tw-w-full tw-h-full tw-object-cover"
          />
        </Link>
      </div>

      <div className="tw-flex tw-flex-1 tw-flex-col tw-p-4">
        <div className="tw-mb-2 tw-flex tw-flex-wrap tw-gap-2">
          <span className="tw-text-xs tw-text-gray-500">{formatDate(data?.createdAt)}</span>
          {/* {data?.parentCategories && (
            <div className="tw-flex tw-flex-wrap tw-gap-1">
              {data?.parentCategories?.map((categoryId) => {
                const category = [].find((item) => item.id === categoryId);
                return category ? (
                  <span
                    key={category.id}
                    className="tw-rounded-full tw-bg-primary-50 tw-px-2 tw-py-0.5
                    tw-text-xs tw-font-medium tw-text-primary-700"
                  >
                    {category.name}
                  </span>
                ) : null;
              })}
            </div>
          )} */}
        </div>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link href={`${href}`} className="tw-group tw-mb-2 tw-flex-1 tw-text-left">
                <h3 className="tw-line-clamp-1 tw-text-lg tw-font-semibold tw-text-gray-900 group-hover:tw-text-primary">
                  {data?.title}
                </h3>
              </Link>
            </TooltipTrigger>
            <TooltipContent>
              <p className="tw-max-w-[300px] tw-break-words">{data?.title}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <Link
          href={`${href}`}
          className="tw-inline-flex tw-items-center tw-gap-1 tw-text-sm tw-font-medium tw-text-primary hover:tw-text-primary-700"
        >
          {t('common.read_more')}
          <svg
            className="tw-h-4 tw-w-4 tw-transition-transform group-hover:tw-translate-x-0.5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </article>
  );
}
