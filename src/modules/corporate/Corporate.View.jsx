import React from 'react';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';

import Navbar from '@/components/_App/Navbar';
import PageBanner from '@/components/Common/PageBanner';
import Footer from '@/components/_App/Footer';

import Card from './components/Card';

export default function CorporateView() {
  const { t } = useTranslation('common');

  const cardItems = [
    {
      id: 1,
      title: t('corporate_page.card_items_area.card_item_1_title'),
      image: '/img/corporate/human-resources.jpg',
      href: '/corporate/human-resources/',
    },
  ];

  return (
    <>
      <Navbar transparent={false} />

      <PageBanner
        pageTitle={t('corporate_page.page_banner.corporate_text')}
        homePageUrl="/"
        homePageText={t('corporate_page.page_banner.go_homepage_link_text')}
        activePageText={t('corporate_page.page_banner.corporate_text')}
      />

      <div className="corporate-details-area pb-100">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="corporate-img mb-4">
                <Image
                  src="/img/hospitals/gallery/kocaeli-2.jpg"
                  alt="header"
                  width={1000}
                  height={500}
                  quality={80}
                />
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-12 mb-5">
              <div className="corporate-details-text">
                <h5 className="fw-normal">
                  {t('corporate_page.blog_area.top_title')}
                </h5>
                <h1 className="fw-bold">{t('corporate_page.blog_area.title')}</h1>
                <br />

                <div id="content">
                  <p>
                    {t('corporate_page.blog_area.content.paragraph_1.paragraph')}
                  </p>
                  <br />

                  <h3>{t('corporate_page.blog_area.content.paragraph_2.title')}</h3>
                  <p>
                    {t('corporate_page.blog_area.content.paragraph_2.paragraph')}
                  </p>
                  <br />

                  <h3>{t('corporate_page.blog_area.content.paragraph_3.title')}</h3>
                  <p>
                    {t('corporate_page.blog_area.content.paragraph_3.paragraph')}
                  </p>
                </div>
              </div>
            </div>

            <div className="col-12">
              <div className="corporate-card-items">
                {cardItems.map((item) => (
                  <Card
                    key={item.id}
                    href={item.href}
                    image={item.image}
                    title={item.title}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
