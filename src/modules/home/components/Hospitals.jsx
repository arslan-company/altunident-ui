import React from 'react';
import { useTranslation } from 'next-i18next';

import HospitalCard from '@/components/Common/HospitalCard';

import useGlobalHospitalData from '@/hooks/useGlobalHospitalData';

function Hospitals() {
  const { hospitalsData } = useGlobalHospitalData();
  const { t } = useTranslation('common');

  const hospitals = hospitalsData.data?.items || [];

  if (hospitalsData.isLoading) return <div>{t('common_loading_component.loading_text')}</div>;

  return (
    <div className="hospitals-area bg-color pt-70 pb-70">
      <div className="container">
        <div className="row justify-content-center">
          {hospitals.map((hospital) => (
            <div key={hospital.id} className="col-lg-3 col-sm-6">
              <HospitalCard hospitalData={hospital} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Hospitals;
