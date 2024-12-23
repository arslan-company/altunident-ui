import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { NextSeo } from 'next-seo';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import Navbar from '../../../components/_App/Navbar';
import PageBanner from '../../../components/Common/PageBanner';
import Footer from '../../../components/_App/Footer';
import hospitals from '../../../mock_data/hospitals.json';

function HospitalDetail() {
  const { t, i18n } = useTranslation('common');
  const [hospital, setHospital] = useState({});
  const router = useRouter();
  const hospitalId = Number(router.query.hospitalId);

  // seo
  const { pathname } = router;
  const url = `https://atakent.com${pathname}`;
  const locale = i18n.language;

  useEffect(() => {
    const findData = () => {
      const data = hospitals.find((hospitalData) => hospitalData.id === hospitalId);
      setHospital(data);
    };

    findData();
  }, [hospital, router]);

  return (
    <>
      <NextSeo
        title={`${hospital?.name} ${t('seo.hospital_detail.title')}`}
        description={`${hospital?.name} ${t('seo.hospital_detail.description1')} - ${hospital?.name} ${t('seo.hospital_detail.description2')}...`}
        keywords={`${hospital?.name}, ${hospital?.name} ${t('seo.hospital_detail.keywords1')}, ${hospital?.name} ${t('seo.hospital_detail.keywords2')}`}
        titleTemplate={`${hospital?.name} ${t('seo.hospital_detail.title')}`}
        defaultTitle={`${hospital?.name} ${t('seo.hospital_detail.title')}`}
        canonical={url}
        openGraph={{
          title: `${hospital?.name} ${t('seo.hospital_detail.title')}`,
          description: `${hospital?.name} ${t('seo.hospital_detail.description1')} - ${hospital?.name} ${t('seo.hospital_detail.description2')}...`,
          images: [
            {
              url: '/img/coming-soon.jpg',
              width: 800,
              height: 600,
              alt: 'atakent',
            },
          ],
          locale,
          url,
        }}
      />

      <Navbar />

      <PageBanner
        pageTitle={hospital?.name}
        homePageUrl="/"
        homePageText="Ana Sayfa"
        activePageText={hospital?.name}
        imgClass="bg-3"
      />

      <div className="hospital-detail-area ptb-50">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="hospital-details-desc">
                <h1 className="title">
                  {hospital?.name}
                </h1>
                <div className="article-content row">
                  <div className="col-sm-12 col-md-8">
                    <p>
                      {hospital?.general_promotion?.description}
                    </p>
                  </div>

                  <div className="cold-sm-12 col-md-4">
                    <img src={hospital?.general_promotion?.image} alt={hospital?.name} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export async function getServerSideProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale)),
    },
  };
}

export default HospitalDetail;
