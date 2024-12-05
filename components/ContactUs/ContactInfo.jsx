import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';

import useGlobalHospitalData from '@/hooks/useGlobalHospitalData';

import { useFile } from '@/hooks/fetch/useFiles';

import isValidFileName from '@/utils/isValidFileName';
import HTMLContent from '../Blog/HTMLContent';

function ContactInfo() {
  const { t } = useTranslation('common');
  const { currentHospitalData } = useGlobalHospitalData();

  const hospital = currentHospitalData.data;

  const imageData = useFile({
    params: {
      fileName: hospital?.image_url,
    },
    options: {
      enabled: !!hospital?.image_url && isValidFileName(hospital?.image_url, ['.png', '.jpg', '.jpeg']),
    },
  });

  const image = imageData.data || '/img/hospitals/representative-hospital-image.jpg';

  return (
    <div className="contact-info">
      <div className="container">
        <div className="row">
          <div className="col-12 mb-3">
            <h1 className="fw-bold fs-3">
              {t('contact_page.contact_info_area.title')}
              <span className="fw-bold fs-5 ms-2">
                /
                {' '}
                {hospital?.name}
              </span>
            </h1>
          </div>

          <div className="col-12 row">
            <div className="col-lg-3 col-md-4 col-sm-12 mb-2">
              <div className="contact-info-wrapper text-start">
                <Link href={`${hospital?.slug ? `/${hospital?.slug}/` : '/'}`} className="contact-info-head">
                  <Image
                    src={image}
                    alt={hospital?.name || t('contact_page.contact_info_area.img_alt')}
                    width={300}
                    height={300}
                    quality={60}
                  />
                  <div className="text-white fw-bold fs-6 px-4 py-2 text-center">{hospital?.name}</div>
                </Link>
                <div className="contact-info-body">
                  <h3>{t('contact_page.contact_info_area.card.card_country')}</h3>
                  <p>{hospital?.contact_address}</p>
                  <span>
                    {t('contact_page.contact_info_area.card.card_email_title')}
                    :
                    {' '}
                    {hospital?.contact_email}
                  </span>
                  <span>
                    {t('contact_page.contact_info_area.card.card_phone_title')}
                    :
                    {' '}
                    444 16 77
                  </span>
                </div>
              </div>
            </div>

            <div className="col-lg-9 col-md-8 col-sm-12 mb-2">
              <div className="single-contact-map">
                <HTMLContent content={hospital?.contact_google_maps_iframe} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactInfo;
