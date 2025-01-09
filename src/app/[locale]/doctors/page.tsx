import { getLocale, getTranslations } from 'next-intl/server';
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
  hospitals: string;
  department: string;
  search: string;
};

const fetchData = async (searchParams: DoctorsPageSearchParams) => {
  const { page, hospitals: hospitalIds, department, search } = searchParams;

  try {
    const locale = await getLocale();

    const [doctors, departments, hospitals] = await Promise.all([
      doctorsApi.getDoctors({
        query: {
          size: 8,
          page: Number(page) || 1,
          hospital_ids: hospitalIds,
          department_id: department,
          name: search,
          language: locale === 'tr' ? undefined : locale,
        },
      }),
      departmentsApi.getDepartments({
        query: { size: 100, language: locale === 'tr' ? undefined : locale },
      }),
      hospitalApi.getHospitals({
        query: { size: 100, language: locale === 'tr' ? undefined : locale },
      }),
    ]);

    return { doctors, departments, hospitals };
  } catch (error) {
    console.error('Error from /[locale]/[hospitalSlug]/doctors page: ', error);
    return {
      doctors: undefined,
      departments: undefined,
      hospitals: undefined,
    };
  }
};

export default async function DoctorsPage({
  searchParams: promiseSearchParams,
}: {
  searchParams: Promise<DoctorsPageSearchParams>;
}) {
  const searchParams = await promiseSearchParams;

  // --- SERVER DATA --- //
  const {
    doctors: doctorsData,
    departments: departmentsData,
    hospitals: hospitalsData,
  } = await fetchData(searchParams);

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
        title={t('common.our_doctors')}
        items={[{ label: t('site.name'), href: '/' }, { label: t('common.our_doctors') }]}
      />
      <main className="tw-min-h-screen tw-bg-gray-50 tw-py-12">
        <div className="container tw-mx-auto tw-px-4">
          <div className="tw-mb-8">
            <FilterOptions departments={departments} />
          </div>

          {doctors.length > 0 ? (
            <DoctorList doctors={doctors} departments={departments} hospitals={hospitals} />
          ) : (
            <span className="tw-text-gray-500">{t('common.data_not_found')}...</span>
          )}

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

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('meta.doctors');
  const tSite = await getTranslations('site');

  const hospitalName = tSite('name');

  return await generateMeta(
    {
      title: t('title', { hospital_name: hospitalName }),
      description: t('description', { hospital_name: hospitalName }),
      keywords: t('keywords', { hospital_name: hospitalName }),
      openGraph: {
        title: t('og_title', { hospital_name: hospitalName }),
        description: t('og_description', { hospital_name: hospitalName }),
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
    },
  );
}
