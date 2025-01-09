'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Search, X } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';

import { createSearchParams } from '@/utils/search-params';

import { Input } from '@/components/base/input';
import { Button } from '@/components/base/button';

export default function FilterOptions() {
  // --- HOOKS / STATES --- //
  const t = useTranslations();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');

  // --- SEARCH PARAMS --- //
  const searchParam = searchParams.get('search');

  // --- EFFECTS --- //
  useEffect(() => {
    if (searchParam) setSearchQuery(searchParam);
    else setSearchQuery('');
  }, [searchParam]);

  // --- HANDLERS --- //
  const handleFiltersChange = (filters: { search?: string }) => {
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
    <div className="tw-flex tw-flex-col tw-gap-4 lg:tw-flex-row sm:tw-items-center">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleFiltersChange({ search: searchQuery });
        }}
        className="tw-relative tw-w-full tw-flex-1"
      >
        <Input
          size="sm"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={`${t('doctors_page.filter_area.search_input_placeholder_text')}...`}
          className="tw-w-full"
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
              {!!searchParam && (
                <Button
                  type="button"
                  variant="text"
                  size="iconOnly"
                  className="tw-text-gray-400 hover:tw-text-primary tw-px-1"
                  onClick={() => handleFiltersChange({ search: '' })}
                >
                  <X className="tw-h-5 tw-w-5" />
                </Button>
              )}
            </div>
          }
        />
      </form>
    </div>
  );
}
