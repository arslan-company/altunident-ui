'use client';

import React from 'react';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper';
import { useTranslations } from 'next-intl';

import { BlogCard, blogEndpoints } from '@/features/blog';
import { filenameToUrl } from '@/features/files';

import { Button } from '@/components/base/button';

interface BlogSliderProps {
  readonly blogs: typeof blogEndpoints.getBlogs.response.items;
}

export function BlogSlider({ blogs }: BlogSliderProps) {
  const t = useTranslations();

  return (
    <div className="tw-text-center tw-space-y-10">
      <div>
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
        >
          {blogs?.map((blog) => (
            <SwiperSlide key={blog?.id}>
              <div className="tw-py-3">
                <BlogCard
                  href={`/blog/${blog?.id}/${blog?.slug}`}
                  data={{
                    createdAt: blog?.date,
                    id: blog?.id,
                    title: blog?.title,
                    imageSrc: filenameToUrl(blog?.cover_image_url),
                    slug: blog?.slug,
                  }}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <Link href="/blog">
        <Button>{t('homepage.carousel.all_blogs_button_text')}</Button>
      </Link>
    </div>
  );
}
