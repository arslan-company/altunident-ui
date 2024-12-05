import React from 'react';
import { useTranslation } from 'next-i18next';

import Container from '@/components/base/Container';

import Navbar from '@/components/_App/Navbar';
import Footer from '@/components/_App/Footer';

import PageBanner from '@/components/Common/PageBanner';

import Form from './components/Form';

export default function HumanResourcesView() {
  const { t } = useTranslation('common');

  return (
    <>
      <Navbar />

      <PageBanner
        pageTitle={t('cv_form_page.page_banner.page_title')}
        homePageUrl="/"
        homePageText={t('cv_form_page.page_banner.homepage_text')}
        parentPageUrl="/"
        parentPageText={t('cv_form_page.page_banner.parent_page_text')}
        activePageText={t('cv_form_page.page_banner.active_page_text')}
      />

      <div className="corporate-details-area ptb-50">
        <Container>
          <div className="row">
            <div className="col-12">
              <Form />
            </div>
          </div>
        </Container>
      </div>

      <Footer />
    </>
  );
}
