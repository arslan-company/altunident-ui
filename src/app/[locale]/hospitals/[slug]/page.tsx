import { ChevronRight, Mail, MapPin, Phone } from 'lucide-react';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getLocale, getTranslations } from 'next-intl/server';

import { Button } from '@/components/base/button';
import Footer from '@/components/shared/footer';
import HTMLContent from '@/components/shared/html-content';
import Navbar from '@/components/shared/navbar';
import Section from '@/components/shared/section';
import { departmentsApi } from '@/features/departments';
import { doctorsApi, DoctorCard } from '@/features/doctors';
import { filenameToUrl } from '@/features/files';
import { hospitalApi, HospitalBanner } from '@/features/hospitals';
import { ServiceCard } from '@/features/services';
import generateMeta from '@/utils/generate-meta';
import slugify from '@/utils/slugify';


interface HospitalsPageParams {
  slug: string;
}

const fetchData = async (params: HospitalsPageParams) => {
  const { slug } = params;

  try {
    const locale = await getLocale();

    const hospitals = await hospitalApi.getHospitals({
      query: {
        slug,
        size: 1,
        language: locale === 'tr' ? undefined : locale,
      },
    });

    if (!hospitals || !hospitals?.items[0]) {
      return null;
    }

    const hospital = hospitals?.items[0];

    const [doctors, hospitalDepartments] = await Promise.all([
      doctorsApi.getDoctors({
        query: {
          hospital_ids: hospital?.id,
          size: 6,
          language: locale === 'tr' ? undefined : locale,
        },
      }),
      departmentsApi.getDepartments({
        query: {
          hospital_ids: hospital?.id,
          size: 6,
          language: locale === 'tr' ? undefined : locale,
        },
      }),
    ]);

    return { hospital, doctors, hospitalDepartments };
  } catch (error) {
    console.error('Error from src/app/[locale]/hospitals/[hospitalSlug]/page.tsx: ', error);
    return null;
  }
};

export default async function HospitalsPage({
  params: paramsPromise,
}: {
  params: Promise<HospitalsPageParams>;
}) {
  const params = await paramsPromise;

  // --- SERVER DATA --- //
  const data = await fetchData(params);

  if (!data) {
    return notFound();
  }

  const { hospital, doctors: doctorsData, hospitalDepartments: hospitalDepartmentsData } = data;

  // --- DATA --- //
  const doctors = doctorsData?.items || [];
  const hospitalDepartments = hospitalDepartmentsData?.items || [];

  return (
    <>
      <Navbar />
      <main className="tw-min-h-screen navbar-fix">
        <section className="tw-bg-darker-600 tw-py-16 tw-relative">
          <div className="tw-absolute tw-top-0 tw-left-0 tw-z-0 tw-h-full">
            <div className="tw-absolute tw-inset-0 tw-bg-gradient-to-l tw-from-darker-600 tw-to-transparent tw-z-20" />
            <Image
              src={filenameToUrl(hospital?.image_url) || ''}
              width={500}
              height={500}
              alt={hospital?.name || ''}
              className="tw-object-cover tw-object-top tw-w-full tw-h-full tw-z-10 tw-opacity-50"
            />
          </div>
          <div className="container tw-mx-auto tw-grid tw-grid-cols-1 md:tw-grid-cols-3 tw-gap-10 tw-relative tw-z-10">
            <div className="tw-col-span-1">
              <div className="tw-rounded-lg tw-overflow-hidden">
                <HospitalBanner
                  imageSrc={filenameToUrl(hospital?.image_url)}
                  className="tw-aspect-[4/3]"
                />
              </div>
            </div>
            <div className="tw-col-span-2 tw-space-y-10">
              <h1 className="tw-text-3xl tw-mb-4 tw-text-white">{hospital?.name}</h1>
              <div className="tw-grid tw-grid-cols-1 lg:tw-grid-cols-2 tw-gap-5">
                <div className="tw-flex tw-items-center tw-gap-2">
                  <MapPin className="tw-text-gray-300 tw-text-sm tw-font-normal tw-mb-0" />
                  <div>
                    <p className="tw-text-gray-300 tw-text-sm tw-font-normal tw-mb-0">Adres</p>
                    <p className="tw-text-white tw-text-base tw-font-semibold tw-mb-0">
                      {hospital?.contact_address}
                    </p>
                  </div>
                </div>
                <div className="tw-flex tw-items-center tw-gap-2">
                  <Phone className="tw-text-gray-300 tw-text-sm tw-font-normal tw-mb-0" />
                  <div>
                    <p className="tw-text-gray-300 tw-text-sm tw-font-normal tw-mb-0">Tel</p>
                    <p className="tw-text-white tw-text-base tw-font-semibold tw-mb-0">
                      {hospital?.contact_phone}
                    </p>
                  </div>
                </div>
                <div className="tw-flex tw-items-center tw-gap-2">
                  <Mail className="tw-text-gray-300 tw-text-sm tw-font-normal tw-mb-0" />
                  <div>
                    <p className="tw-text-gray-300 tw-text-sm tw-font-normal tw-mb-0">E-posta</p>
                    <p className="tw-text-white tw-text-base tw-font-semibold tw-mb-0">
                      {hospital?.contact_email}
                    </p>
                  </div>
                </div>
              </div>
              <div className="tw-flex tw-gap-2">
                <Link href={`${hospital?.appointment_link}`} target="_blank">
                  <Button rounded="full">Randevu Al</Button>
                </Link>
                <Link href="#yol-tarifi">
                  <Button variant="secondary" rounded="full">
                    <MapPin className="tw-text-sm tw-font-normal tw-mr-2" />
                    Yol Tarifi
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
        <Section title={`Yol Tarifi - ${hospital?.name}`} container>
          <div id="yol-tarifi" className="iframe tw-aspect-video tw-rounded-lg tw-overflow-hidden">
            <HTMLContent content={hospital?.contact_google_maps_iframe} />
          </div>
        </Section>
        <Section title="Bu Hastanedeki Birimler" container>
          <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 lg:tw-grid-cols-3 tw-gap-5 tw-text-center">
            {hospitalDepartments.map((department) => (
              <Link
                href={`/${hospital?.slug}/departments/${department?.id}/${slugify(department?.name)}`}
                key={department?.id}
              >
                <ServiceCard title={department?.name} id={department?.id} description={department?.description} />
              </Link>
            ))}
          </div>
          <div className="tw-flex tw-justify-center tw-mt-10">
            <Link href={`/${hospital?.slug}/departments`}>
              <Button variant="secondary">
                Web Sitesinde Tüm Birimleri Gör
                <ChevronRight className="tw-w-5 tw-h-5 tw-ml-2" />
              </Button>
            </Link>
          </div>
        </Section>
        <Section title="Bu Hastanedeki Doktorlar" container>
          <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 lg:tw-grid-cols-3 tw-gap-5 tw-text-center">
            {doctors.map((doctor) => (
              <DoctorCard
                key={doctor?.id}
                id={doctor?.id}
                name={doctor?.name}
                imageSrc={filenameToUrl(doctor?.image_url) || ''}
                doctorNameLinkHref={`/${hospital?.slug}/doctors/${doctor?.id}/${slugify(doctor?.name)}`}
              />
            ))}
          </div>
          <div className="tw-flex tw-justify-center tw-mt-10">
            <Link href={`/${hospital?.slug}/doctors`}>
              <Button variant="secondary">
                Web Sitesinde Tüm Doktorları Gör
                <ChevronRight className="tw-w-5 tw-h-5 tw-ml-2" />
              </Button>
            </Link>
          </div>
        </Section>
      </main>
      <Footer />
    </>
  );
}

export async function generateMetadata({
  params: paramsPromise,
}: {
  params: Promise<HospitalsPageParams>;
}): Promise<Metadata> {
  const params = await paramsPromise;
  const { slug } = params;

  const locale = await getLocale();
  const t = await getTranslations('meta.hospital_detail');
  const tSite = await getTranslations('site');

  const hospital = await hospitalApi.getHospitals({
    query: {
      slug,
      size: 1,
      language: locale === 'tr' ? undefined : locale,
    },
  });

  const currentHospital = hospital?.items[0];
  const hospitalName = currentHospital?.name;
  const defaultHospitalName = tSite('name');
  const hospitalImage = filenameToUrl(currentHospital?.image_url) || '/img/og-images/og-image.png';

  return await generateMeta(
    {
      title: t('title', { hospital_name: `${hospitalName} - ${defaultHospitalName}` }),
      description: t('description', { hospital_name: hospitalName }),
      keywords: t('keywords', { hospital_name: hospitalName }),
      openGraph: {
        title: t('og_title', { hospital_name: `${hospitalName} - ${defaultHospitalName}` }),
        description: t('og_description', { hospital_name: hospitalName }),
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
        title: t('twitter_title', { hospital_name: `${hospitalName} - ${defaultHospitalName}` }),
        description: t('twitter_description', { hospital_name: hospitalName }),
        images: [hospitalImage],
      },
    },
    {
      path: '/contact',
    },
  );
}
