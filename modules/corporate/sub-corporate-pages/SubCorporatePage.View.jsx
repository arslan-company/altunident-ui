import PageBanner from '@/components/Common/PageBanner';
import Footer from '@/components/_App/Footer';

import Navbar from '@/components/_App/Navbar';
import Box from '@/components/base/Box';
import Container from '@/components/base/Container';

import useSubCorporatePageModule from './useSubCorporatePage';

export default function SubCorporatePageView() {
  const { corporatePageData, imageData } = useSubCorporatePageModule();

  const corporatePage = corporatePageData.data;

  return (
    <>
      <Navbar transparent={false} />

      <PageBanner
        pageTitle={corporatePage?.title}
        parentPageText="Kurumsal"
        parentPageUrl="/corporate"
        homePageUrl="/"
        homePageText="Anasayfa"
        activePageText={corporatePage?.title}
        imageSrc={imageData.data}
      />

      <Box pb="100px">
        <Container>
          <div
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{
              __html: corporatePage?.html_content,
            }}
          />
        </Container>
      </Box>

      <Footer />
    </>
  );
}
