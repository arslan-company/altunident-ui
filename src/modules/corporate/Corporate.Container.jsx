import React from 'react';
import { NextSeo } from 'next-seo';

import useSeo from '@/hooks/useSeo';

import GoogleTag from '@/components/SEO/GoogleTag';

import CorporateView from './Corporate.View';

export default function CorporateContainer() {
  const { locale, url } = useSeo();

  return (
    <>
      <GoogleTag />

      <NextSeo
        title="Kurumsal"
        description="20.000 m2 kapalı alanda hizmet sunan Özel Atakent Hastanesi’nin Akkurt Grup tarafından alınmasıyla ilk adımları atılan Atakent Sağlık Grubu..."
        keywords="atakent kurumsal, atakent hastanesi kurumsal, atakent sağlık grubu kurumsal"
        titleTemplate="Kurumsal"
        defaultTitle="Kurumsal"
        canonical={url}
        openGraph={{
          title: 'Kurumsal',
          description: '20.000 m2 kapalı alanda hizmet sunan Özel Atakent Hastanesi’nin Akkurt Grup tarafından alınmasıyla ilk adımları atılan Atakent Sağlık Grubu...',
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

      <CorporateView />
    </>
  );
}
