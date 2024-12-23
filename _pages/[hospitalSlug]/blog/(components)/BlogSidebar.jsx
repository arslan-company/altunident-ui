import React, { useContext, useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

import { getBlogs } from '../../../../api/blog';
import { getFile } from '../../../../api/files';
import { useQuery } from '../../../../hooks/useQuery';
import { GlobalContext } from '../../../../context';

function BlogSidebar({ searchDisplay = true }) {
  const router = useRouter();
  const { query: { searchText } } = router;
  const { setQuery } = useQuery();
  const { t } = useTranslation('common');
  const [input, setInput] = useState('');
  const [blogs, setBlogs] = useState([]);
  // const [categories, setCategories] = useState([]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (input !== '') {
      setQuery({ searchText: input });
    } else {
      setQuery({ searchText: '' });
    }
  };

  useEffect(() => {
    const fetchBlogsData = async () => {
      const data = await getBlogs(
        undefined, // title
        4, // size
        1, // page
      );

      setBlogs(data?.items);
    };

    // const fetchCategoriesData = async () => {
    //   const data = await getCategories();

    //   setCategories(data?.items);
    // };

    setInput(searchText);

    fetchBlogsData();
  }, []);

  return (
    <div className="blog-widget-area" id="secondary">
      {searchDisplay && (
        <div className="widget widget_search">
          <h3 className="widget-title">{t('blog_page.blog_sidebar.widget_search.title')}</h3>
          <div className="post-wrap">
            <form className="search-form" onSubmit={(e) => handleSearch(e)}>
              <label>
                <span className="screen-reader-text">Search for:</span>
                <input
                  onChange={(e) => setInput(e.target.value)}
                  value={input}
                  type="search"
                  className="search-field"
                  placeholder={`${t('blog_page.blog_sidebar.widget_search.search_form_input_placeholder_text')}`}
                />
              </label>
              <button type="submit">
                <i className="bx bx-search" />
              </button>
            </form>
          </div>
        </div>
      )}

      <div className="widget widget-peru-posts-thumb">
        <h3 className="widget-title">{t('blog_page.blog_sidebar.widget_latest_posts.title')}</h3>
        <div className="post-wrap">

          {blogs?.map((blog) => (
            <LatestPostCard key={blog?.id} blog={blog} />
          ))}

        </div>
      </div>

      {/* <div className="widget widget_categories">
        <h3 className="widget-title">{t('blog_page.blog_sidebar.widget_categories.title')}</h3>
        <div className="post-wrap">
          <ul>
            {categories?.map((category) => (
              <li>
                <Link href="#!">
                  {category?.category_name}
                  {' '}
                  <span>
                    (0)
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div> */}

      {/* <div className="widget widget_tag_cloud">
        <h3 className="widget-title">{t('blog_page.blog_sidebar.widget_tags.title')}</h3>
        <div className="post-wrap">
          <div className="tagcloud">
            <Link href="/blog-grid">Antibiotic (3)</Link>
            <Link href="/blog-grid">Diseases (3)</Link>
            <Link href="/blog-grid">Heart (2)</Link>
            <Link href="/blog-grid">Health (2)</Link>
            <Link href="/blog-grid">Hospital (1)</Link>
            <Link href="/blog-grid">Infectious </Link>
          </div>
        </div>
      </div> */}
    </div>
  );
}

function LatestPostCard({ blog }) {
  const [image, setImage] = useState(undefined);
  const { hospitalSlugUrl } = useContext(GlobalContext);
  const blogDetailUrl = `${hospitalSlugUrl}/blog/${blog?.id}/`;

  const convertDate = (dateData) => {
    const date = new Date(dateData);

    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  };

  useEffect(() => {
    const fetchFileData = async () => {
      const data = await getFile(blog?.cover_image_url);

      if (!image) {
        setImage(data);
      }
    };

    if (blog?.cover_image_url) {
      fetchFileData();
    }
  }, [image]);

  return (
    <div className="item">
      <a href={blogDetailUrl} className="thumb">
        <Image
          src={`${image || '/img/blog/no-image.jpg'}`}
          className="fullimage"
          alt={blog?.title}
          width={100}
          height={100}
          quality={80}
        />
      </a>
      <div className="info">
        <span className="time">{convertDate(blog?.date)}</span>
        <h4 className="title usmall">
          <a href={blogDetailUrl}>
            {blog?.title}
          </a>
        </h4>
      </div>
      <div className="clear" />
    </div>
  );
}

export default BlogSidebar;
