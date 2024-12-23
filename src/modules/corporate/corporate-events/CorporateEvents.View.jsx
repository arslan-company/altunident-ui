import { useTranslation } from 'next-i18next';

import PageBanner from '@/components/Common/PageBanner';
import Footer from '@/components/_App/Footer';
import Navbar from '@/components/_App/Navbar';

import Box from '@/components/base/Box';
import Container from '@/components/base/Container';
import BlogCard from './components/BlogCard';

/**
 * @param {{
 * data: {
 *   corporateEventsBlogsResponse: import('@/types/react-query')
 *      .QueryResult<import('@/types/corporate-events-blog').CorporateEventsBlogs>
 * };
 * }} props
*/
export default function CorporateEventsView({ data }) {
  const { t } = useTranslation('common');

  const { corporateEventsBlogsResponse } = data;

  const corporateEventsBlogs = corporateEventsBlogsResponse.data?.items || [];

  return (
    <>
      <Navbar transparent={false} />

      <PageBanner
        pageTitle={t('corporate_events_page.page_banner.page_title')}
        homePageUrl="/"
        homePageText={t('corporate_events_page.page_banner.homepage_text')}
        activePageText={t('corporate_events_page.page_banner.page_title')}
      />

      <Box pb="100px">
        <Container>
          <h2>{t('corporate_events_page.title')}</h2>
          <p>{t('corporate_events_page.description')}</p>
          <br />
          <div className="row">
            {corporateEventsBlogs.map((blog) => (
              <div key={blog?.id} className="col-sm-12 col-md-6 col-lg-4">
                <BlogCard
                  title={blog?.title}
                  date={blog?.date}
                  image={blog?.cover_image_url}
                  blogId={blog?.id}
                />
              </div>
            ))}
          </div>
        </Container>
      </Box>

      <Footer />
    </>
  );
}
