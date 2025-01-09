import { getLocale, getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

import { DoctorList, doctorsApi } from '@/features/doctors';
import { departmentsApi } from '@/features/departments';
import { hospitalApi } from '@/features/hospitals';

import Footer from '@/components/shared/footer';
import Navbar from '@/components/shared/navbar';
import Breadcrumb from '@/components/shared/breadcrumb';

import generateMeta from '@/utils/generate-meta';

import FilterOptions from './components/filter-options';
import PaginationArea from './components/pagination-area';

type DoctorsPageSearchParams = {
  page: string;
  department: string;
  search: string;
};

type HospitalDoctorsPageParams = {
  hospitalSlug: string;
};

const fetchData = async (
  searchParams: DoctorsPageSearchParams,
  params: HospitalDoctorsPageParams,
) => {
  const { page, department, search } = searchParams;
  const { hospitalSlug } = params;

  try {
    const locale = await getLocale();

    const hospitals = await hospitalApi.getHospitals({
      query: {
        language: locale === 'tr' ? undefined : locale,
      },
    });

    if (!hospitals || !hospitals?.items || hospitals?.items.length === 0) {
      return null;
    }

    const currentHospital = hospitals?.items.find((hospital) => hospital.slug === hospitalSlug);

    if (!currentHospital) {
      return null;
    }

    const [doctors, departments] = await Promise.all([
      doctorsApi.getDoctors({
        query: {
          size: 8,
          page: Number(page) || 1,
          hospital_ids: currentHospital?.id,
          department_id: department,
          name: search,
          language: locale === 'tr' ? undefined : locale,
        },
      }),
      departmentsApi.getDepartments({
        query: {
          size: 100,
          language: locale === 'tr' ? undefined : locale,
          hospital_ids: currentHospital.id,
        },
      }),
    ]);

    return { doctors, departments, hospitals, currentHospital };
  } catch (error) {
    console.error('Error from src/app/[locale]/[hospitalSlug]/doctors page: ', error);
    return null;
  }
};

export default async function DoctorsPage({
  searchParams: promiseSearchParams,
  params: paramsPromise,
}: {
  searchParams: Promise<DoctorsPageSearchParams>;
  params: Promise<HospitalDoctorsPageParams>;
}) {
  const searchParams = await promiseSearchParams;
  const params = await paramsPromise;

  const { hospitalSlug } = params;

  // --- SERVER DATA --- //
  const data = await fetchData(searchParams, params);

  if (!data) {
    return notFound();
  }

  const {
    doctors: doctorsData,
    departments: departmentsData,
    hospitals: hospitalsData,
    currentHospital,
  } = data;

  // --- UTILS --- //
  const t = await getTranslations();

  // --- DATA --- //
  const doctors = doctorsData?.items || [];
  const departments = departmentsData?.items || [];
  const hospitals = hospitalsData?.items || [];

  return (
    <>
      <Navbar />
      <Breadcrumb
        title={t('common.doctors')}
        items={[
          { label: currentHospital?.name, href: `/${hospitalSlug}` },
          { label: t('common.doctors') },
        ]}
      />
      <main className="tw-min-h-screen tw-bg-gray-50 tw-py-12">
        <div className="container tw-mx-auto tw-px-4">
          <div className="tw-mb-8">
            <FilterOptions departments={departments} />
          </div>

          <DoctorList doctors={doctors} departments={departments} hospitals={hospitals} />

          {doctorsData?.pages && doctorsData?.pages > 1 ? (
            <div className="tw-mt-16">
              <PaginationArea totalPages={doctorsData?.pages || 1} />
            </div>
          ) : null}
        </div>
      </main>
      <Footer />
    </>
  );
}

export async function generateMetadata({
  params: paramsPromise,
}: {
  params: Promise<HospitalDoctorsPageParams>;
}): Promise<Metadata> {
  const params = await paramsPromise;
  const { hospitalSlug } = params;

  const locale = await getLocale();
  const t = await getTranslations('meta.doctors');

  const hospital = await hospitalApi.getHospitals({
    query: {
      size: 1,
      slug: hospitalSlug,
      language: locale === 'tr' ? undefined : locale,
    },
  });

  const currentHospital = hospital?.items[0];
  const hospitalName = currentHospital?.name;

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
            url: '/img/og-images/og-image.png',
            width: 1200,
            height: 630,
            alt: t('og_image_alt', { hospital_name: hospitalName }),
          },
        ],
      },
      twitter: {
        title: t('twitter_title', { hospital_name: hospitalName }),
        description: t('twitter_description', { hospital_name: hospitalName }),
        images: ['/img/og-images/og-image.png'],
      },
    },
    {
      path: '/doctors',
      hospitalSlug,
    },
  );
}
