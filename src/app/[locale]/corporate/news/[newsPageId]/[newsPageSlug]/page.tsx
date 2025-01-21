import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getLocale, getTranslations } from 'next-intl/server';

import Breadcrumb from '@/components/shared/breadcrumb';
import Footer from '@/components/shared/footer';
import HTMLContent from '@/components/shared/html-content';
import Navbar from '@/components/shared/navbar';
import { corporateApi } from '@/features/corporate/api';
import { filenameToUrl, Media } from '@/features/files';
import formatDate from '@/utils/format-date';
import generateMeta from '@/utils/generate-meta';

type CorporateNewsDetailPageParams = {
  newsPageSlug: string;
  newsPageId: string;
};

const fetchData = async (params: CorporateNewsDetailPageParams) => {
  const { newsPageId } = params;

  try {
    const locale = await getLocale();

    const [post] = await Promise.all([
      corporateApi.getCorporateEventsBlog({
        params: {
          id: newsPageId,
        },
        query: {
          language: locale === 'tr' ? undefined : locale,
        },
      }),
    ]);

    return { post };
  } catch (error) {
    console.error(
      'Error from src/app/[locale]/corporate/news/[newsPageId]/[newsPageSlug]/page.tsx: ',
      error,
    );
    return null;
  }
};

export default async function CorporatePage({
  params: promiseParams,
}: {
  params: Promise<CorporateNewsDetailPageParams>;
}) {
  const params = await promiseParams;

  // --- SERVER DATA --- //
  const data = await fetchData(params);

  if (!data) {
    return notFound();
  }

  const { post } = data;

  // --- UTILS --- //
  const t = await getTranslations();

  return (
    <>
      <Navbar />
      <Breadcrumb
        title={post?.title || ''}
        items={[
          { label: t('site.name'), href: '/' },
          { label: t('corporate_page.page_banner.corporate_text'), href: '/corporate' },
          { label: post?.title || '' },
        ]}
      />
      <main className="tw-min-h-screen tw-bg-gray-50 tw-py-12">
        <div className="container tw-mx-auto tw-px-4">
          {filenameToUrl(post?.cover_image_url) ? (
            <div className="tw-mb-6">
              <Media
                src={filenameToUrl(post?.cover_image_url)}
                className="tw-w-full tw-h-full tw-object-cover tw-rounded-lg"
                imageProps={{ sizes: '100vw', quality: 80 }}
              />
            </div>
          ) : null}
          <p className="tw-text-sm tw-text-gray-500 tw-mb-4">
            <span className="tw-text-primary tw-inline-block tw-mr-1">Tarih:</span>
            <span>{formatDate(post?.date || '', undefined, { dateStyle: 'long' })}</span>
          </p>
          <h1 className="tw-text-2xl tw-font-semibold tw-mb-3">{post?.title}</h1>
          <HTMLContent content={post?.content || ''} />
        </div>
      </main>
      <Footer />
    </>
  );
}

export async function generateMetadata({
  params: paramsPromise,
}: {
  params: Promise<CorporateNewsDetailPageParams>;
}): Promise<Metadata> {
  const params = await paramsPromise;
  const { newsPageId, newsPageSlug } = params;

  const locale = await getLocale();
  const t = await getTranslations('meta.corporate_detail');
  const tSite = await getTranslations('site');

  const post = await corporateApi.getCorporateEventsBlog({
    params: {
      id: newsPageId,
    },
    query: {
      language: locale === 'tr' ? undefined : locale,
    },
  });

  const hospitalName = tSite('name');
  const postTitle = post?.title;
  const postImage = filenameToUrl(post?.cover_image_url) || '/img/og-images/og-image.png';

  return await generateMeta(
    {
      title: t('title', { hospital_name: hospitalName, corporate_title: postTitle }),
      description: t('description', {
        hospital_name: hospitalName,
        corporate_title: postTitle,
      }),
      keywords: t('keywords', {
        hospital_name: hospitalName,
        corporate_title: postTitle,
      }),
      openGraph: {
        title: t('og_title', {
          hospital_name: hospitalName,
          corporate_title: postTitle,
        }),
        description: t('og_description', {
          hospital_name: hospitalName,
          corporate_title: postTitle,
        }),
        images: [
          {
            url: postImage,
            width: 1200,
            height: 630,
            alt: t('og_image_alt', {
              hospital_name: hospitalName,
              corporate_title: postTitle,
            }),
          },
        ],
      },
      twitter: {
        title: t('twitter_title', {
          hospital_name: hospitalName,
          corporate_title: postTitle,
        }),
        description: t('twitter_description', {
          hospital_name: hospitalName,
          corporate_title: postTitle,
        }),
        images: [postImage],
      },
    },
    {
      path: `/corporate/news/${newsPageId}/${newsPageSlug}`,
    },
  );
}
