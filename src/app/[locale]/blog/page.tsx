import { Grid2x2, TableProperties } from 'lucide-react';
import { Metadata } from 'next';
import Link from 'next/link';
import { getLocale, getTranslations } from 'next-intl/server';

import { Button } from '@/components/base/button';
import Breadcrumb from '@/components/shared/breadcrumb';
import Footer from '@/components/shared/footer';
import Navbar from '@/components/shared/navbar';
import { blogApi, BlogCard, BlogSidebar } from '@/features/blog';
import { filenameToUrl } from '@/features/files';
import generateMeta from '@/utils/generate-meta';

import PaginationArea from './components/pagination-area';

type BlogPageSearchParams = {
  page: string;
  search: string;
  layout: 'grid' | 'list';
};

const fetchData = async (searchParams: BlogPageSearchParams) => {
  const { page, search } = searchParams;

  try {
    const locale = await getLocale();

    const [blogs, recentBlogs] = await Promise.all([
      blogApi.getBlogs({
        query: {
          title: search,
          size: 6,
          page: Number(page) || 1,
          language: locale === 'tr' ? undefined : locale,
        },
      }),
      blogApi.getBlogs({
        query: {
          size: 4,
          language: locale === 'tr' ? undefined : locale,
        },
      }),
    ]);

    return { blogs, recentBlogs };
  } catch (error) {
    console.error('Error from src/app/[locale]/[hospitalSlug]/blog/page.tsx: ', error);
    return {
      blogs: undefined,
      recentBlogs: undefined,
    };
  }
};

export default async function BlogPage({
  searchParams: promiseSearchParams,
}: {
  searchParams: Promise<BlogPageSearchParams>;
}) {
  const searchParams = await promiseSearchParams;

  // --- SERVER DATA --- //
  const { blogs: blogsData, recentBlogs: recentBlogsData } = await fetchData(searchParams);

  // --- UTILS --- //
  const t = await getTranslations();

  // --- DATA --- //
  const blogs = blogsData?.items || [];
  const recentBlogs = recentBlogsData?.items || [];

  const layout = searchParams.layout || 'grid';

  return (
    <>
      <Navbar />
      <Breadcrumb
        title={t('common.blog')}
        items={[{ label: t('site.name'), href: '/' }, { label: t('common.blog') }]}
      />
      <main className="tw-min-h-screen tw-py-12">
        <div className="container tw-mx-auto tw-px-4">
          <div className="tw-grid tw-grid-cols-1 tw-gap-8 lg:tw-grid-cols-4">
            <div className="lg:tw-col-span-3">
              <div className="tw-w-full tw-flex tw-gap-2 tw-justify-end tw-mb-4">
                <Link
                  href={`?layout=grid${searchParams.search ? `&search=${searchParams.search}` : ''}${searchParams.page ? `&page=${searchParams.page}` : ''}`}
                >
                  <Button size="iconOnly" variant={layout === 'grid' ? 'primary' : 'ghost'}>
                    <Grid2x2 className="tw-h-5 tw-w-5" />
                  </Button>
                </Link>
                <Link
                  href={`?layout=list${searchParams.search ? `&search=${searchParams.search}` : ''}${searchParams.page ? `&page=${searchParams.page}` : ''}`}
                >
                  <Button size="iconOnly" variant={layout === 'list' ? 'primary' : 'ghost'}>
                    <TableProperties className="tw-h-5 tw-w-5" />
                  </Button>
                </Link>
              </div>

              <div
                className={`tw-grid tw-grid-cols-1 tw-gap-4 ${layout === 'grid' ? 'md:tw-grid-cols-2' : ''}`}
              >
                {blogs.length > 0 ? (
                  blogs.map((blog) => (
                    <BlogCard
                      key={blog?.id}
                      variant={layout || 'grid'}
                      href={`/blog/${blog?.id}/${blog?.slug}`}
                      data={{
                        id: blog?.id,
                        title: blog?.title,
                        createdAt: blog?.date,
                        imageSrc: filenameToUrl(blog?.cover_image_url),
                        slug: blog?.slug,
                      }}
                    />
                  ))
                ) : (
                  <span className="tw-text-gray-500">{t('common.data_not_found')}...</span>
                )}
              </div>

              {blogsData?.pages && blogsData?.pages > 1 ? (
                <div className="tw-mt-16">
                  <PaginationArea totalPages={blogsData?.pages || 1} />
                </div>
              ) : null}
            </div>
            <div className="lg:tw-col-span-1">
              <BlogSidebar recentBlogs={recentBlogs} />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('meta.blog');
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
      path: '/blog',
    },
  );
}
