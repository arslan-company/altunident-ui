'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';

import { servicesEndpoints } from '@/features/services';

import slugify from '@/utils/slugify';

import { Button } from '@/components/base/button';
import { DepartmentCard } from '@/features/departments';

interface ServicesCardListProps {
  services: typeof servicesEndpoints.getServices.response.items;
}

/**
 * ### CLIENT SIDE COMPONENT
 */
export function ServicesCardList({ services }: ServicesCardListProps) {
  const t = useTranslations();
  const { hospitalSlug } = useParams();

  return (
    <div className="tw-text-center tw-space-y-10">
      <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 lg:tw-grid-cols-3 tw-gap-8">
        {services.map((service) => (
          <Link
            className="tw-group tw-block"
            key={service?.name}
            href={`${hospitalSlug ? `/${hospitalSlug}/services` : '/services'}/${service?.id}/${slugify(service?.name)}`}
          >
            <DepartmentCard title={service?.name} />
          </Link>
        ))}
      </div>

      <Link
        className="tw-group tw-block"
        href={hospitalSlug ? `/${hospitalSlug}/services` : '/services'}
      >
        <Button>{t('homepage.services.all_services')}</Button>
      </Link>
    </div>
  );
}
