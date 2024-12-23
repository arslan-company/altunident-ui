import Image from 'next/image';

import PageBanner from '@/components/Common/PageBanner';
import Footer from '@/components/_App/Footer';
import Navbar from '@/components/_App/Navbar';

import Box from '@/components/base/Box';
import Container from '@/components/base/Container';

export default function QualityStudiesView() {
  return (
    <>
      <Navbar transparent={false} />

      <PageBanner
        pageTitle="Kalite Çalışmaları"
        parentPageText="Kurumsal"
        parentPageUrl="/corporate"
        homePageUrl="/"
        homePageText="Anasayfa"
        activePageText="Kalite Çalışmaları"
      />

      <Box pb="100px">
        <Container>
          <h2>Kalite Yönetim Yapısı:</h2>
          <br />
          <Image
            src="/img/quality-studies/kalite-organizasyonu.png"
            width={1339}
            height={753}
            quality={60}
          />
        </Container>
      </Box>

      <Footer />
    </>
  );
}
