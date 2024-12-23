import React from 'react';
import { useTranslation } from 'next-i18next';
import BlogCard from '../Common/BlogCard';

function News() {
  const { t } = useTranslation('common');
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  const news = [
    {
      id: 1,
      title: t('homepage.news.news_items.news_item_1_title'),
      slug: 'test-slug',
      description: t('homepage.news.news_items.news_item_1_description'),
      cover: '/img/news/1.jpg',
      date: `${day}/${month}/${year}`,
      categories: [
        {
          id: 1,
          name: 'COVID-19',
        },
      ],
    },
    {
      id: 2,
      title: t('homepage.news.news_items.news_item_2_title'),
      slug: 'test-slug',
      description: t('homepage.news.news_items.news_item_2_description'),
      cover: '/img/news/2.jpg',
      date: `${day}/${month}/${year}`,
      categories: [
        {
          id: 1,
          name: 'COVID-19',
        },
      ],
    },
    {
      id: 3,
      title: t('homepage.news.news_items.news_item_3_title'),
      slug: 'test-slug',
      description: t('homepage.news.news_items.news_item_3_description'),
      cover: '/img/news/3.jpg',
      date: `${day}/${month}/${year}`,
      categories: [
        {
          id: 1,
          name: 'COVID-19',
        },
      ],
    },
  ];

  return (
    <div className="news-area pt-100 pb-70">
      <div className="container">
        <div className="section-title">
          <span className="top-title">{t('homepage.news.top_title')}</span>
          <h2>{t('homepage.news.title')}</h2>
          <p>
            {t('homepage.news.description')}
          </p>
        </div>

        <div className="row justify-content-center">
          {news.map((newsItem) => (
            <div key={newsItem.id} className="col-lg-4 col-md-6 col-12">
              <BlogCard data={newsItem} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default News;
