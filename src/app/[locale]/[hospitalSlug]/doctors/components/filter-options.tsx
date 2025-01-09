'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Search, X } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';

import { createSearchParams } from '@/utils/search-params';

import { Select } from '@/components/base/select';
import { Input } from '@/components/base/input';
import { Button } from '@/components/base/button';

import { departmentsEndpoints } from '@/features/departments';

interface FilterOptionsProps {
  departments: typeof departmentsEndpoints.getDepartments.response.items;
}

export default function FilterOptions({ departments }: FilterOptionsProps) {
  // --- HOOKS / STATES --- //
  const t = useTranslations();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedDepartment, setSelectedDepartment] = useState<number>(-1);
  const [searchQuery, setSearchQuery] = useState('');

  // --- SEARCH PARAMS --- //
  const departmentParam = searchParams.get('department');
  const searchParam = searchParams.get('search');

  // --- EFFECTS --- //
  useEffect(() => {
    if (departmentParam) setSelectedDepartment(Number(departmentParam));
    else setSelectedDepartment(-1);

    if (searchParam) setSearchQuery(searchParam);
    else setSearchQuery('');
  }, [departmentParam, searchParam]);

  const departmentOptions = departments.map((department) => ({
    value: department.id,
    label: department.name,
  }));

  // --- HANDLERS --- //
  const handleFiltersChange = (filters: { department?: number; search?: string }) => {
    const newParams = createSearchParams(searchParams);
    if (filters.department) {
      setSelectedDepartment(filters.department);
      newParams.set({
        department: filters.department === -1 ? undefined : filters.department,
        page: '1',
      });
    }
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
      <div className="tw-flex-1 tw-w-full tw-space-y-2">
        <span className="tw-inline-block">{t('common.filter_by_department')}:</span>
        <Select
          size="sm"
          value={selectedDepartment}
          onChange={(value) => handleFiltersChange({ department: value })}
          options={[
            {
              value: -1,
              label: t('common.all'),
            },
            ...departmentOptions,
          ]}
          placeholder={t('common.filter_by_department')}
          className="tw-w-full"
        />
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleFiltersChange({ search: searchQuery });
        }}
        className="tw-w-full tw-flex-1 tw-space-y-2"
      >
        <span className="tw-inline-block">{t('common.search')}:</span>
        <Input
          size="sm"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={`${t('common.search')}...`}
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
