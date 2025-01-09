import React from 'react';

import { filenameToUrl } from '@/features/files';
import { HospitalCard, hospitalEndpoints } from '@/features/hospitals';

interface HospitalsListProps {
  readonly hospitals: typeof hospitalEndpoints.getHospitals.response.items;
}

export function HospitalsList({ hospitals }: HospitalsListProps) {
  return (
    <div className="tw-grid tw-grid-cols-1 sm:tw-grid-cols-2 xl:tw-grid-cols-4 tw-gap-6">
      {hospitals.map((hospital) => (
        <HospitalCard
          key={hospital?.id}
          imageSrc={filenameToUrl(hospital?.image_url || '')}
          name={hospital?.name || ''}
          slug={hospital?.slug || ''}
          appointmentLink={hospital?.appointment_link}
        />
      ))}
    </div>
  );
}
