import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { NextSeo } from 'next-seo';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import InlineSVG from 'react-inlinesvg';

import useSeo from '@/hooks/useSeo';
import useHospitalRoutes from '@/hooks/useHospitalRoutes';

import Button from '@/components/base/Button';

import Navbar from '../../../components/_App/Navbar';
import PageBanner from '../../../components/Common/PageBanner';
import Footer from '../../../components/_App/Footer';
import BlogSidebar from './(components)/BlogSidebar';
import BlogCard from '../../../components/Common/BlogCard';
import { getHospitals } from '../../../api/hospitals';
import { getBlogs } from '../../../api/blog';
import { usePagination } from '../../../hooks/usePagination';

function Blog({ blogsData, blogsDataPagi, currentHospitalData }) {
  const { Pagination } = usePagination();
  const { locale, url } = useSeo();
  const { defaultHospitalSlug, currentHospitalSlugUrl, currentHospitalSlug } = useHospitalRoutes();
  const { t } = useTranslation('common');
  const router = useRouter();

  const [layout, setLayout] = useState('grid');

  const { query: { page, searchText } } = router;

  return (
    <>
      <NextSeo
        title={t('seo.blog.title')}
        description={t('seo.blog.description')}
        keywords={t('seo.blog.description')}
        titleTemplate={t('seo.blog.title')}
        defaultTitle={t('seo.blog.title')}
        canonical={url}
        openGraph={{
          title: t('seo.blog.title'),
          description: t('seo.blog.description'),
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
        pageTitle={t('blog_page.page_banner.blog_text')}
        homePageUrl={currentHospitalSlug !== defaultHospitalSlug ? currentHospitalSlugUrl : '/'}
        homePageText={currentHospitalSlug !== defaultHospitalSlug ? currentHospitalData?.name : t('blog_page.page_banner.go_homepage_link_text')}
        activePageText={t('blog_page.page_banner.blog_text')}
      />

      <div id="blog-area" className="blog-area pb-100">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 col-md-12">
              <div className="blog-list">
                <div className="row">
                  {searchText && (
                    <div className="col-12">
                      <div className="search-value">
                        &quot;
                        <span className="value">{searchText}</span>
                        &quot;
                        için arama yaptınız
                      </div>
                    </div>
                  )}

                  <div className="col-12 mb-4">
                    <div className="d-flex justify-content-end">
                      <Button onClick={() => setLayout('grid')} variant={layout === 'grid' ? 'contained' : 'text'} size="iconOnly" cssx={{ marginRight: '.3rem' }}>
                        <InlineSVG fill={layout === 'grid' ? 'white' : 'black'} width="23px" src="/icons/grid_view.svg" />
                      </Button>
                      <Button onClick={() => setLayout('list')} variant={layout === 'list' ? 'contained' : 'text'} size="iconOnly">
                        <InlineSVG fill={layout === 'list' ? 'white' : 'black'} width="23px" src="/icons/list_view.svg" />
                      </Button>
                    </div>
                  </div>

                  {blogsData?.map((item) => (
                    <div key={item?.id} className={layout === 'list' ? 'col-12' : 'col-lg-6 col-md-6'}>
                      <BlogCard data={item} cardStyle={layout} />
                    </div>
                  ))}

                  <div className="col-lg-12">
                    <Pagination
                      page={page}
                      pages={blogsDataPagi.pages}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-4 col-md-12">
              <div className="blog-right-sidebar">
                <BlogSidebar />
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export async function getServerSideProps({ locale, query }) {
  const {
    searchText,
    size,
    page,
    hospitalSlug,
  } = {
    searchText: query.searchText || '',
    size: query.size || 6,
    page: query.page || 1,
    hospitalSlug: query.hospitalSlug,
  };

  const fetchBlogsData = () => {
    const response = getBlogs(
      searchText, // title
      size, // size
      page, // page
    );

    return response;
  };

  const fetchHospitalsData = () => {
    const response = getHospitals(
      undefined, // search text
      undefined, // size
      locale, // language
    );

    return response;
  };

  const [blogsData, hospitalsData] = await Promise.all([
    fetchBlogsData(),
    fetchHospitalsData(),
  ]);

  const currentHospitalData = hospitalsData.items.find(
    (item) => item.slug === hospitalSlug,
  ) || null;

  return {
    props: {
      blogsData: blogsData?.items,
      blogsDataPagi: blogsData,
      hospitalsData,
      currentHospitalData,
      ...(await serverSideTranslations(locale)),
    },
  };
}

export default Blog;
