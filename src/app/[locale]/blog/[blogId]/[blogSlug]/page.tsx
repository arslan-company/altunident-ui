import { Metadata } from 'next';
import { getLocale, getTranslations } from 'next-intl/server';

import Footer from '@/components/shared/footer';
import Navbar from '@/components/shared/navbar';
import Breadcrumb from '@/components/shared/breadcrumb';
import HTMLContent from '@/components/shared/html-content';

import { blogApi, BlogSidebar } from '@/features/blog';
import { filenameToUrl, Media } from '@/features/files';

import formatDate from '@/utils/format-date';
import generateMeta from '@/utils/generate-meta';

type BlogPageParams = {
  blogSlug: string;
  blogId: string;
};

const fetchData = async (params: BlogPageParams) => {
  const { blogId } = params;

  try {
    const locale = await getLocale();

    const [blog, recentBlogs] = await Promise.all([
      blogApi.getBlog({
        params: {
          id: blogId,
        },
        query: {
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

    return { blog, recentBlogs };
  } catch (error) {
    console.error(
      'Error from src/app/[locale]/[hospitalSlug]/blog/[blogId]/[blogSlug]/page.tsx: ',
      error,
    );
    return {
      blog: undefined,
      recentBlogs: undefined,
    };
  }
};

export default async function BlogPage({
  params: promiseParams,
}: {
  params: Promise<BlogPageParams>;
}) {
  const params = await promiseParams;

  // --- SERVER DATA --- //
  const { blog, recentBlogs: recentBlogsData } = await fetchData(params);

  // --- UTILS --- //
  const t = await getTranslations();

  const recentBlogs = recentBlogsData?.items || [];

  return (
    <>
      <Navbar />
      <Breadcrumb
        title={blog?.title || ''}
        items={[
          { label: t('site.name'), href: '/' },
          { label: t('blog_page.page_banner.blog_text'), href: '/blog' },
          { label: blog?.title || '' },
        ]}
      />
      <main className="tw-min-h-screen tw-bg-gray-50 tw-py-12">
        <div className="container tw-mx-auto tw-px-4">
          <div className="tw-grid tw-grid-cols-1 tw-gap-8 lg:tw-grid-cols-4">
            <div className="lg:tw-col-span-3">
              {filenameToUrl(blog?.cover_image_url) ? (
                <div className="tw-mb-6">
                  <Media
                    src={filenameToUrl(blog?.cover_image_url)}
                    className="tw-w-full tw-h-full tw-object-cover tw-rounded-lg"
                    imageProps={{ sizes: '100vw', quality: 80 }}
                  />
                </div>
              ) : null}
              <p className="tw-text-sm tw-text-gray-500 tw-mb-4">
                <span className="tw-text-primary tw-inline-block tw-mr-1">
                  {t('blog_detail_page.article_content_area.entry_meta.date_title')}:
                </span>
                <span>{formatDate(blog?.date || '', undefined, { dateStyle: 'long' })}</span>
              </p>
              <h1 className="tw-text-2xl tw-font-semibold tw-mb-3">{blog?.title}</h1>
              <HTMLContent content={blog?.content || ''} />
            </div>
            <div className="lg:tw-col-span-1">
              <BlogSidebar recentBlogs={recentBlogs} hideSearch />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export async function generateMetadata({
  params: paramsPromise,
}: {
  params: Promise<BlogPageParams>;
}): Promise<Metadata> {
  const params = await paramsPromise;
  const { blogId, blogSlug } = params;

  const locale = await getLocale();
  const t = await getTranslations('meta.blog_detail');
  const tSite = await getTranslations('site');

  const blog = await blogApi.getBlog({
    params: {
      id: blogId,
    },
    query: {
      language: locale === 'tr' ? undefined : locale,
    },
  });

  const hospitalName = tSite('name');
  const blogTitle = blog?.title;
  const blogImage = filenameToUrl(blog?.cover_image_url) || '/img/og-images/og-image.png';

  return await generateMeta(
    {
      title: t('title', { hospital_name: hospitalName, blog_title: blogTitle }),
      description: t('description', {
        hospital_name: hospitalName,
        blog_title: blogTitle,
        blog_excerpt: '',
      }),
      keywords: t('keywords', { hospital_name: hospitalName, blog_keywords: blogTitle }),
      openGraph: {
        title: t('og_title', { hospital_name: hospitalName, blog_title: blogTitle }),
        description: t('og_description', {
          blog_excerpt: blogTitle,
        }),
        images: [
          {
            url: blogImage,
            width: 1200,
            height: 630,
            alt: t('og_image_alt', {
              hospital_name: hospitalName,
              blog_title: blogTitle,
            }),
          },
        ],
      },
      twitter: {
        title: t('twitter_title', { hospital_name: hospitalName, blog_title: blogTitle }),
        description: t('twitter_description', {
          blog_excerpt: blogTitle,
        }),
        images: [blogImage],
      },
    },
    {
      path: `/blog/${blogId}/${blogSlug}`,
    },
  );
}
