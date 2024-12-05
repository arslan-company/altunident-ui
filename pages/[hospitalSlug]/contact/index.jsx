import React from 'react';
import { useTranslation } from 'next-i18next';
import { NextSeo } from 'next-seo';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import Navbar from '../../../components/_App/Navbar';
import PageBanner from '../../../components/Common/PageBanner';
import ContactInfo from '../../../components/ContactUs/ContactInfo';
import ContactForm from '../../../components/Common/ContactForm';
import Footer from '../../../components/_App/Footer';
import ContactHospitalList from '../../../components/ContactUs/ContactHospitalList';

import useHospitalRoutes from '@/hooks/useHospitalRoutes';
import useSeo from '@/hooks/useSeo';
import useGlobalHospitalData from '@/hooks/useGlobalHospitalData';

function Contact() {
  const {
    isDefaultHospitalSlugSelected,
    currentHospitalSlugUrl,
  } = useHospitalRoutes();
  const { locale, url } = useSeo();
  const { t } = useTranslation('common');
  const { currentHospitalData } = useGlobalHospitalData();

  const hospital = currentHospitalData.data;

  return (
    <>
      <NextSeo
        title={`${t('contact_page.contact_info_area.title')} ${
          !isDefaultHospitalSlugSelected ? `- ${hospital?.name}` : ''
        }`}
        description={`${
          !isDefaultHospitalSlugSelected ? hospital?.name : t('navbar.nav_items.home')
        } ${t('contact_page.seo.description')}`}
        keywords={
          !isDefaultHospitalSlugSelected
            ? `${hospital?.name} ${t(
              'contact_page.contact_info_area.title',
            )}, ${hospital?.name} ${t('contact_page.seo.address')}, ${
              hospital?.name
            } ${hospital?.name} ${t('contact_page.seo.phone')}, ${
              hospital?.name
            } ${t('contact_page.seo.location')}, ${hospital?.name} ${t(
              'contact_page.seo.where',
            )}`
            : t('contact_page.seo.default')
        }
        titleTemplate={`${t('contact_page.contact_info_area.title')} ${
          !isDefaultHospitalSlugSelected ? `- ${hospital?.name}` : ''
        }`}
        defaultTitle={`${t('contact_page.contact_info_area.title')} ${
          !isDefaultHospitalSlugSelected ? `- ${hospital?.name}` : ''
        }`}
        canonical={url}
        openGraph={{
          title: `${t('contact_page.contact_info_area.title')} ${
            !isDefaultHospitalSlugSelected ? `- ${hospital?.name}` : ''
          }`,
          description: `${
            !isDefaultHospitalSlugSelected ? hospital?.name : t('navbar.nav_items.home')
          } ${t('contact_page.seo.description')}`,
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

      <Navbar transparent={false} />

      <PageBanner
        pageTitle={
          !isDefaultHospitalSlugSelected
            ? `${t('contact_page.page_banner.contact_text')} - ${
              hospital?.name
            }`
            : t('contact_page.contact_info_area.title')
        }
        homePageUrl={!isDefaultHospitalSlugSelected ? currentHospitalSlugUrl : '/'}
        homePageText={
          !isDefaultHospitalSlugSelected
            ? hospital?.name
            : t('contact_page.page_banner.go_homepage_link_text')
        }
        activePageText={t('contact_page.page_banner.contact_text')}
      />

      <div className="pb-50">
        {!isDefaultHospitalSlugSelected && (
          <div className="mb-5">
            <ContactInfo />
          </div>
        )}

        {isDefaultHospitalSlugSelected && (
          <div>
            <ContactHospitalList />
          </div>
        )}

        <div id="contact-form">
          <ContactForm />
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

export default Contact;
