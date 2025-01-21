import { Metadata } from 'next';
import Link from 'next/link';
import { getLocale, getTranslations } from 'next-intl/server';

import Breadcrumb from '@/components/shared/breadcrumb';
import Footer from '@/components/shared/footer';
import Navbar from '@/components/shared/navbar';
import { departmentsApi } from '@/features/departments';
import generateMeta from '@/utils/generate-meta';
import slugify from '@/utils/slugify';


import FilterOptions from './components/filter-options';

type DoctorsPageSearchParams = {
  search: string;
  hospitals: string;
};

const fetchData = async (searchParams: DoctorsPageSearchParams) => {
  const { search, hospitals } = searchParams;

  try {
    const locale = await getLocale();

    const [departments] = await Promise.all([
      departmentsApi.getDepartments({
        query: {
          name: search,
          size: 100,
          hospital_ids: hospitals,
          language: locale === 'tr' ? undefined : locale,
        },
      }),
    ]);

    return { departments };
  } catch (error) {
    console.error('Error from src/app/[locale]/[hospitalSlug]/departments/page.tsx: ', error);
    return {
      departments: undefined,
    };
  }
};

export default async function DepartmentsPage({
  searchParams: promiseSearchParams,
}: {
  searchParams: Promise<DoctorsPageSearchParams>;
}) {
  const searchParams = await promiseSearchParams;

  // --- SERVER DATA --- //
  const { departments: departmentsData } = await fetchData(searchParams);

  // --- UTILS --- //
  const t = await getTranslations();

  // --- DATA --- //
  const departments = departmentsData?.items || [];

  // Group departments by letters
  const groupedDepartments = departments.reduce((acc: { [key: string]: any[] }, department) => {
    const firstLetter = department.name[0].toUpperCase();
    if (!acc[firstLetter]) {
      acc[firstLetter] = [];
    }
    acc[firstLetter].push(department);
    return acc;
  }, {});

  // Sort groups alphabetically
  const sortedGroups = Object.keys(groupedDepartments).sort();

  return (
    <>
      <Navbar />
      <Breadcrumb
        title={t('common.our_departments')}
        items={[{ label: t('site.name'), href: '/' }, { label: t('common.our_departments') }]}
      />
      <main className="tw-min-h-screen tw-bg-gray-50 tw-py-12">
        <div className="container tw-mx-auto tw-px-4">
          <div className="tw-mb-8">
            <FilterOptions />
          </div>

          {/* Department list */}
          <div className="tw-space-y-12">
            {sortedGroups.length > 0 ? (
              sortedGroups.map((letter) => (
                <div key={letter} className="tw-space-y-4">
                  <h2 className="tw-text-2xl tw-font-bold tw-text-primary">{letter}</h2>
                  <div className="tw-h-[1px] tw-w-full tw-bg-gray-200" />
                  <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-3 tw-gap-3">
                    {groupedDepartments[letter].map((department: any) => (
                      <Link
                        key={department.id}
                        href={`/departments/${department?.id}/${slugify(department?.name)}`}
                        className="tw-font-semibold tw-flex tw-items-center tw-gap-2 tw-text-gray-700 tw-text-base hover:tw-text-primary tw-transition-colors"
                      >
                        <div className="tw-h-1.5 tw-w-1.5 tw-rounded-full tw-bg-primary" />
                        {department.name}
                      </Link>
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <span className="tw-text-gray-500">{t('common.data_not_found')}...</span>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('meta.departments');
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
      path: '/departments',
    },
  );
}
