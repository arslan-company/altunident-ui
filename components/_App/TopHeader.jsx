import React, { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'next-i18next';
import Image from 'next/image';

import { GlobalContext } from '../../context';

function TopHeader() {
  const { t, i18n } = useTranslation('common');
  const { socialMediaLinks } = useContext(GlobalContext);
  const {
    FACEBOOK,
    TWITTER,
    INSTAGRAM,
    YOUTUBE,
    WHATSAPP,
  } = socialMediaLinks;

  const imgRootUrl = '/img/slogans';

  const slogans = [
    {
      id: 1,
      locale: 'tr',
      img_url: `${imgRootUrl}/tr.png`,
      text: 'Sağlığınızın Gülümseyen Yüzü - Atakent Hastanesi Slogan',
    },
    {
      id: 2,
      locale: 'en',
      img_url: `${imgRootUrl}/en.png`,
      text: 'The Smiling Face of Your Health - Atakent Hospital',
    },
    {
      id: 3,
      locale: 'de',
      img_url: `${imgRootUrl}/de.png`,
      text: 'Das Lächelnde Gesicht Ihrer Gesundheit - Atakent Krankenhaus',
    },
    {
      id: 4,
      locale: 'fr',
      img_url: `${imgRootUrl}/fr.png`,
      text: 'Le Visage Souriant de Votre Santé - Hôpital Atakent',
    },
    {
      id: 5,
      locale: 'ru',
      img_url: `${imgRootUrl}/ru.png`,
      text: 'Улыбающееся лицо вашего здоровья - Атакентская больница',
    },
    {
      id: 6,
      locale: 'ar',
      img_url: `${imgRootUrl}/ar.png`,
      text: 'وجه صحتك المبتسم - مستشفى أتاكنت',
    },
  ];

  const [currentLanguage, setCurrentLanguage] = useState(slogans[1]);

  useEffect(() => {
    const findCurrentLanguage = () => {
      const language = slogans.find((item) => item.locale === i18n.language);
      setCurrentLanguage(language);
    };

    findCurrentLanguage();
  }, [i18n.language]);

  return (
    <div className="top-header-area-2">
      <div className="container">
        <div className="row">
          <div className="col-lg-8 col-md-6">
            <ul className="header-content-left">
              <li className="slogan-text">
                <div>
                  <Image
                    src={currentLanguage?.img_url}
                    alt={currentLanguage?.text}
                    className="text"
                    width={320}
                    height={48}
                    quality={70}
                  />
                </div>
              </li>
              <li>
                <a href="tel:4441677">
                  <i className="bx bx-phone-call" />
                  444 16 77
                  {t('')}
                </a>
              </li>
              <li>
                <a href="mailto:info@atakent.com">
                  <i className="bx bxs-paper-plane" />
                  info@atakent.com
                </a>
              </li>
            </ul>
          </div>

          <div className="col-lg-4 col-md-6">
            <ul className="header-content-right float-unset">
              <li>
                <a href={FACEBOOK} target="_blank" rel="noreferrer">
                  <i className="bx bxl-facebook" />
                </a>
              </li>
              <li>
                <a href={TWITTER} target="_blank" rel="noreferrer">
                  <i className="bx bxl-twitter" />
                </a>
              </li>
              <li>
                <a href={INSTAGRAM} target="_blank" rel="noreferrer">
                  <i className="bx bxl-instagram" />
                </a>
              </li>
              <li>
                <a href={YOUTUBE} target="_blank" rel="noreferrer">
                  <i className="bx bxl-youtube" />
                </a>
              </li>
              <li>
                <a href={WHATSAPP} target="_blank" rel="noreferrer">
                  <i className="bx bxl-whatsapp" />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TopHeader;
