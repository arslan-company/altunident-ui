import React, { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { NextSeo } from 'next-seo';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import Navbar from '../../../../components/_App/Navbar';
import PageBanner from '../../../../components/Common/PageBanner';
import HTMLContent from '../../../../components/Blog/HTMLContent';
import Footer from '../../../../components/_App/Footer';
import BlogSidebar from '../(components)/BlogSidebar';
import { getBlog, getBlogs } from '../../../../api/blog';
import Loading from '../../../../components/Common/Loading';
import { getFile } from '../../../../api/files';
import { GlobalContext } from '../../../../context';

function BlogDetail() {
  const { t, i18n } = useTranslation('common');
  const { hospitalSlugUrl } = useContext(GlobalContext);
  const [blog, setBlog] = useState(undefined);
  const [image, setImage] = useState(undefined);
  const [imageLoading, setImageLoading] = useState(false);
  const [nextPostIndex, setNextPostIndex] = useState(0);
  const [prevPostIndex, setPrevPostIndex] = useState(0);
  // router
  const router = useRouter();
  const blogId = Number(router.query.blogId);
  // seo
  const { pathname } = router;
  const url = `https://atakent.com${pathname}`;
  const locale = `${i18n.language}_${i18n.language.toUpperCase()}`;

  const convertDate = (data) => {
    const date = new Date(data);

    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  };

  useEffect(() => {
    const fetchImageData = async () => {
      try {
        setImageLoading(true);
        const response = await getFile(blog?.cover_image_url);

        if (!image) {
          setImage(response);
        }
      } catch (error) {
        setImage(undefined);
      } finally { setImageLoading(false); }
    };

    const fetchBlogData = async () => {
      const data = await getBlog(blogId);
      if (!blog) {
        setBlog(data);
      }
    };

    const fetchBlogsData = async () => {
      try {
        const blogs = await getBlogs(
          undefined, // search text
          50, // size
          undefined, // page
        );

        // find next / prev post
        const blogIndex = blogs?.items.findIndex((item) => item.id === blogId);
        setNextPostIndex(blogs.items[blogIndex + 1].id);
        setPrevPostIndex(blogs.items[blogIndex - 1].id);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('blogs data fetch error: ', error);
      }
    };

    if (blogId) {
      fetchBlogData();
      if (blog?.cover_image_url) {
        fetchImageData();
      }
    }
    fetchBlogsData();
  }, [router, blog, image]);

  return (
    <>
      <NextSeo
        title={blog?.title}
        titleTemplate={blog?.title}
        defaultTitle={blog?.title}
        canonical={url}
        openGraph={{
          title: blog?.title,
          images: [
            {
              url: image || '/img/coming-soon.jpg',
              width: 800,
              height: 600,
              alt: blog?.title,
            },
          ],
          locale,
          url,
        }}
      />

      <Navbar transparent={false} />

      <PageBanner
        pageTitle={blog?.title}
        homePageUrl={`${hospitalSlugUrl}/blog/?page=1&size=6`}
        homePageText={t('blog_detail_page.page_banner.go_blogpage_link_text')}
        activePageText={t('blog_detail_page.page_banner.blog_detail_text')}
      />

      <div className="blog-detail-area pb-100">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 col-md-12">
              <div className="blog-detail-desc">
                {image && (
                  <div className="article-image">
                    {imageLoading ? (
                      <Loading className="py-5" />
                    ) : (
                      <img src={image} alt={blog?.title} />
                    )}
                  </div>
                )}

                <div className="article-content">
                  <div className="entry-meta">
                    <ul>
                      <li>
                        <span>
                          {t('blog_detail_page.article_content_area.entry_meta.date_title')}
                          :
                        </span>
                        {' '}
                        <a href="#">{convertDate(blog?.date)}</a>
                      </li>
                      {/* <li>
                        <span>
                          {t('blog_detail_page.article_content_area.entry_meta.author_title')}
                          :
                        </span>
                        {' '}
                        <a href="#">{blog?.author}</a>
                      </li> */}
                    </ul>
                  </div>

                  <h1 className="title">{blog?.title}</h1>

                  <HTMLContent content={blog?.content} />
                </div>

                <div className="article-footer">
                  <div className="article-tags">
                    <span>
                      <i className="bx bx-share-alt" />
                    </span>
                    <a href="#">{t('blog_detail_page.article_footer_area.share_post_button_text')}</a>
                  </div>

                  <div className="article-share">
                    <ul className="social">
                      <li>
                        <a href="#" target="_blank">
                          <i className="bx bxl-facebook" />
                        </a>
                      </li>
                      <li>
                        <a href="#" target="_blank">
                          <i className="bx bxl-twitter" />
                        </a>
                      </li>
                      <li>
                        <a href="#" target="_blank">
                          <i className="bx bxl-linkedin" />
                        </a>
                      </li>
                      <li>
                        <a href="#" target="_blank">
                          <i className="bx bxl-pinterest-alt" />
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="post-navigation">
                  <div className="navigation-links">
                    <div className="nav-previous">
                      <a href={`${hospitalSlugUrl}/blog/${prevPostIndex}/`}>
                        <i className="bx bx-left-arrow-alt" />
                        {' '}
                        {t('blog_detail_page.post_navigation_area.prev_post_button_text')}
                      </a>
                    </div>

                    <div className="nav-next">
                      <a href={`${hospitalSlugUrl}/blog/${nextPostIndex}/`}>
                        {t('blog_detail_page.post_navigation_area.next_post_button_text')}
                        {' '}
                        <i className="bx bx-right-arrow-alt" />
                      </a>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            <div className="col-lg-4 col-md-12">
              <div className="blog-right-sidebar">
                <BlogSidebar searchDisplay={false} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export async function getServerSideProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale)),
    },
  };
}

export default BlogDetail;
