import Link from 'next/link';
import { Metadata } from 'next';
import { getLocale, getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { ChevronRight } from 'lucide-react';

import { DoctorList, doctorsApi } from '@/features/doctors';
import { departmentsApi } from '@/features/departments';
import { hospitalApi, HospitalCard } from '@/features/hospitals';
import { filenameToUrl } from '@/features/files';

import Footer from '@/components/shared/footer';
import Navbar from '@/components/shared/navbar';
import Breadcrumb from '@/components/shared/breadcrumb';
import HTMLContent from '@/components/shared/html-content';

import generateMeta from '@/utils/generate-meta';

type DepartmentDetailParams = {
  departmentId: string;
  departmentSlug: string;
  hospitalSlug: string;
};

const fetchData = async (params: DepartmentDetailParams) => {
  const { departmentId, hospitalSlug } = params;

  try {
    const locale = await getLocale();

    const hospital = await hospitalApi.getHospitals({
      query: {
        slug: hospitalSlug,
        size: 1,
      },
    });

    if (!hospital || !hospital?.items || hospital?.items.length === 0) {
      return null;
    }

    const currentHospital = hospital?.items[0];

    if (!currentHospital) {
      return null;
    }

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

    return {
      department,
      doctors,
      departmentHospitals,
      allOfDepartments,
      allOfHospitals,
      currentHospital,
    };
  } catch (error) {
    console.error(
      'Error from src/app/[locale]/[hospitalSlug]/departments/[departmentId]/[departmentSlug]/page.tsx page: ',
      error,
    );
    return null;
  }
};

export default async function DepartmentDetail({
  params: promiseParams,
}: {
  params: Promise<DepartmentDetailParams>;
}) {
  const params = await promiseParams;

  const { hospitalSlug } = params;

  // --- SERVER DATA --- //
  const data = await fetchData(params);

  if (!data) {
    return notFound();
  }

  const {
    department,
    doctors,
    departmentHospitals,
    allOfDepartments,
    allOfHospitals,
    currentHospital,
  } = data;

  // --- UTILS --- //
  const t = await getTranslations();

  return (
    <>
      <Navbar />
      <Breadcrumb
        title={department?.name || ''}
        items={[
          { label: currentHospital?.name, href: `/${hospitalSlug}` },
          { label: t('departments_page.title'), href: `/${hospitalSlug}/departments` },
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
                hideFooter
                name={hospital?.name}
                slug={hospital?.slug}
                imageSrc={
                  filenameToUrl(hospital?.image_url) ||
                  '/img/hospitals/representative-hospital-image.jpg'
                }
                key={hospital?.id}
              />
            ))}
          </div>
        </div>
        <div className="tw-mt-16">
          <div className="tw-flex tw-items-center tw-gap-5 tw-mb-8">
            <h2 className="tw-text-primary">{t('department_detail_page.doctor_list_title')}</h2>
            <Link
              className="tw-inline-block tw-text-primary tw-font-semibold"
              href={`/${hospitalSlug}/doctors?department=${department?.id}`}
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
  const { hospitalSlug, departmentId, departmentSlug } = params;

  const locale = await getLocale();
  const t = await getTranslations('meta.department_detail');

  const hospital = await hospitalApi.getHospitals({
    query: {
      size: 1,
      slug: hospitalSlug,
      language: locale === 'tr' ? undefined : locale,
    },
  });

  const department = await departmentsApi.getDepartment({
    params: {
      id: departmentId,
    },
    query: {
      language: locale === 'tr' ? undefined : locale,
    },
  });

  const currentHospital = hospital?.items[0];
  const hospitalName = currentHospital?.name;
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
        siteName: hospitalName,
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
      hospitalSlug,
    },
  );
}
