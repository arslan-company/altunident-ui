import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getLocale, getTranslations } from 'next-intl/server';
import React from 'react';

import Footer from '@/components/shared/footer';
import Navbar from '@/components/shared/navbar';
import References from '@/components/shared/references';
import Section from '@/components/shared/section';
import { blogApi, BlogSlider } from '@/features/blog';
import { departmentsApi } from '@/features/departments';
import { doctorsApi, DoctorSlider } from '@/features/doctors';
import { ContactForm } from '@/features/email-service';
import { filenameToUrl, Media } from '@/features/files';
import { GeneralSearch } from '@/features/general-search';
import { hospitalApi, HospitalsList } from '@/features/hospitals';
import { servicesApi, ServiceSection } from '@/features/services';
import { Slider, slidersApi } from '@/features/slider';
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

  const renderAboutUsTitle = (chunks: string) => <span className="tw-text-primary">{chunks}</span>;

  return (
    <>
      <Navbar />
      <main>
        {slidersData.length > 0 && <Slider sliders={slidersData} />}

        <Section
          container
          data-aos="fade-up"
          data-aos-delay="30"
          data-aos-duration="600"
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

        <Section container data-aos="fade-up" data-aos-delay="100" data-aos-duration="1200">
          <div className="tw-grid tw-grid-cols-1 lg:tw-grid-cols-2 tw-gap-8">
            <div className="tw-w-full">
              <Media
                src="/img/gallery/altunident.jpg"
                element="image"
                imageProps={{
                  alt: t('site.name'),
                }}
                className="tw-w-full tw-object-cover tw-rounded-lg"
              />
            </div>
            <div className="tw-w-full">
              <div className="tw-space-y-6">
                <div>
                  <div className="tw-flex tw-items-center tw-mb-5">
                    <span className="tw-w-16 tw-h-16 tw-rounded-full tw-bg-primary/10 tw-flex tw-items-center tw-justify-center tw-mr-4">
                      <i className="bi bi-info-circle tw-text-primary tw-text-xl" />
                    </span>
                    <h1 className="tw-text-primary tw-text-[20px] tw-font-medium">
                      {t('common.about_us')}
                    </h1>
                  </div>
                  <h2 className="tw-text-3xl tw-font-bold tw-mt-2">
                    {t.rich('common.about_us_title', {
                      name: (chunks) => renderAboutUsTitle(chunks as any),
                      hospital_name: t('site.name'),
                    })}
                  </h2>
                </div>
                <div>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: t.raw('common.about_us_description'),
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </Section>

        {servicesData.length > 0 && (
          <Section
            container
            data-aos="fade-up"
            data-aos-delay="100"
            data-aos-duration="1200"
          >
            <ServiceSection
              services={servicesData.map((service) => ({
                id: service.id,
                title: service.name,
                description: "Profesyonel ekibimizle, çürüklerden diş eti hastalıklarına kadar geniş bir yelpazede diş tedavileri sunuyoruz.",
                icon_url: "img/shape/dental-care.svg",
                slug: service.name.toLowerCase().replace(/\s+/g, '-'),
              }))}
            />
          </Section>
        )}

        {doctorsData.length > 0 && (
          <Section
            title={t('common.our_doctors')}
            description={t('homepage.doctor_list.description')}
            container
            data-aos="fade-up"
            data-aos-delay="100"
            data-aos-duration="1200"
            titleIcon={<i className="bi bi-people tw-text-primary tw-text-xl" />}
          >
            <DoctorSlider doctors={doctorsData} departments={departmentsData} />
          </Section>
        )}

        <Section
          data-aos="fade-up"
          data-aos-delay="100"
          data-aos-duration="1200"
          titleIcon={<i className="bi bi-envelope tw-text-primary tw-text-xl" />}
        >
          <ContactForm />
        </Section>

        <Section
          title={t('common.collaborating_institutions')}
          container
          data-aos="fade-up"
          data-aos-delay="100"
          data-aos-duration="1200"
          variant="darker"
        >
          <References />
        </Section>

        {blogsData.length > 0 && (
          <Section
            title={t('common.blog')}
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
