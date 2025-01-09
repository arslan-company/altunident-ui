'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { Transition } from '@headlessui/react';
import { useParams } from 'next/navigation';

import { HospitalAppointmentDialog, useHospital } from '@/features/hospitals';
import { useGeneralSearchStore } from '@/features/general-search';
import { Media } from '@/features/files';
import { corporateEndpoints } from '@/features/corporate/api';

import { SwitchLanguage } from '@/components/shared/switch-language';

import { Button } from '@/components/base/button';

import TopHeader from './top-header';
import { MobileNavLink, NavLink } from './nav-link';

interface NavbarClientProps {
  serverData: {
    corporatePages: typeof corporateEndpoints.getCorporatePages.response.items;
  };
}

export default function NavbarClient({ serverData }: NavbarClientProps) {
  // --- HOOKS --- //
  const { hospitalSlug } = useParams();
  const { hospitals, currentHospital, pathnameWithoutHospitalSlug, withBasePath } = useHospital();
  const t = useTranslations();
  const { open } = useGeneralSearchStore();

  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const [isAppointmentDialogOpen, setIsAppointmentDialogOpen] = useState(false);

  const { corporatePages } = serverData;

  const hospitalDropdownItems = hospitals?.map((hospital) => ({
    href: `/${hospital?.slug}`,
    label: hospital?.name,
  }));

  const corporateDropdownItems = [
    ...(corporatePages ?? []).map((page) => ({
      href: `/corporate/${page?.id}/${page?.slug}`,
      label: page?.title,
    })),
    {
      href: '/corporate/news',
      label: 'Kurumsal Haberler',
    },
    {
      href: '/corporate/human-resources',
      label: 'İnsan Kaynakları',
    },
    {
      href: '/corporate/quality-studies',
      label: 'Kalite Çalışmaları',
    },
    {
      href: '/corporate/organization-schema',
      label: 'Organizasyon Şeması',
    },
  ];

  const handleAppointmentClick = () => {
    if (currentHospital) {
      window.open(currentHospital.appointment_link, '_blank');
    } else {
      setIsAppointmentDialogOpen(true);
    }
  };

  // --- EFFECTS --- //
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const updateHeaderHeight = () => {
      if (headerRef.current) {
        const height = headerRef.current.offsetHeight;
        document.documentElement.style.setProperty('--navbar-height', `${height}px`);
      }
    };

    // Update height on initial load and window resize
    updateHeaderHeight();
    window.addEventListener('resize', updateHeaderHeight);

    // Update height when header content changes (e.g. when mobile menu opens)
    const observer = new ResizeObserver(updateHeaderHeight);
    if (headerRef.current) {
      observer.observe(headerRef.current);
    }

    return () => {
      window.removeEventListener('resize', updateHeaderHeight);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <HospitalAppointmentDialog
        isOpen={isAppointmentDialogOpen}
        onClose={() => setIsAppointmentDialogOpen(false)}
      />
      <header ref={headerRef} className="tw-fixed tw-top-0 tw-w-full tw-z-50">
        <TopHeader />

        <nav
          className={`tw-bg-white tw-transition-all tw-duration-300 ${
            isScrolled ? 'tw-shadow-xl' : 'tw-border-b tw-border-gray-100'
          }`}
        >
          <div className="tw-max-w-7xl tw-mx-auto tw-px-4 sm:tw-px-6 lg:tw-px-8">
            <div className="tw-flex tw-justify-between tw-h-16">
              {/* Logo */}
              <div className="tw-flex-shrink-0 tw-flex tw-items-center">
                <Link href={withBasePath('/')}>
                  <div className="tw-flex tw-items-center tw-space-x-2">
                    <Media
                      src="/img/logo/atakent-icon-primary.svg"
                      element="image"
                      imageProps={{ alt: 'atakent hastanesi logo', width: 32, height: 32 }}
                      className="tw-w-auto tw-h-6"
                    />
                    <Media
                      src="/img/logo/atakent-text-logo-primary.svg"
                      element="image"
                      imageProps={{ alt: 'atakent hastanesi logo', width: 120, height: 24 }}
                      className="tw-w-auto tw-h-5"
                    />
                  </div>
                  {currentHospital && (
                    <span className="tw-text-primary">{currentHospital.short_name}</span>
                  )}
                </Link>
              </div>

              {/* Nav Items - Desktop Menu */}
              <div className="tw-hidden xl:tw-flex tw-items-center tw-justify-center tw-flex-1 tw-pl-8">
                <div className="tw-flex tw-space-x-1">
                  {!!hospitalSlug && <NavLink href="/">{t('navbar.nav_items.home')}</NavLink>}
                  {hospitalDropdownItems.length > 0 && (
                    <NavLink
                      href="/hospitals"
                      dropdown={{
                        items: hospitalDropdownItems,
                      }}
                    >
                      {t('navbar.nav_items.hospitals')}
                    </NavLink>
                  )}
                  <NavLink
                    href={withBasePath('/doctors')}
                    active={pathnameWithoutHospitalSlug.startsWith('/doctors')}
                  >
                    {t('navbar.nav_items.doctors')}
                  </NavLink>
                  <NavLink
                    href={withBasePath('/departments')}
                    active={pathnameWithoutHospitalSlug.startsWith('/departments')}
                  >
                    {t('navbar.nav_items.departments')}
                  </NavLink>
                  {!hospitalSlug ? (
                    <>
                      {corporateDropdownItems.length > 0 && (
                        <NavLink
                          href="/corporate"
                          dropdown={{
                            items: corporateDropdownItems,
                          }}
                        >
                          {t('navbar.nav_items.corporate')}
                        </NavLink>
                      )}
                      <NavLink
                        href="/blog"
                        active={pathnameWithoutHospitalSlug.startsWith('/blog')}
                      >
                        {t('navbar.nav_items.blog')}
                      </NavLink>
                    </>
                  ) : null}
                  <NavLink
                    href={withBasePath('/contact')}
                    active={pathnameWithoutHospitalSlug.startsWith('/contact')}
                  >
                    {t('navbar.nav_items.contact')}
                  </NavLink>
                </div>
              </div>

              {/* Right Side - Desktop */}
              <div className="tw-hidden xl:tw-flex tw-items-center tw-space-x-3">
                <SwitchLanguage />
                <Button
                  size="xs"
                  onClick={handleAppointmentClick}
                  className="tw-bg-primary hover:tw-bg-primary/90 tw-text-white tw-px-4 tw-py-2 tw-text-sm"
                >
                  {t('navbar.make_an_appointment')}
                </Button>
                <Button
                  size="iconOnly"
                  variant="text"
                  className="tw-text-gray-500 tw-p-0 tw-rounded-full"
                  onClick={open}
                >
                  <i className="bx bx-search tw-text-xl" />
                </Button>
              </div>

              {/* Mobile Menu Button */}
              <div className="tw-flex xl:tw-hidden tw-items-center tw-space-x-4">
                <Button
                  size="iconOnly"
                  variant="text"
                  className="tw-text-gray-500 tw-p-0 tw-rounded-full"
                  onClick={open}
                >
                  <i className="bx bx-search tw-text-xl" />
                </Button>
                <SwitchLanguage />
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="tw-inline-flex tw-items-center tw-justify-center tw-p-2 tw-rounded-md tw-text-gray-500 hover:tw-text-primary hover:tw-bg-gray-50"
                >
                  <span className="tw-sr-only">Ana menüyü aç</span>
                  {isOpen ? (
                    <i className="bx bx-x tw-text-2xl" />
                  ) : (
                    <i className="bx bx-menu tw-text-2xl" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Menu */}
          <Transition
            show={isOpen}
            enter="tw-transition tw-duration-200 tw-ease-out"
            enterFrom="tw-opacity-0 tw-scale-95"
            enterTo="tw-opacity-100 tw-scale-100"
            leave="tw-transition tw-duration-100 tw-ease-in"
            leaveFrom="tw-opacity-100 tw-scale-100"
            leaveTo="tw-opacity-0 tw-scale-95"
          >
            <div className="xl:tw-hidden tw-border-t tw-border-gray-100 tw-h-[calc(100vh-100px)] tw-overflow-y-auto">
              <div className="tw-px-2 tw-pt-2 tw-pb-3 tw-space-y-1">
                <button
                  onClick={() => {
                    setIsOpen(false);
                    open();
                  }}
                  className="tw-flex tw-w-full tw-items-center tw-px-3 tw-py-2 tw-text-base tw-text-gray-600 hover:tw-bg-gray-50 tw-rounded-md tw-transition-colors"
                >
                  <i className="bx bx-search tw-mr-3 tw-text-xl" />
                  Search
                </button>

                {!!hospitalSlug && (
                  <MobileNavLink href="/" active={pathnameWithoutHospitalSlug === '/'}>
                    {t('navbar.nav_items.home')}
                  </MobileNavLink>
                )}
                {hospitalDropdownItems.length > 0 && (
                  <MobileNavLink
                    href="/hospitals"
                    active={pathnameWithoutHospitalSlug === '/hospitals'}
                    dropdown={{
                      items: hospitalDropdownItems,
                    }}
                  >
                    {t('navbar.nav_items.hospitals')}
                  </MobileNavLink>
                )}
                <MobileNavLink
                  href={withBasePath('/doctors')}
                  active={pathnameWithoutHospitalSlug.startsWith('/doctors')}
                >
                  {t('navbar.nav_items.doctors')}
                </MobileNavLink>
                <MobileNavLink
                  href={withBasePath('/departments')}
                  active={pathnameWithoutHospitalSlug.startsWith('/departments')}
                >
                  {t('navbar.nav_items.departments')}
                </MobileNavLink>
                {!hospitalSlug ? (
                  <>
                    {corporateDropdownItems.length > 0 && (
                      <MobileNavLink
                        href="/corporate"
                        dropdown={{
                          items: corporateDropdownItems,
                        }}
                        active={pathnameWithoutHospitalSlug.startsWith('/corporate')}
                      >
                        {t('navbar.nav_items.corporate')}
                      </MobileNavLink>
                    )}
                    <MobileNavLink
                      href="/blog"
                      active={pathnameWithoutHospitalSlug.startsWith('/blog')}
                    >
                      {t('navbar.nav_items.blog')}
                    </MobileNavLink>
                  </>
                ) : null}
                <MobileNavLink
                  href={withBasePath('/contact')}
                  active={pathnameWithoutHospitalSlug.startsWith('/contact')}
                >
                  {t('navbar.nav_items.contact')}
                </MobileNavLink>
              </div>
              <div className="tw-px-4 tw-py-3 tw-border-t tw-border-gray-100">
                <Button
                  className="tw-w-full tw-justify-center tw-bg-primary hover:tw-bg-primary/90"
                  onClick={handleAppointmentClick}
                >
                  {t('navbar.make_an_appointment')}
                </Button>
              </div>
            </div>
          </Transition>
        </nav>
      </header>
    </>
  );
}
