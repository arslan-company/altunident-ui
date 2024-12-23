import { useContext, useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';

import parentCategories from '../../mock_data/blogs/parentCategories.json';
import { getFile } from '../../api/files';
import Loading from './Loading';
import { GlobalContext } from '../../context';

function BlogCard({ data, cardStyle }) {
  const { hospitalSlugUrl } = useContext(GlobalContext);
  const { t } = useTranslation('common');
  const [image, setImage] = useState(undefined);
  const [imageLoading, setImageLoading] = useState(false);

  const blogDetailUrl = `${hospitalSlugUrl}/blog/${data?.id}/`;

  const convertDate = (dateData) => {
    const date = new Date(dateData);

    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  };

  useEffect(() => {
    const fetchImageData = async () => {
      try {
        setImageLoading(true);
        const response = await getFile(data.cover_image_url);

        if (!image) {
          setImage(response);
        }
      } catch (error) {
        setImage(undefined);
      } finally { setImageLoading(false); }
    };

    if (data.cover_image_url) {
      fetchImageData();
    }
  }, [image]);

  return (
    <div className={`blog-card ${cardStyle === 'list' && 'list'}`}>
      <div className="blog-card-head">
        <div className="blog-extra-detail">
          <span className="blog-date">{convertDate(data?.date)}</span>
          {data?.parentCategories && (
            <div className="blog-parent-categories-wrapper">
              {data?.parentCategories.map((categoryId) => {
                const items = parentCategories.filter((item) => item.id === categoryId);
                return items.map((item) => (
                  <span key={item.id} className="blog-parent-categories">{item.name}</span>
                ));
              })}
            </div>
          )}
        </div>
        <Link href={blogDetailUrl} className="blog-cover">
          {imageLoading ? (
            <Loading />
          ) : (
            <Image
              src={`${image || '/img/blog/no-image.jpg'}`}
              alt={data?.title}
              width={400}
              height={400}
              quality={60}
            />
          )}
        </Link>
      </div>
      <div className="blog-card-body">
        {/* <ul>
          {data?.categories.map((category) => (
            <li key={category.id}>
              <a href="#">{category.name}</a>
            </li>
          ))}
        </ul> */}

        <Link href={blogDetailUrl}>
          <h3>{data?.title}</h3>
        </Link>

        {/* {data?.description && (
          <p>
            {data?.description}
          </p>
        )} */}

        <Link href={blogDetailUrl} className="read-more">
          {t('blog_page.blog_card.read_more_button_text')}
          <i className="bx bx-plus" />
        </Link>
      </div>
    </div>
  );
}

export default BlogCard;
