'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

import { Button } from '@/components/base/button';
import Dialog from '@/components/base/dialog';

import dateHelper from '@/utils/dateHelper';

import { HospitalAppointmentDialog, useHospital } from '@/features/hospitals';
import socialMediaLinks from '@/constants/social-media-links';
import generalInfo from '@/constants/general-info';

function Footer() {
  const { currentHospital, withBasePath } = useHospital();
  const [suggestionDialogOpen, setSuggestionDialogOpen] = useState(false);
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
      id: 1,
      title: t('footer.section_2.items.item_1_text'),
      href: '/',
    },
    {
      id: 2,
      title: t('footer.section_2.items.item_2_text'),
      href: '/doctors/',
    },
    {
      id: 3,
      title: t('footer.section_2.items.item_3_text'),
      href: '/departments/',
    },
    {
      id: 4,
      title: t('footer.section_2.items.item_4_text'),
      href: '/corporate/',
    },
    {
      id: 5,
      title: t('footer.section_2.items.item_5_text'),
      href: '/blog/',
    },
    {
      id: 6,
      title: t('footer.section_2.items.item_6_text'),
      href: '/contact/',
    },
    {
      id: 7,
      title: 'KVKK',
      href: '/kvkk-aydinlatma-metni/',
    },
    {
      id: 8,
      title: 'Çerez Politikası',
      href: '/cookie-policy-page/',
    },
    {
      id: 9,
      title: 'Bu Test Nerede Yapılıyor?',
      href: 'https://ckysweb.saglik.gov.tr/labtestlerapp/testlabara.aspx',
    },
  ];

  return (
    <>
      <HospitalAppointmentDialog
        isOpen={appointmentDialogOpen}
        onClose={() => setAppointmentDialogOpen(false)}
      />
      <Dialog
        isOpen={suggestionDialogOpen}
        onClose={() => setSuggestionDialogOpen(false)}
        title="Görüş ve Öneri Bildir"
        maxWidth="tw-max-w-2xl"
      >
        <div className="tw-p-4">
          <div className="tw-mb-8">
            Hasta İlişkileri Bölümü olarak; hastanelerimizden arzu ettiğiniz hizmeti almak ve
            sizlerin memnuniyetini sağlamak için; hastanemizden hizmet alan tüm hasta ve
            yakınlarının hastanemiz ile ilgili görüş ve düşüncelerini alır. Bildirilen tüm görüşleri
            ilgili departman yöneticileri ile değerlendirir ve sizlerin talepleri doğrultusunda
            hizmet kalitemizi artırmak için çalışır, değerlendirme sonrası alınan kararlar ve
            sonuçlar hakkında bölüme bildirimi yapan hastamıza geri dönüş yaparız.
          </div>

          <Link href={withBasePath('/contact/#contact-form')}>
            <Button>İletişime Geç</Button>
          </Link>
        </div>
      </Dialog>

      <div className="tw-bg-[#001430]">
        <footer className="container tw-mx-auto tw-py-16 tw-px-4 lg:tw-px-8">
          <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-3 tw-gap-12">
            {/* Logo ve İletişim Bölümü */}
            <div className="tw-space-y-8">
              <Link href="/" className="tw-block">
                <Image
                  src="/img/logo-atakent.svg"
                  alt="atakent hastanesi logo"
                  width={180}
                  height={100}
                  quality={70}
                  className="tw-w-48 tw-h-auto"
                />
              </Link>

              <div className="tw-flex tw-items-center tw-gap-4 tw-bg-[#05224c] tw-p-4 tw-rounded-lg">
                <Image
                  src="/icons/call-center-icon.png"
                  alt="call-center"
                  width={60}
                  height={60}
                  quality={70}
                  className="tw-w-12 tw-h-12"
                />
                <div className="tw-flex tw-flex-col">
                  <span className="tw-text-gray-300 tw-text-sm">Çağrı Merkezi</span>
                  <span className="tw-text-white tw-text-2xl tw-font-bold">
                    {generalInfo.phoneNumber}
                  </span>
                </div>
              </div>

              <p className="tw-text-gray-300 tw-leading-relaxed">
                {t('footer.section_1.description')}
              </p>

              <div className="tw-flex tw-gap-4">
                {socialMediaLinks.map((social) => (
                  <a
                    key={social.href}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    className="tw-bg-[#05224c] tw-p-2.5 tw-rounded-lg tw-text-white hover:tw-bg-[#0a3572] hover:tw-text-white tw-transition-colors tw-flex tw-items-center tw-justify-center"
                  >
                    <i className={`bx ${social.icon} tw-text-xl`} />
                  </a>
                ))}
              </div>

              <div className="tw-space-y-3">
                <Button
                  onClick={handleAppointmentClick}
                  size="sm"
                  className="tw-w-full tw-bg-[#05224c] hover:tw-bg-[#0a3572] tw-text-white tw-py-3"
                >
                  {t('footer.section_1.make_an_appointment_button_text')}
                </Button>

                <Button
                  onClick={() => setSuggestionDialogOpen(true)}
                  size="sm"
                  className="tw-w-full tw-bg-transparent tw-border tw-border-[#05224c] hover:tw-bg-[#05224c] tw-text-white tw-py-3"
                >
                  {t('footer.section_1.report_suggestion_button_text')}
                </Button>
              </div>
            </div>

            <div className="tw-space-y-6">
              <h3 className="tw-text-white tw-text-xl tw-text-center tw-font-semibold tw-pb-2 tw-border-b tw-border-[#05224c]">
                {t('footer.section_2.title')}
              </h3>
              <div className="tw-grid tw-grid-cols-1 tw-gap-3 tw-text-center">
                {quickMenuItems.map((item) => (
                  <Link
                    key={item.id}
                    href={item.href}
                    className="tw-text-gray-300 hover:tw-text-white tw-transition-colors tw-flex tw-items-center tw-gap-2 tw-justify-center"
                  >
                    {item.title}
                  </Link>
                ))}
              </div>
            </div>

            <div className="tw-space-y-6">
              <h3 className="tw-text-white tw-text-xl tw-font-semibold tw-pb-2 tw-border-b tw-border-[#05224c]">
                {t('footer.section_4.title')}{' '}
                <span className="tw-text-gray-300 tw-text-base tw-font-normal">
                  {currentHospital?.name
                    ? `/ ${currentHospital?.name}`
                    : `/ ${t('footer.section_4.general_center_title')}`}
                </span>
              </h3>
              <div className="tw-space-y-6">
                <a
                  href={`tel:+90${generalInfo.phoneNumber.replace(/\s+/g, '')}`}
                  className="tw-flex tw-items-center tw-gap-4 tw-text-gray-300 hover:tw-text-white tw-transition-colors"
                >
                  <div className="tw-bg-[#05224c] tw-p-2.5 tw-rounded-lg">
                    <i className="bx bx-phone-call tw-text-xl" />
                  </div>
                  <div className="tw-flex tw-flex-col">
                    <span className="tw-text-sm">
                      {t('footer.section_4.items.support_line_title')}
                    </span>
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
                  <div className="tw-bg-[#05224c] tw-p-2.5 tw-rounded-lg">
                    <i className="bx bx-envelope tw-text-xl" />
                  </div>
                  <div className="tw-flex tw-flex-col">
                    <span className="tw-text-sm">{t('footer.section_4.items.email_title')}</span>
                    <span className="tw-text-white tw-font-medium">
                      {currentHospital?.contact_email || generalInfo.email}
                    </span>
                  </div>
                </a>
                <div className="tw-flex tw-items-start tw-gap-4 tw-text-gray-300">
                  <div className="tw-bg-[#05224c] tw-p-2.5 tw-rounded-lg">
                    <i className="bx bx-location-plus tw-text-xl" />
                  </div>
                  <div className="tw-flex tw-flex-col">
                    <span className="tw-text-sm">{t('footer.section_4.items.address_title')}</span>
                    <span className="tw-text-white tw-font-medium">
                      {currentHospital?.contact_address || generalInfo.address}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="tw-mt-12 tw-pt-8 tw-border-t tw-border-[#05224c] tw-text-gray-400 tw-text-sm">
            {t('footer.last_update_date')}: {lastUpdateDate}
          </div>
        </footer>

        <div className="tw-border-t tw-border-[#05224c] tw-bg-[#001022]">
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
