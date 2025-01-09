'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useLocale } from 'next-intl';

import { useHospital } from '@/features/hospitals';

import socialMediaLinks from '@/constants/social-media-links';
import generalInfo from '@/constants/general-info';

export default function TopHeader() {
  const locale = useLocale();
  const { currentHospital } = useHospital();

  const renderSlogan = () => {
    switch (locale) {
      case 'tr':
        return (
          <Image
            src="/img/slogans/tr.png"
            alt="Sağlığınızın Gülümseyen Yüzü - Atakent Hastanesi Slogan"
            width={200}
            height={48}
            quality={50}
          />
        );
      case 'en':
        return (
          <Image
            src="/img/slogans/en.png"
            alt="The Smiling Face of Your Health - Atakent Hospital"
            width={200}
            height={48}
            quality={50}
          />
        );
      case 'de':
        return (
          <Image
            src="/img/slogans/de.png"
            alt="Das Lächelnde Gesicht Ihrer Gesundheit - Atakent Krankenhaus"
            width={200}
            height={48}
            quality={50}
          />
        );
      case 'fr':
        return (
          <Image
            src="/img/slogans/fr.png"
            alt="Le Visage Souriant de Votre Santé - Hôpital Atakent"
            width={200}
            height={48}
            quality={50}
          />
        );
      case 'ru':
        return (
          <Image
            src="/img/slogans/ru.png"
            alt="Улыбающееся лицо вашего здоровья - Атакентская больница"
            width={200}
            height={48}
            quality={50}
          />
        );
      case 'ar':
        return (
          <Image
            src="/img/slogans/ar.png"
            alt="وجه صحتك المبتسم - مستشفى أتاكنت"
            width={200}
            height={48}
            quality={50}
          />
        );
      default:
        return (
          <Image
            src="/img/slogans/en.png"
            alt="The Smiling Face of Your Health - Atakent Hospital"
            width={200}
            height={48}
            quality={50}
          />
        );
    }
  };

  return (
    <div className="tw-bg-gray-100 tw-border-b tw-border-gray-100">
      <div className="tw-max-w-7xl tw-mx-auto tw-px-4 sm:tw-px-6 lg:tw-px-8">
        <div className="tw-flex tw-justify-between tw-items-center tw-h-10 tw-text-sm">
          {/* Left Side - Slogan */}
          <div className="tw-hidden md:tw-block">{renderSlogan()}</div>

          {/* Right Side - Contact Information and Social Media */}
          <div className="tw-flex tw-items-center tw-space-x-6 tw-w-full md:tw-w-auto tw-justify-between md:tw-justify-end">
            {/* Contact Information */}
            <div className="tw-flex tw-items-center tw-space-x-6">
              <Link
                href={`tel:+90${currentHospital?.contact_phone.replace(/\s+/g, '') || generalInfo.phoneNumber.replace(/\s+/g, '')}`}
                className="tw-flex tw-items-center tw-space-x-2 tw-text-gray-600 hover:tw-text-primary"
              >
                <i className="bx bxs-phone tw-text-primary" />
                <span>
                  {currentHospital ? currentHospital?.contact_phone : generalInfo.phoneNumber}
                </span>
              </Link>
              <Link
                href={`mailto:${currentHospital?.contact_email || generalInfo.email}`}
                className="tw-hidden sm:tw-flex tw-items-center tw-space-x-2 tw-text-gray-600 hover:tw-text-primary"
              >
                <i className="bx bxs-envelope tw-text-primary" />
                <span>{currentHospital ? currentHospital?.contact_email : generalInfo.email}</span>
              </Link>
            </div>

            {/* Social Media Icons */}
            <div className="tw-flex tw-items-center tw-space-x-4">
              {socialMediaLinks.map((social) => (
                <Link
                  key={social.id}
                  href={social.href}
                  className="tw-text-gray-400 hover:tw-text-primary tw-transition-colors"
                  target="_blank"
                  rel="noreferrer"
                >
                  <i className={`bx ${social.icon} tw-text-lg`} />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
