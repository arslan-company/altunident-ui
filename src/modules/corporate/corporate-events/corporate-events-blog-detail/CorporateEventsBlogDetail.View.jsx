import { useTranslation } from 'next-i18next';

import PageBanner from '@/components/Common/PageBanner';
import Footer from '@/components/_App/Footer';
import Navbar from '@/components/_App/Navbar';
import Box from '@/components/base/Box';
import Container from '@/components/base/Container';

import BlogImage from './components/BlogImage';
import HTMLContent from '@/components/Blog/HTMLContent';

/**
 * @param {{
 *  data: {
 *    corporateEventsBlogResponse: import('@/types/react-query')
 *     .QueryResult<import('@/types/corporate-events-blog').CorporateEventsBlog>
 *    imageResponse: import('@/types/react-query').QueryResult<any>
 *  };
 * }} props
*/
export default function CorporateEventsBlogDetailView({ data }) {
  const { t } = useTranslation('common');

  const { corporateEventsBlogResponse, imageResponse } = data;

  const blog = corporateEventsBlogResponse.data;
  const image = imageResponse.data;

  return (
    <>
      <Navbar transparent={false} />

      <PageBanner
        pageTitle={blog?.title}
        parentPageText={t('corporate_events_blog_detail_page.page_banner.parent_page_text')}
        parentPageUrl="/corporate/corporate-events/"
        homePageUrl="/"
        homePageText={t('corporate_events_blog_detail_page.page_banner.homepage_text')}
        activePageText={blog?.title}
      />

      <Box pb="100px">
        <Container>
          {image && (
            <BlogImage
              src={image}
              width={680}
              height={440}
              quality={100}
            />
          )}
          <Box as="h1" mt="2rem">{blog?.title}</Box>
          <Box as="h3">{blog?.hospital}</Box>
          <Box as="p">
            {t('corporate_events_blog_detail_page.date')}
            :
            {' '}
            <Box as="span" color="primary">
              {blog?.date}
            </Box>
          </Box>
          <Box mt={2} width="100%">
            <HTMLContent content={blog?.content} />
          </Box>
        </Container>
      </Box>

      <Footer />
    </>
  );
}
