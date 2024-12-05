import React from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

import HospitalCard from '../Common/HospitalCard';
import { useHospitals } from '../../hooks/useHospitals';

function Hospitals() {
  const { locale } = useRouter();
  // multi language
  const { t } = useTranslation('common');

  // custom hooks
  const { hospitals, isLoading } = useHospitals(
    { language: locale }, // params
    { staleTime: 30000, refetchOnWindowFocus: false }, // options
  );

  if (isLoading) return <div>{t('common_loading_component.loading_text')}</div>;

  return (
    <div className="hospitals-area bg-color pt-70 pb-70">
      <div className="container">
        <div className="row justify-content-center">
          {hospitals?.items.map((hospital) => (
            <div key={hospital.id} className="col-lg-3 col-sm-6">
              <HospitalCard hospitalData={hospital} />
              {t('')}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Hospitals;
