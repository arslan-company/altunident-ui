import React from 'react';
import { getLocale, getTranslations } from 'next-intl/server';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import Navbar from '@/components/shared/navbar';
import Footer from '@/components/shared/footer';
import Section from '@/components/shared/section';
import BrandStatistics from '@/components/shared/statistics/brand-statistics';

import { servicesApi, ServicesCardList } from '@/features/services';
import { doctorsApi, DoctorSlider } from '@/features/doctors';
import { departmentsApi } from '@/features/departments';
import { blogApi, BlogSlider } from '@/features/blog';
import { Slider, slidersApi } from '@/features/slider';
import { GeneralSearch } from '@/features/general-search';
import { hospitalApi, HospitalsList } from '@/features/hospitals';
import { ContactForm } from '@/features/email-service';

import generateMeta from '@/utils/generate-meta';

const fetchData = async () => {
  try {
    const locale = await getLocale();

    const [services, doctors, departments, blogs, sliders, hospitals] = await Promise.all([
      servicesApi.getServices({
        query: { size: 6, language: locale === 'tr' ? undefined : locale },
      }),
      doctorsApi.getDoctors({
        query: {
          size: 6,
          language: locale === 'tr' ? undefined : locale,
        },
      }),
      departmentsApi.getDepartments({
        query: { size: 50, language: locale === 'tr' ? undefined : locale },
      }),
      blogApi.getBlogs({ query: { size: 5, language: locale === 'tr' ? undefined : locale } }),
      slidersApi.getSliders({
        query: {
          language: locale === 'tr' ? undefined : locale,
          size: 20,
        },
      }),
      hospitalApi.getHospitals({
        query: {
          language: locale === 'tr' ? undefined : locale,
          size: 20,
        },
      }),
    ]);

    return { services, doctors, departments, blogs, sliders, hospitals };
  } catch (error) {
    console.error('Error from src/app/[locale]/(home)/page.tsx: ', error);
    return null;
  }
};

export default async function HomePage() {
  // --- SERVER DATA --- //
  const data = await fetchData();

  if (!data) {
    return notFound();
  }

  const { services, doctors, departments, blogs, sliders, hospitals } = data;

  const t = await getTranslations();

  const hospitalsData = hospitals?.items || [];
  const servicesData = services?.items || [];
  const doctorsData = doctors?.items || [];
  const departmentsData = departments?.items || [];
  const blogsData = blogs?.items || [];
  const slidersData = sliders?.items || [];

  return (
    <>
      <Navbar />
      <main>
        {slidersData.length > 0 && <Slider sliders={slidersData} />}

        <Section
          container
          data-aos="fade-up"
          data-aos-delay="100"
          data-aos-duration="1200"
          className="tw-z-20"
        >
          <div className="tw-shadow-xl">
            <GeneralSearch />
          </div>
        </Section>

        {hospitalsData.length > 0 && (
          <Section container data-aos="fade-up" data-aos-delay="100" data-aos-duration="1200">
            <HospitalsList hospitals={hospitalsData} />
          </Section>
        )}

        {servicesData.length > 0 && (
          <Section
            title={t('homepage.services.title')}
            description={t('homepage.services.description')}
            container
            data-aos="fade-up"
            data-aos-delay="100"
            data-aos-duration="1200"
          >
            <ServicesCardList services={servicesData} />
          </Section>
        )}

        {doctorsData.length > 0 && (
          <Section
            title={t('homepage.doctor_list.title')}
            description={t('homepage.doctor_list.description')}
            container
            data-aos="fade-up"
            data-aos-delay="100"
            data-aos-duration="1200"
          >
            <DoctorSlider doctors={doctorsData} departments={departmentsData} />
          </Section>
        )}

        <Section data-aos="fade-up" data-aos-delay="100" data-aos-duration="1200">
          <BrandStatistics doctors={doctors} />
        </Section>

        <Section data-aos="fade-up" data-aos-delay="100" data-aos-duration="1200">
          <ContactForm />
        </Section>

        {blogsData.length > 0 && (
          <Section
            title={t('homepage.carousel.title')}
            description={t('homepage.carousel.description')}
            container
            data-aos="fade-up"
            data-aos-delay="100"
            data-aos-duration="1200"
          >
            <BlogSlider blogs={blogsData} />
          </Section>
        )}
      </main>
      <Footer />
    </>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  return await generateMeta(null, { path: '/' });
}
