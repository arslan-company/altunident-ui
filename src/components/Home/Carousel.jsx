import React, { useEffect, useState, useContext } from 'react';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper';
import BlogCard from '../Common/BlogCard';
import { getBlogs } from '../../api/blog';
import { GlobalContext } from '../../context';

function Carousel() {
  // const [activeButtonId, setActiveButtonId] = useState(0);
  const [blogs, setBlogs] = useState([]);
  const { hospitalSlugUrl } = useContext(GlobalContext);

  const { t } = useTranslation('common');

  // const handleFilter = (id) => {
  //   setActiveButtonId(id);
  //   if (id === 0) {
  //     setFilteredBlogs(blogs);
  //   } else {
  //     const filteredData = blogs.filter((blog) => (
  //       blog.parentCategories.some((categoryId) => categoryId === id)
  //     ));
  //     setFilteredBlogs(filteredData);
  //   }
  // };

  useEffect(() => {
    const fetchBlogsData = async () => {
      const data = await getBlogs(
        undefined, // title
        5, // size
        undefined, // page
      );

      setBlogs(data?.items);
    };

    fetchBlogsData();
  }, []);

  return (
    <div className="carousel-area pt-100 pb-70">
      <div className="container">
        <div className="section-title">
          <span className="top-title">{t('homepage.carousel.top_title')}</span>
          <h2>{t('homepage.carousel.title')}</h2>
          <p>
            {t('homepage.carousel.description')}
          </p>
        </div>
        <div className="row">
          {/* <div className="filter-area">
            {buttons.map((button) => (
              <div key={button.id} className="filter-area-item">
                <Button
                  primary={activeButtonId === button.id}
                  white={activeButtonId !== button.id}
                  onClick={() => handleFilter(button.id)}
                >
                  {button.title}
                </Button>
              </div>
            ))}
          </div> */}
          <div className="row col-12 justify-content-center">
            <Swiper
              spaceBetween={30}
              navigation
              autoplay={{
                delay: 6500,
                disableOnInteraction: true,
                pauseOnMouseEnter: true,
              }}
              breakpoints={{
                0: {
                  slidesPerView: 1,
                },
                576: {
                  slidesPerView: 2,
                },
                992: {
                  slidesPerView: 3,
                },
              }}
              modules={[Navigation, Autoplay]}
              className="doctor-list-slide"
            >
              {blogs?.map((blog) => (
                <SwiperSlide key={blog.id}>
                  <BlogCard data={blog} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          <div className="col-12 d-flex justify-content-center">
            <Link href={`${hospitalSlugUrl}/blog/?page=1&size=6`} className="default-btn">
              {t('homepage.carousel.all_blogs_button_text')}
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Carousel;
