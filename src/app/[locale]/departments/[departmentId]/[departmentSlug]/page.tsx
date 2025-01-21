import { ChevronRight } from 'lucide-react';
import { Metadata } from 'next';
import Link from 'next/link';
import { getLocale, getTranslations } from 'next-intl/server';

import Breadcrumb from '@/components/shared/breadcrumb';
import Footer from '@/components/shared/footer';
import HTMLContent from '@/components/shared/html-content';
import Navbar from '@/components/shared/navbar';
import { departmentsApi } from '@/features/departments';
import { DoctorList, doctorsApi } from '@/features/doctors';
import { filenameToUrl } from '@/features/files';
import { hospitalApi, HospitalCard } from '@/features/hospitals';
import generateMeta from '@/utils/generate-meta';

type DepartmentDetailParams = {
  departmentId: string;
  departmentSlug: string;
};

const fetchData = async (params: DepartmentDetailParams) => {
  const { departmentId } = params;

  try {
    const locale = await getLocale();

    const [department, doctors, departmentHospitals, allOfDepartments, allOfHospitals] =
      await Promise.all([
        departmentsApi.getDepartment({
          params: {
            id: departmentId,
          },
          query: {
            language: locale === 'tr' ? undefined : locale,
          },
        }),
        doctorsApi.getDoctors({
          query: {
            department_id: departmentId,
            size: 8,
          },
        }),
        hospitalApi.getHospitals({
          query: {
            departmnet_id: departmentId,
            size: 50,
          },
        }),
        departmentsApi.getDepartments({
          query: {
            size: 100,
          },
        }),
        hospitalApi.getHospitals({
          query: {
            size: 50,
          },
        }),
      ]);

    return { department, doctors, departmentHospitals, allOfDepartments, allOfHospitals };
  } catch (error) {
    console.error(
      'Error from src/app/[locale]/departments/[departmentId]/[departmentSlug]/page.tsx page: ',
      error,
    );
    return {
      department: undefined,
      doctors: undefined,
      departmentHospitals: undefined,
      allOfDepartments: undefined,
      allOfHospitals: undefined,
    };
  }
};

export default async function DepartmentDetail({
  params: promiseParams,
}: {
  params: Promise<DepartmentDetailParams>;
}) {
  const params = await promiseParams;

  // --- SERVER DATA --- //
  const { department, doctors, departmentHospitals, allOfDepartments, allOfHospitals } =
    await fetchData(params);

  // --- UTILS --- //
  const t = await getTranslations();

  return (
    <>
      <Navbar />
      <Breadcrumb
        title={department?.name || ''}
        items={[
          { label: t('site.name'), href: '/' },
          { label: t('common.our_departments'), href: '/departments' },
          { label: department?.name || '' },
        ]}
      />
      <main className="container tw-min-h-screen tw-py-12 tw-mx-auto tw-px-4">
        <div>
          <h1 className="tw-mb-8">{department?.name}</h1>
          <HTMLContent content={department?.description || ''} />
        </div>
        <div className="tw-mt-16">
          <h2 className="tw-mb-8 tw-text-primary">Bu Bölüme Ait Hastaneler</h2>
          <div className="tw-grid tw-grid-cols-1 tw-gap-4 md:tw-grid-cols-3 lg:tw-grid-cols-4">
            {departmentHospitals?.items.map((hospital) => (
              <HospitalCard
                key={hospital?.id}
                hideFooter
                name={hospital?.name}
                slug={hospital?.slug}
                imageSrc={
                  filenameToUrl(hospital?.image_url) ||
                  '/img/hospitals/representative-hospital-image.jpg'
                }
              />
            ))}
          </div>
        </div>
        <div className="tw-mt-16">
          <div className="tw-flex tw-items-center tw-gap-5 tw-mb-8">
            <h2 className="tw-text-primary">{t('department_detail_page.doctor_list_title')}</h2>
            <Link
              className="tw-inline-block tw-text-primary tw-font-semibold"
              href={`/doctors?department=${department?.id}`}
            >
              Tümünü Gör
              <ChevronRight className="tw-w-4 tw-h-4 tw-ml-1" />
            </Link>
          </div>
          <DoctorList
            doctors={doctors?.items || []}
            departments={allOfDepartments?.items || []}
            hospitals={allOfHospitals?.items || []}
          />
        </div>
      </main>
      <Footer />
    </>
  );
}

export async function generateMetadata({
  params: paramsPromise,
}: {
  params: Promise<DepartmentDetailParams>;
}): Promise<Metadata> {
  const params = await paramsPromise;
  const { departmentId, departmentSlug } = params;

  const locale = await getLocale();
  const t = await getTranslations('meta.department_detail');
  const tSite = await getTranslations('site');

  const department = await departmentsApi.getDepartment({
    params: {
      id: departmentId,
    },
    query: {
      language: locale === 'tr' ? undefined : locale,
    },
  });

  const hospitalName = tSite('name');
  const departmentName = department?.name;
  const departmentImage = filenameToUrl(department?.image_url) || '/img/og-images/og-image.png';

  return await generateMeta(
    {
      title: t('title', { hospital_name: hospitalName, department_name: departmentName }),
      description: t('description', {
        hospital_name: hospitalName,
        department_name: departmentName,
      }),
      keywords: t('keywords', { hospital_name: hospitalName, department_name: departmentName }),
      openGraph: {
        title: t('og_title', { hospital_name: hospitalName, department_name: departmentName }),
        description: t('og_description', {
          hospital_name: hospitalName,
          department_name: departmentName,
        }),
        images: [
          {
            url: departmentImage,
            width: 1200,
            height: 630,
            alt: t('og_image_alt', {
              hospital_name: hospitalName,
              department_name: departmentName,
            }),
          },
        ],
      },
      twitter: {
        title: t('twitter_title', { hospital_name: hospitalName, department_name: departmentName }),
        description: t('twitter_description', {
          hospital_name: hospitalName,
          department_name: departmentName,
        }),
        images: [departmentImage],
      },
    },
    {
      path: `/departments/${departmentId}/${departmentSlug}`,
    },
  );
}
