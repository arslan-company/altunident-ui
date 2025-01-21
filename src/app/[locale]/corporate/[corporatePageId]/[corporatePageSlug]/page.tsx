import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getLocale, getTranslations } from 'next-intl/server';

import Breadcrumb from '@/components/shared/breadcrumb';
import Footer from '@/components/shared/footer';
import HTMLContent from '@/components/shared/html-content';
import Navbar from '@/components/shared/navbar';
import { corporateApi } from '@/features/corporate/api';
import { filenameToUrl, Media } from '@/features/files';
import generateMeta from '@/utils/generate-meta';

type CorporatePageParams = {
  corporatePageSlug: string;
  corporatePageId: string;
};

const fetchData = async (params: CorporatePageParams) => {
  const { corporatePageId } = params;

  try {
    const locale = await getLocale();

    const [corporatePage] = await Promise.all([
      corporateApi.getCorporatePage({
        params: {
          id: corporatePageId,
        },
        query: {
          language: locale === 'tr' ? undefined : locale,
        },
      }),
    ]);

    return { corporatePage };
  } catch (error) {
    console.error(
      'Error from src/app/[locale]/corporate/[corporatePageId]/[corporatePageSlug]/page.tsx: ',
      error,
    );
    return null;
  }
};

export default async function CorporatePage({
  params: promiseParams,
}: {
  params: Promise<CorporatePageParams>;
}) {
  const params = await promiseParams;

  // --- SERVER DATA --- //
  const data = await fetchData(params);

  if (!data) {
    return notFound();
  }

  const { corporatePage } = data;

  // --- UTILS --- //
  const t = await getTranslations();

  return (
    <>
      <Navbar />
      <Breadcrumb
        title={corporatePage?.title || ''}
        items={[
          { label: t('site.name'), href: '/' },
          { label: t('corporate_page.page_banner.corporate_text'), href: '/corporate' },
          { label: corporatePage?.title || '' },
        ]}
      />
      <main className="tw-min-h-screen tw-bg-gray-50 tw-py-12">
        <div className="container tw-mx-auto tw-px-4">
          {filenameToUrl(corporatePage?.cover_image_url) ? (
            <div className="tw-mb-6">
              <Media
                src={filenameToUrl(corporatePage?.cover_image_url)}
                className="tw-w-full tw-h-full tw-object-cover tw-rounded-lg"
                imageProps={{ sizes: '100vw', quality: 80 }}
              />
            </div>
          ) : null}
          <h1 className="tw-text-2xl tw-font-semibold tw-mb-3">{corporatePage?.title}</h1>
          <HTMLContent content={corporatePage?.html_content || ''} />
        </div>
      </main>
      <Footer />
    </>
  );
}

export async function generateMetadata({
  params: paramsPromise,
}: {
  params: Promise<CorporatePageParams>;
}): Promise<Metadata> {
  const params = await paramsPromise;
  const { corporatePageId, corporatePageSlug } = params;

  const locale = await getLocale();
  const t = await getTranslations('meta.corporate_detail');
  const tSite = await getTranslations('site');

  const corporatePage = await corporateApi.getCorporatePage({
    params: {
      id: corporatePageId,
    },
    query: {
      language: locale === 'tr' ? undefined : locale,
    },
  });

  const hospitalName = tSite('name');
  const corporatePageTitle = corporatePage?.title;
  const corporatePageImage =
    filenameToUrl(corporatePage?.cover_image_url) || '/img/og-images/og-image.png';

  return await generateMeta(
    {
      title: t('title', { hospital_name: hospitalName, corporate_title: corporatePageTitle }),
      description: t('description', {
        hospital_name: hospitalName,
        corporate_title: corporatePageTitle,
      }),
      keywords: t('keywords', {
        hospital_name: hospitalName,
        corporate_title: corporatePageTitle,
      }),
      openGraph: {
        title: t('og_title', {
          hospital_name: hospitalName,
          corporate_title: corporatePageTitle,
        }),
        description: t('og_description', {
          hospital_name: hospitalName,
          corporate_title: corporatePageTitle,
        }),
        images: [
          {
            url: corporatePageImage,
            width: 1200,
            height: 630,
            alt: t('og_image_alt', {
              hospital_name: hospitalName,
              corporate_title: corporatePageTitle,
            }),
          },
        ],
      },
      twitter: {
        title: t('twitter_title', {
          hospital_name: hospitalName,
          corporate_title: corporatePageTitle,
        }),
        description: t('twitter_description', {
          hospital_name: hospitalName,
          corporate_title: corporatePageTitle,
        }),
        images: [corporatePageImage],
      },
    },
    {
      path: `/corporate/${corporatePageId}/${corporatePageSlug}`,
    },
  );
}
