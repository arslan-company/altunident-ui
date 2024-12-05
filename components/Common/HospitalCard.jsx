import Link from 'next/link';
import NextImage from 'next/image';
import { useTranslation } from 'next-i18next';

import { useFile } from '@/hooks/useFile';

function HospitalCard({ hospitalData }) {
  const { t } = useTranslation('common');

  const { data: image, isSuccess } = useFile({
    params: {
      fileName: hospitalData?.image_url,
    },
    options: {
      enabled: !!hospitalData?.image_url,
      retry: false,
    },
  });

  return (
    <div className="hospital-card">
      <Link href={`/${hospitalData?.slug}/`} className="hospital-card-head">
        <NextImage
          src={isSuccess ? image : '/img/hospitals/representative-hospital-image.jpg'}
          width={400}
          height={400}
          quality={40}
          alt={hospitalData?.name}
        />
        <span className="hospital-name">
          {hospitalData?.name}
        </span>
      </Link>
      <ul>
        <li>
          <Link href={`/hospitals/hospital-detail/${hospitalData?.id}`}>
            {t('homepage.hospitals.general_promotion_button_text')}
          </Link>
        </li>
        <li>
          <Link href={`/${hospitalData?.slug}/departments/`}>
            {t('homepage.hospitals.departments_button_text')}
          </Link>
        </li>
        <li>
          <Link href={`/${hospitalData?.slug}/doctors/`}>
            {t('homepage.hospitals.physician_staff_button_text')}
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default HospitalCard;
