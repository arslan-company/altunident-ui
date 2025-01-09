import { getLocale, getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

import { filenameToUrl, Media } from '@/features/files';
import { doctorsApi } from '@/features/doctors';
import { departmentsApi } from '@/features/departments';
import { hospitalApi } from '@/features/hospitals';

import translatedDaysOfWeek from '@/constants/days-of-week';

import Footer from '@/components/shared/footer';
import Navbar from '@/components/shared/navbar';
import Breadcrumb from '@/components/shared/breadcrumb';
import HTMLContent from '@/components/shared/html-content';

import generateMeta from '@/utils/generate-meta';

import AppointmentArea from './components/appointment-area';

type DoctorDetailParams = {
  doctorId: string;
  doctorSlug: string;
  hospitalSlug: string;
};

const fetchData = async (params: DoctorDetailParams) => {
  const { doctorId, hospitalSlug } = params;

  try {
    const locale = await getLocale();

    const hospitals = await hospitalApi.getHospitals({
      query: {
        language: locale === 'tr' ? undefined : locale,
      },
    });

    const currentHospital = hospitals?.items?.find((hospital) => hospital.slug === hospitalSlug);

    if (!currentHospital) {
      return null;
    }

    const doctor = await doctorsApi.getDoctor({
      params: {
        id: doctorId,
      },
      query: {
        language: locale === 'tr' ? undefined : locale,
      },
    });

    const [doctorWorkingHours, department] = await Promise.all([
      doctorsApi.getDoctorWorkingHours({
        params: {
          id: doctorId,
        },
        query: {
          language: locale === 'tr' ? undefined : locale,
        },
      }),
      departmentsApi.getDepartment({
        params: {
          id: doctor?.department_id,
        },
        query: {
          language: locale === 'tr' ? undefined : locale,
        },
      }),
    ]);

    return { doctor, department, doctorWorkingHours, hospitals, currentHospital };
  } catch (error) {
    console.error(
      'Error from src/app/[locale]/[hospitalSlug]/doctors/[doctorId]/[doctorSlug] page: ',
      error,
    );
    return null;
  }
};

export default async function DoctorDetail({
  params: promiseParams,
}: {
  params: Promise<DoctorDetailParams>;
}) {
  const params = await promiseParams;

  const { hospitalSlug } = params;

  // --- SERVER DATA --- //
  const data = await fetchData(params);

  if (!data) {
    return notFound();
  }

  const {
    doctor,
    department,
    doctorWorkingHours: doctorWorkingHoursData,
    hospitals,
    currentHospital,
  } = data;

  // --- UTILS --- //
  const t = await getTranslations();
  const locale = await getLocale();

  // --- DATA --- //
  const doctorHospitals = hospitals?.items?.filter((hospital) =>
    doctor?.doctor_hospitals?.some(
      (doctorHospital) => doctorHospital?.hospital_id === hospital?.id,
    ),
  );
  const doctorWorkingHoursItems = doctorWorkingHoursData?.items || [];
  const doctorWorkingHours = doctorWorkingHoursItems.map((item) => ({
    ...item,
    day: (translatedDaysOfWeek as any)[locale][item.day_of_week],
  }));

  return (
    <>
      <Navbar />
      <Breadcrumb
        title={doctor?.name || ''}
        items={[
          { label: currentHospital?.name, href: `/${hospitalSlug}` },
          { label: t('common.doctors'), href: `/${hospitalSlug}/doctors` },
          { label: doctor?.name || '' },
        ]}
      />
      <main className="tw-min-h-screen tw-bg-gray-50 tw-py-12">
        <div className="container tw-mx-auto tw-px-4">
          <div className="tw-grid tw-grid-cols-1 tw-gap-8 lg:tw-grid-cols-3">
            {/* Left Sidebar */}
            <div className="tw-space-y-6">
              {/* Doctor Image */}
              <div className="tw-relative tw-rounded-2xl tw-bg-white tw-p-6 tw-shadow-md">
                <div className="tw-relative tw-w-full tw-overflow-hidden tw-rounded-xl">
                  <Media
                    src={filenameToUrl(doctor?.image_url) || '/img/doctors/doctor-background.jpg'}
                    imageProps={{ alt: doctor?.name, quality: 60 }}
                    className="tw-object-cover tw-w-full tw-h-full tw-z-10 tw-relative"
                  />
                  <Media
                    src="/img/doctors/doctor-background.jpg"
                    imageProps={{ alt: 'doctor-card-overlay', quality: 60 }}
                    className="tw-absolute tw-top-0 tw-left-0 tw-w-full tw-h-full tw-object-cover tw-z-0"
                  />
                </div>

                {/* Working Hours */}
                <div className="tw-mt-6 tw-space-y-4">
                  <div className="tw-flex tw-items-center tw-gap-2">
                    <i className="bx bx-time tw-text-primary-600" />
                    <h3 className="tw-text-lg tw-font-semibold">
                      {t('doctor_detail_page.available_times_area.title')}
                    </h3>
                  </div>

                  <div className="tw-space-y-2">
                    {doctorWorkingHours.map((item) => (
                      <div key={item?.id} className="tw-flex tw-justify-between tw-text-sm">
                        <span className="tw-font-medium">{item?.day}</span>
                        {item?.active ? (
                          <span className="tw-text-green-600">
                            {item?.start_of_day} - {item?.end_of_day}
                          </span>
                        ) : (
                          <span className="tw-text-red-500">
                            {t('doctor_detail_page.available_times_area.not_available_text')}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="tw-mt-4">
                    <AppointmentArea
                      doctorHospitalsIds={doctorHospitals.map((hospital) => hospital?.id)}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Right Content */}
            <div className="lg:tw-col-span-2">
              <div className="tw-rounded-2xl tw-bg-white tw-p-8 tw-shadow-md">
                <h1 className="tw-text-3xl tw-font-bold tw-text-gray-900">{doctor?.name}</h1>
                <span className="tw-text-lg tw-text-primary-600">{department?.name}</span>

                <div className="tw-mt-8 tw-space-y-6">
                  {doctor?.languages && (
                    <div className="tw-border-b tw-border-gray-200 tw-pb-4">
                      <h3 className="tw-mb-3 tw-text-lg tw-font-semibold">
                        {t('doctor_detail_page.about_doctor_area.languages_text')}
                      </h3>
                      <p className="tw-flex tw-items-center tw-gap-2">
                        <i className="bx bxs-hand-right tw-text-primary-600" />
                        {doctor.languages}
                      </p>
                    </div>
                  )}

                  {doctor?.education && (
                    <div className="tw-border-b tw-border-gray-200 tw-pb-4">
                      <h3 className="tw-mb-3 tw-text-lg tw-font-semibold">
                        {t('doctor_detail_page.about_doctor_area.education_text')}
                      </h3>
                      <p className="tw-flex tw-items-center tw-gap-2">
                        <i className="bx bxs-hand-right tw-text-primary-600" />
                        {doctor.education}
                      </p>
                    </div>
                  )}

                  {doctor?.specialization_training && (
                    <div className="tw-border-b tw-border-gray-200 tw-pb-4">
                      <h3 className="tw-mb-3 tw-text-lg tw-font-semibold">
                        {t('doctor_detail_page.about_doctor_area.specialization_training_text')}
                      </h3>
                      <p className="tw-flex tw-items-center tw-gap-2">
                        <i className="bx bxs-hand-right tw-text-primary-600" />
                        {doctor.specialization_training}
                      </p>
                    </div>
                  )}

                  <div className="tw-border-b tw-border-gray-200 tw-pb-4">
                    <h3 className="tw-mb-3 tw-text-lg tw-font-semibold">
                      {t('doctor_detail_page.about_doctor_area.hospital_text')}
                    </h3>
                    <p className="tw-flex tw-items-center tw-gap-2">
                      <i className="bx bxs-hand-right tw-text-primary-600" />
                      {doctorHospitals.map((hospital) => hospital?.name).join(', ')}
                    </p>
                  </div>

                  {doctor?.description && (
                    <div className="tw-pt-4">
                      <h2 className="tw-mb-4 tw-text-2xl tw-font-bold">
                        {t('doctor_detail_page.publications_area.title')}
                      </h2>
                      <div className="tw-prose tw-max-w-none">
                        <HTMLContent content={doctor.description} />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export async function generateMetadata({
  params: paramsPromise,
}: {
  params: Promise<DoctorDetailParams>;
}): Promise<Metadata> {
  const params = await paramsPromise;
  const { hospitalSlug, doctorId, doctorSlug } = params;

  const locale = await getLocale();
  const t = await getTranslations('meta.doctor_detail');

  const doctor = await doctorsApi.getDoctor({
    params: {
      id: doctorId,
    },
    query: {
      language: locale === 'tr' ? undefined : locale,
    },
  });

  const hospital = await hospitalApi.getHospitals({
    query: {
      size: 1,
      slug: hospitalSlug,
      language: locale === 'tr' ? undefined : locale,
    },
  });

  const department = await departmentsApi.getDepartment({
    params: {
      id: doctor?.department_id,
    },
    query: {
      language: locale === 'tr' ? undefined : locale,
    },
  });

  const currentHospital = hospital?.items[0];
  const doctorName = doctor?.name;
  const hospitalName = currentHospital?.name;
  const departmentName = department?.name;
  const doctorImage = filenameToUrl(doctor?.image_url) || '/img/og-images/og-image.png';

  return await generateMeta(
    {
      title: t('title', { hospital_name: hospitalName, doctor_name: doctorName }),
      description: t('description', {
        hospital_name: hospitalName,
        doctor_name: doctorName,
        doctor_department_name: departmentName,
      }),
      keywords: t('keywords', {
        hospital_name: hospitalName,
        doctor_name: doctorName,
        doctor_department_name: departmentName,
      }),
      openGraph: {
        title: t('og_title', { hospital_name: hospitalName, doctor_name: doctorName }),
        description: t('og_description', {
          hospital_name: hospitalName,
          doctor_name: doctorName,
          doctor_department_name: departmentName,
        }),
        siteName: hospitalName,
        images: [
          {
            url: doctorImage,
            width: 1200,
            height: 630,
            alt: t('og_image_alt', {
              hospital_name: hospitalName,
              doctor_name: doctorName,
            }),
          },
        ],
      },
      twitter: {
        title: t('twitter_title', { hospital_name: hospitalName, doctor_name: doctorName }),
        description: t('twitter_description', {
          hospital_name: hospitalName,
          doctor_name: doctorName,
          doctor_department_name: departmentName,
        }),
        images: [doctorImage],
      },
    },
    {
      path: `/doctors/${doctorId}/${doctorSlug}`,
      hospitalSlug,
    },
  );
}
