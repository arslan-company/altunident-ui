import React from 'react';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import Image from 'next/image';

import useGlobalHospitalData from '@/hooks/useGlobalHospitalData';
import { useFile } from '@/hooks/fetch/useFiles';
import isValidFileName from '@/utils/isValidFileName';
import Button from '../base/Button';
import useDom from '@/hooks/useDom';

function ContactHospitalList() {
  const { hospitalsData } = useGlobalHospitalData();

  const hospitals = hospitalsData.data?.items || [];

  return (
    <div className="contact-info">
      <div className="container">
        <div className="row">
          {hospitals.map((hospital) => (
            <HospitalCard key={hospital?.id} hospital={hospital} />
          ))}
        </div>
      </div>
    </div>
  );
}

function HospitalCard({ hospital }) {
  const { t } = useTranslation('common');
  const { domLoaded } = useDom();

  const imageData = useFile({
    params: {
      fileName: hospital?.image_url,
    },
    options: {
      enabled: !!hospital?.image_url && isValidFileName(hospital?.image_url, ['.png', '.jpg', '.jpeg']),
    },
  });

  const image = imageData.data;

  return (
    <div key={hospital?.id} className="col-lg-3 col-md-6 col-sm-12 mb-2">
      <div className="contact-info-wrapper text-start">
        <Link href={`/${hospital?.slug}/contact/`} className="contact-info-head">
          <Image
            src={image ?? '/img/hospitals/representative-hospital-image.jpg'}
            alt={hospital?.name}
            width={300}
            height={300}
            quality={60}
          />
          <div className="hospital-name">{hospital?.name}</div>
        </Link>
        <div className="contact-info-body">
          <div className="mb-3">
            <p className="m-0">{t('contact_page.contact_hospital_list.card_item.address_title')}</p>
            <p className="fw-normal">{hospital?.contact_address}</p>
          </div>
          <div>
            <p className="m-0">{t('contact_page.contact_hospital_list.card_item.email_title')}</p>
            <p className="fw-normal">{hospital?.contact_email}</p>
          </div>
        </div>
        {domLoaded && (
          <Button as={Link} href={`/${hospital?.slug}/contact/`} size="small" fullWidth cssx={{ borderRadius: '0px' }}>
            {t('contact_page.contact_hospital_list.card_item.location_button')}
          </Button>
        )}
      </div>
    </div>
  );
}

export default ContactHospitalList;
