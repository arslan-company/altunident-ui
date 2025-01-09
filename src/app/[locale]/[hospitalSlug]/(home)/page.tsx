import React from 'react';
import { Metadata } from 'next';
import { getLocale, getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';

import Navbar from '@/components/shared/navbar';
import Footer from '@/components/shared/footer';
import Section from '@/components/shared/section';

import { servicesApi, ServicesCardList } from '@/features/services';
import { doctorsApi, DoctorSlider } from '@/features/doctors';
import { departmentsApi } from '@/features/departments';
import { Slider, slidersApi } from '@/features/slider';
import { GeneralSearch } from '@/features/general-search';
import { hospitalApi } from '@/features/hospitals';

import generateMeta from '@/utils/generate-meta';

import { filenameToUrl } from '@/features/files';

interface HospitalHomePageParams {
  hospitalSlug: string;
}

const fetchData = async (params: HospitalHomePageParams) => {
  const { hospitalSlug } = params;

  try {
    const locale = await getLocale();

    const hospitals = await hospitalApi.getHospitals({
      query: {
        slug: hospitalSlug,
        language: locale === 'tr' ? undefined : locale,
      },
    });

    if (!hospitals || !Array.isArray(hospitals?.items) || hospitals?.items.length === 0) {
      return null;
    }

    const currentHospital = hospitals?.items[0];

    const [services, doctors, allOfDepartments, sliders] = await Promise.all([
      servicesApi.getServices({
        query: { size: 6, language: locale === 'tr' ? undefined : locale },
      }),
      doctorsApi.getDoctors({
        query: {
          size: 6,
          language: locale === 'tr' ? undefined : locale,
          hospital_ids: currentHospital?.id,
        },
      }),
      departmentsApi.getDepartments({
        query: { size: 50, language: locale === 'tr' ? undefined : locale },
      }),
      slidersApi.getSliders({
        query: {
          language: locale === 'tr' ? undefined : locale,
          size: 20,
          hospital_id: currentHospital?.id,
        },
      }),
    ]);

    return { services, doctors, allOfDepartments, sliders };
  } catch (error) {
    console.error('Error from src/app/[locale]/[hospitalSlug]/(home)/page.tsx: ', error);
    return null;
  }
};

export default async function HospitalHomePage({
  params: paramsPromise,
}: {
  params: Promise<HospitalHomePageParams>;
}) {
  const params = await paramsPromise;

  // --- SERVER DATA --- //
  const data = await fetchData(params);

  if (!data) notFound();

  const { services, doctors, allOfDepartments, sliders } = data;

  const t = await getTranslations();

  return (
    <>
      <Navbar />
      <main>
        <Slider sliders={sliders?.items || []} />

        <Section
          container
          data-aos="fade-up"
          data-aos-delay="100"
          data-aos-duration="1200"
          className="tw-z-10"
        >
          <div className="tw-shadow-xl">
            <GeneralSearch />
          </div>
        </Section>

        <Section
          title={t('homepage.services.title')}
          description={t('homepage.services.description')}
          container
          data-aos="fade-up"
          data-aos-delay="100"
          data-aos-duration="1200"
          className="tw-z-0"
        >
          <ServicesCardList services={services?.items || []} />
        </Section>

        <Section
          title={t('homepage.doctor_list.title')}
          description={t('homepage.doctor_list.description')}
          container
          data-aos="fade-up"
          data-aos-delay="100"
          data-aos-duration="1200"
        >
          <DoctorSlider
            doctors={doctors?.items || []}
            departments={allOfDepartments?.items || []}
          />
        </Section>
      </main>
      <Footer />
    </>
  );
}

export async function generateMetadata({
  params: paramsPromise,
}: {
  params: Promise<HospitalHomePageParams>;
}): Promise<Metadata> {
  const params = await paramsPromise;
  const { hospitalSlug } = params;

  const locale = await getLocale();
  const t = await getTranslations('meta.common');

  const hospital = await hospitalApi.getHospitals({
    query: {
      size: 1,
      slug: hospitalSlug,
      language: locale === 'tr' ? undefined : locale,
    },
  });

  const currentHospital = hospital?.items[0];
  const hospitalName = currentHospital?.name;
  const hospitalImage = filenameToUrl(currentHospital?.image_url) || '/img/og-images/og-image.png';

  return await generateMeta(
    {
      title: t('title', { hospital_name: hospitalName }),
      description: t('description', { hospital_name: hospitalName }),
      keywords: t('keywords', { hospital_name: hospitalName }),
      openGraph: {
        title: t('og_title', { hospital_name: hospitalName }),
        description: t('og_description', { hospital_name: hospitalName }),
        siteName: hospitalName,
        images: [
          {
            url: hospitalImage,
            width: 1200,
            height: 630,
            alt: t('og_image_alt', { hospital_name: hospitalName }),
          },
        ],
      },
      twitter: {
        title: t('twitter_title', { hospital_name: hospitalName }),
        description: t('twitter_description', { hospital_name: hospitalName }),
        images: [hospitalImage],
      },
    },
    {
      path: '/',
      hospitalSlug,
    },
  );
}
