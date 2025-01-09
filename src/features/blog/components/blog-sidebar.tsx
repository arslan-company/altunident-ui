'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Search, X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useRouter, useSearchParams } from 'next/navigation';

import { createSearchParams } from '@/utils/search-params';
import formatDate from '@/utils/format-date';

import { Button } from '@/components/base/button';
import { Input } from '@/components/base/input';

import { blogEndpoints } from '@/features/blog';
import { filenameToUrl, Media } from '@/features/files';

interface BlogSidebarProps {
  recentBlogs: typeof blogEndpoints.getBlogs.response.items;
  /**
   * default: false
   */
  hideSearch?: boolean;
}

export function BlogSidebar({ recentBlogs, hideSearch = false }: BlogSidebarProps) {
  const t = useTranslations();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  const searchParam = searchParams.get('search');

  const handleFiltersChange = (filters: {
    hospitals?: number;
    department?: number;
    search?: string;
  }) => {
    const newParams = createSearchParams(searchParams);

    if (filters.search || filters.search === '') {
      setSearchQuery(filters.search);
      newParams.set({
        search: filters.search === '' ? undefined : filters.search,
        page: '1',
      });
    }

    router.push(newParams.toString());
  };

  return (
    <div className="tw-w-full">
      {!hideSearch && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleFiltersChange({ search: searchQuery });
          }}
          className="tw-mb-8 tw-px-6 tw-py-4 tw-bg-white tw-rounded-md tw-shadow-md"
        >
          <h3 className="tw-text-xl tw-font-semibold tw-mb-4">{t('common.search_blogs')}</h3>
          <div className="tw-relative">
            <Input
              type="text"
              placeholder={`${t('common.search')}...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              endIcon={
                <div className="tw-flex tw-gap-1 tw-absolute tw-right-0 tw-px-1">
                  <Button
                    type="submit"
                    variant="text"
                    size="iconOnly"
                    className="tw-text-gray-400 hover:tw-text-primary tw-px-1"
                  >
                    <Search className="tw-h-5 tw-w-5" />
                  </Button>
                  {searchParam ? (
                    <Button
                      type="button"
                      variant="text"
                      size="iconOnly"
                      className="tw-text-gray-400 hover:tw-text-primary tw-px-1"
                      onClick={() => {
                        setSearchQuery('');
                        handleFiltersChange({ search: '' });
                      }}
                    >
                      <X className="tw-h-5 tw-w-5" />
                    </Button>
                  ) : null}
                </div>
              }
            />
          </div>
        </form>
      )}

      <div className="tw-mb-8">
        <h3 className="tw-text-xl tw-font-semibold tw-mb-4">{t('common.recent_posts')}</h3>
        <div className="tw-space-y-4">
          {recentBlogs.map((blog) => (
            <Link
              href={`/blog/${blog?.id}/${blog?.slug}`}
              className="tw-flex tw-items-center tw-gap-4 tw-group"
              key={blog?.id}
            >
              <div className="tw-w-20 tw-h-20 tw-flex tw-items-center tw-justify-center tw-rounded-md tw-overflow-hidden">
                <Media
                  src={filenameToUrl(blog?.cover_image_url) || '/img/blog/no-image.jpg'}
                  className="tw-object-cover tw-w-full tw-h-full"
                />
              </div>
              <div>
                <h4 className="tw-font-medium tw-text-sm group-hover:tw-text-primary tw-line-clamp-1 tw-max-w-[200px] tw-w-full">
                  {blog?.title}
                </h4>
                <p className="tw-text-gray-500 tw-text-xs">
                  {formatDate(blog?.date, undefined, {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
