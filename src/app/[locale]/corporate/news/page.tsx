import { getLocale, getTranslations } from 'next-intl/server';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import Footer from '@/components/shared/footer';
import Navbar from '@/components/shared/navbar';
import Breadcrumb from '@/components/shared/breadcrumb';

import { BlogCard } from '@/features/blog';
import { filenameToUrl } from '@/features/files';
import { corporateApi } from '@/features/corporate/api';

import generateMeta from '@/utils/generate-meta';

import PaginationArea from './components/pagination-area';

type CorporateNewsPageSearchParams = {
  page: string;
  search: string;
};

const fetchData = async (searchParams: CorporateNewsPageSearchParams) => {
  const { page, search } = searchParams;

  try {
    const locale = await getLocale();

    const [posts] = await Promise.all([
      corporateApi.getCorporateEventsBlogs({
        query: {
          size: 6,
          page: Number(page) || 1,
          title: search,
          language: locale === 'tr' ? undefined : locale,
        },
      }),
    ]);

    return { posts };
  } catch (error) {
    console.error('Error from src/app/[locale]/corporate/news/page.tsx: ', error);
    return null;
  }
};

export default async function CorporateNewsPage({
  searchParams: promiseSearchParams,
}: {
  searchParams: Promise<CorporateNewsPageSearchParams>;
}) {
  const searchParams = await promiseSearchParams;

  // --- SERVER DATA --- //
  const data = await fetchData(searchParams);

  if (!data) {
    return notFound();
  }

  const { posts: postsData } = data;

  // --- UTILS --- //
  const t = await getTranslations();

  // --- DATA --- //
  const posts = postsData?.items || [];

  return (
    <>
      <Navbar />
      <Breadcrumb
        title="Kurumsal Haberler"
        items={[{ label: t('site.name'), href: '/' }, { label: 'Kurumsal Haberler' }]}
      />
      <main className="tw-min-h-screen tw-py-12">
        <div className="container tw-mx-auto tw-px-4 tw-space-y-6">
          <div>
            <h1>Kurumsal Haberler</h1>
            <p>Atakent Sağlık Grubu kurumsal haberlerine bu bölümden ulaşabilirsiniz.</p>
          </div>
          <div>
            <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 xl:tw-grid-cols-3 tw-gap-4">
              {posts.map((post) => (
                <BlogCard
                  key={post?.id}
                  variant="grid"
                  href={`/corporate/news/${post?.id}/${post?.slug}`}
                  data={{
                    id: post?.id,
                    title: post?.title,
                    createdAt: post?.date,
                    imageSrc: filenameToUrl(post?.cover_image_url),
                    slug: post?.slug,
                  }}
                />
              ))}
            </div>

            {postsData?.pages && postsData?.pages > 1 ? (
              <div className="tw-mt-16">
                <PaginationArea totalPages={postsData?.pages || 1} />
              </div>
            ) : null}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('meta.corporate_news');
  const tSite = await getTranslations('site');

  const hospitalName = tSite('name');

  return await generateMeta(
    {
      title: t('title', { hospital_name: hospitalName }),
      description: t('description', { hospital_name: hospitalName }),
      keywords: t('keywords', { hospital_name: hospitalName }),
      openGraph: {
        title: t('og_title', { hospital_name: hospitalName }),
        description: t('og_description', { hospital_name: hospitalName }),
        images: [
          {
            url: '/img/og-images/og-image.png',
            width: 1200,
            height: 630,
            alt: t('og_image_alt', { hospital_name: hospitalName }),
          },
        ],
      },
      twitter: {
        title: t('twitter_title', { hospital_name: hospitalName }),
        description: t('twitter_description', { hospital_name: hospitalName }),
        images: ['/img/og-images/og-image.png'],
      },
    },
    {
      path: '/corporate/news',
    },
  );
}
