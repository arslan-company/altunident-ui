import Image from 'next/image';

import PageBanner from '@/components/Common/PageBanner';
import Footer from '@/components/_App/Footer';
import Navbar from '@/components/_App/Navbar';

import Box from '@/components/base/Box';
import Container from '@/components/base/Container';

export default function OrganizationSchemaView() {
  return (
    <>
      <Navbar transparent={false} />

      <PageBanner
        pageTitle="Organizasyon Şeması"
        parentPageText="Kurumsal"
        parentPageUrl="/corporate"
        homePageUrl="/"
        homePageText="Anasayfa"
        activePageText="Organizasyon Şeması"
      />

      <Box pb="100px">
        <Container>
          <h2>Yalova Atakent Hastanesi Organizasyonu:</h2>
          <br />
          <Image
            src="/img/organization-schema/yalova-atakent-organizasyon.png"
            width={1965}
            height={2040}
            quality={60}
          />
          <br />
          <br />
          <br />
          <br />
          <h2>Kocaeli Atakent Cihan Hastanesi Organizasyonu:</h2>
          <br />
          <Image
            src="/img/organization-schema/kocaeli-cihan-organizasyon.jpg"
            width={3397}
            height={2316}
            quality={60}
          />
        </Container>
      </Box>

      <Footer />
    </>
  );
}
