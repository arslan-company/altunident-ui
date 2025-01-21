'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import React, { useState } from 'react';

import { Button } from '@/components/base/button';
import generalInfo from '@/constants/general-info';
import socialMediaLinks from '@/constants/social-media-links';
import { HospitalAppointmentDialog, useHospital } from '@/features/hospitals';
import dateHelper from '@/utils/dateHelper';

import Logo from '../logo';

function Footer() {
  const { currentHospital } = useHospital();
  const [appointmentDialogOpen, setAppointmentDialogOpen] = useState(false);

  const t = useTranslations();

  const getLastUpdateDate = () => {
    const date = new Date();
    const newYear = date.getFullYear();
    const newMount = dateHelper.formatDateItemToBeValid(String(date.getMonth() + 1));
    const newDay = dateHelper.formatDateItemToBeValid(String(date.getDate()));
    return `${newDay}/${newMount}/${newYear}`;
  };

  const handleAppointmentClick = () => {
    if (currentHospital) {
      window.open(currentHospital.appointment_link, '_blank');
    } else {
      setAppointmentDialogOpen(true);
    }
  };

  const lastUpdateDate = getLastUpdateDate();
  const currentYear = new Date().getFullYear();

  const quickMenuItems = [
    {
      id: 2,
      title: t('common.our_doctors'),
      href: '/doctors/',
    },
    {
      id: 3,
      title: t('common.our_departments'),
      href: '/departments/',
    },
    {
      id: 4,
      title: t('common.our_services'),
      href: '/services/',
    },
    {
      id: 5,
      title: t('common.corporate'),
      href: '/corporate/',
    },
    {
      id: 6,
      title: t('common.blog'),
      href: '/blog/',
    },
    {
      id: 7,
      title: t('common.contact'),
      href: '/contact/',
    },
    {
      id: 8,
      title: 'KVKK',
      href: '/kvkk-aydinlatma-metni/',
    },
    {
      id: 9,
      title: 'Çerez Politikası',
      href: '/cookie-policy-page/',
    },
  ];

  return (
    <>
      <HospitalAppointmentDialog
        isOpen={appointmentDialogOpen}
        onClose={() => setAppointmentDialogOpen(false)}
      />

      <div className="tw-bg-darker-700">
        <footer className="container tw-mx-auto tw-py-16 !tw-px-12 lg:!tw-px-8">
          <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-3 tw-gap-12">
            {/* Logo and Contact Section */}
            <div className="tw-space-y-8">
              <Link href="/" className="tw-block">
                <Logo variant="white" className="!tw-h-20" />
              </Link>

              <div className="tw-flex tw-items-center tw-gap-4 tw-bg-darker-400 tw-p-4 tw-rounded-lg">
                <i className="bx bx-phone-call tw-text-3xl tw-text-white" />
                <div className="tw-flex tw-flex-col">
                  <span className="tw-text-gray-300 tw-text-sm">{t('common.contact_us')}</span>
                  <span className="tw-text-white tw-text-2xl tw-font-bold">
                    {generalInfo.phoneNumber}
                  </span>
                </div>
              </div>

              <div className="tw-flex tw-gap-4">
                {socialMediaLinks.map((social) => (
                  <a
                    key={social.href}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    className="tw-bg-darker-400 tw-p-2.5 tw-rounded-lg tw-text-white hover:tw-bg-darker-300 hover:tw-text-white tw-transition-colors tw-flex tw-items-center tw-justify-center"
                  >
                    <i className={`bx ${social.icon} tw-text-xl`} />
                  </a>
                ))}
              </div>

              <div className="tw-space-y-3">
                <Button
                  onClick={handleAppointmentClick}
                  size="sm"
                  className="tw-w-full tw-text-white tw-py-3 !tw-bg-darker-400 hover:!tw-bg-darker-300"
                >
                  {t('common.make_an_appointment')}
                </Button>
              </div>
            </div>

            <div className="tw-space-y-6">
              <h3 className="tw-text-white tw-text-xl md:tw-text-center tw-font-semibold tw-pb-2">
                {t('common.quick_menu')}
              </h3>
              <div className="tw-grid tw-grid-cols-1 tw-gap-3 md:tw-text-center">
                {quickMenuItems.map((item) => (
                  <Link
                    key={item.id}
                    href={item.href}
                    className="tw-text-gray-300 hover:tw-text-white tw-transition-colors tw-flex tw-items-center tw-gap-2 md:tw-justify-center"
                  >
                    {item.title}
                  </Link>
                ))}
              </div>
            </div>

            <div className="tw-space-y-6">
              <h3 className="tw-text-white tw-text-xl tw-font-semibold tw-pb-2 tw-border-b tw-border-darker-400">
                {t('common.contact')}{' '}
                <span className="tw-text-gray-300 tw-text-base tw-font-normal">
                  {!!currentHospital?.name && `/ ${currentHospital?.name}`}
                </span>
              </h3>
              <div className="tw-space-y-6">
                <a
                  href={`tel:${generalInfo.phoneNumber.replace(/\s+/g, '')}`}
                  className="tw-flex tw-items-center tw-gap-4 tw-text-gray-300 hover:tw-text-white tw-transition-colors"
                >
                  <div className="tw-bg-darker-400 tw-p-2.5 tw-rounded-lg">
                    <i className="bx bx-phone-call tw-text-xl" />
                  </div>
                  <div className="tw-flex tw-flex-col">
                    <span className="tw-text-sm">{t('common.phone')}</span>
                    <span className="tw-text-white tw-font-medium">{generalInfo.phoneNumber}</span>
                  </div>
                </a>
                <a
                  href={
                    currentHospital?.contact_email
                      ? `mailto:${currentHospital?.contact_email}`
                      : `mailto:${generalInfo.email}`
                  }
                  className="tw-flex tw-items-center tw-gap-4 tw-text-gray-300 hover:tw-text-white tw-transition-colors"
                >
                  <div className="tw-bg-darker-400 tw-p-2.5 tw-rounded-lg">
                    <i className="bx bx-envelope tw-text-xl" />
                  </div>
                  <div className="tw-flex tw-flex-col">
                    <span className="tw-text-sm">{t('common.email')}</span>
                    <span className="tw-text-white tw-font-medium">
                      {currentHospital?.contact_email || generalInfo.email}
                    </span>
                  </div>
                </a>
                <div className="tw-flex tw-items-start tw-gap-4 tw-text-gray-300">
                  <div className="tw-bg-darker-400 tw-p-2.5 tw-rounded-lg">
                    <i className="bx bx-location-plus tw-text-xl" />
                  </div>
                  <div className="tw-flex tw-flex-col">
                    <span className="tw-text-sm">{t('common.address')}</span>
                    <span className="tw-text-white tw-font-medium">
                      {currentHospital?.contact_address || generalInfo.address}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="tw-mt-12 tw-pt-8 tw-border-t tw-border-darker-400 tw-text-gray-400 tw-text-sm">
            {t('footer.last_update_date')}: {lastUpdateDate}
          </div>
        </footer>

        <div className="tw-border-t tw-border-darker-400 tw-bg-darker-900">
          <div className="tw-container tw-mx-auto tw-py-6 tw-px-4 lg:tw-px-8">
            <p className="tw-text-gray-400 tw-text-center tw-text-sm">
              Copyright &copy; 2008 - {currentYear} | Powered by{' '}
              <a
                href="https://arslansoftwareservices.com/"
                target="blank"
                className="tw-text-white hover:tw-text-gray-200 tw-transition-colors"
              >
                Arslan Software.
              </a>{' '}
              {t('footer.section_1.rights_reserved')}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Footer;
