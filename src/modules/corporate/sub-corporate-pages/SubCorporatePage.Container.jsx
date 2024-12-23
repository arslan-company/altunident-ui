import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';

import GoogleTag from '@/components/SEO/GoogleTag';

import useSeo from '@/hooks/useSeo';
import useLocale from '@/hooks/useLocale';

import { useCorporatePage } from '@/hooks/fetch/useCorporatePages';

import { SubCorporatePageProvider } from './useSubCorporatePage';
import SubCorporatePageView from './SubCorporatePage.View';
import { useFile } from '@/hooks/fetch/useFiles';

export default function SubCorporatePageContainer() {
  const router = useRouter();
  const { locale, url } = useSeo();
  const { currentLanguageQuery } = useLocale();
  const { corporatePageId } = router.query;

  const corporatePageData = useCorporatePage({
    params: {
      id: corporatePageId,
      language: currentLanguageQuery,
    },
    options: {
      enabled: !!corporatePageId,
      retry: false,
    },
  });

  const imageData = useFile({
    params: {
      fileName: corporatePageData.data?.cover_image_url,
    },
    options: {
      enabled: !!corporatePageData.data?.cover_image_url,
    },
  });

  const corporatePage = corporatePageData.data;

  return (
    <SubCorporatePageProvider
      data={{
        corporatePageData,
        imageData,
      }}
    >
      <GoogleTag />

      <NextSeo
        title={corporatePage?.title}
        description={corporatePage?.title}
        keywords="Atakent, Atakent hakkında"
        titleTemplate={corporatePage?.title}
        defaultTitle={corporatePage?.title}
        canonical={url}
        openGraph={{
          title: corporatePage?.title,
          description: corporatePage?.title,
          images: [
            {
              url: '/img/corporate/human-resources.jpg',
              width: 800,
              height: 600,
              alt: `${corporatePage?.title} - Atakent`,
            },
          ],
          locale,
          url,
        }}
      />

      <SubCorporatePageView />
    </SubCorporatePageProvider>
  );
}
