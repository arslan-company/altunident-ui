'use client';

import { Transition } from '@headlessui/react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useState, useEffect, useRef } from 'react';

import { Button } from '@/components/base/button';
import { SwitchLanguage } from '@/components/shared/switch-language';
import { corporateEndpoints } from '@/features/corporate/api';
import { useGeneralSearchStore } from '@/features/general-search';
import { HospitalAppointmentDialog, useHospital } from '@/features/hospitals';
import { ServicesDropdown } from '@/features/services';

import Logo from '../logo';

import { MobileNavLink, NavLink } from './nav-link';
import TopHeader from './top-header';

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
      href: '/corporate/human-resources',
      label: 'İnsan Kaynakları',
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
          className={`tw-bg-white tw-transition-all tw-duration-300 ${isScrolled ? 'tw-shadow-xl' : 'tw-border-b tw-border-gray-100'
            }`}
        >
          <div className="tw-container tw-mx-auto">
            <div className="tw-flex tw-justify-between tw-h-20">
              {/* Logo */}
              <div className="tw-flex-shrink-0 tw-flex tw-items-center">
                <Link className="tw-flex tw-items-center tw-gap-2" href={withBasePath('/')}>
                  <Logo className="!tw-h-10 md:!tw-h-14" />
                  {currentHospital && (
                    <span className="tw-text-primary tw-font-semibold">
                      {currentHospital.short_name}
                    </span>
                  )}
                </Link>
              </div>

              {/* Nav Items - Desktop Menu */}
              <div className="tw-hidden xl:tw-flex tw-items-center tw-justify-center tw-flex-1 tw-pl-8">
                <div className="tw-flex tw-space-x-1">
                  {!!hospitalSlug && <NavLink href="/">{t('site.name')}</NavLink>}
                  {hospitalDropdownItems.length > 0 && (
                    <NavLink
                      href="/hospitals"
                      dropdown={{
                        items: hospitalDropdownItems,
                      }}
                    >
                      {t('common.our_hospitals')}
                    </NavLink>
                  )}
                  <NavLink
                    href={withBasePath('/doctors')}
                    active={pathnameWithoutHospitalSlug.startsWith('/doctors')}
                  >
                    {t('common.our_doctors')}
                  </NavLink>
                  <ServicesDropdown />
                  <NavLink
                    href={withBasePath('/departments')}
                    active={pathnameWithoutHospitalSlug.startsWith('/departments')}
                  >
                    {t('common.our_departments')}
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
                          {t('common.corporate')}
                        </NavLink>
                      )}
                      <NavLink
                        href="/blog"
                        active={pathnameWithoutHospitalSlug.startsWith('/blog')}
                      >
                        {t('common.blog')}
                      </NavLink>
                    </>
                  ) : null}
                  <NavLink
                    href={withBasePath('/contact')}
                    active={pathnameWithoutHospitalSlug.startsWith('/contact')}
                  >
                    {t('common.contact')}
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
                  {t('common.make_an_appointment')}
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
                  {t('common.search')}
                </button>

                {!!hospitalSlug && (
                  <MobileNavLink href="/" active={pathnameWithoutHospitalSlug === '/'}>
                    {t('site.name')}
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
                    {t('common.our_hospitals')}
                  </MobileNavLink>
                )}
                <MobileNavLink
                  href={withBasePath('/doctors')}
                  active={pathnameWithoutHospitalSlug.startsWith('/doctors')}
                >
                  {t('common.our_doctors')}
                </MobileNavLink>
                <div className="tw-px-2">
                  <ServicesDropdown />
                </div>
                <MobileNavLink
                  href={withBasePath('/departments')}
                  active={pathnameWithoutHospitalSlug.startsWith('/departments')}
                >
                  {t('common.our_departments')}
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
                        {t('common.corporate')}
                      </MobileNavLink>
                    )}
                    <MobileNavLink
                      href="/blog"
                      active={pathnameWithoutHospitalSlug.startsWith('/blog')}
                    >
                      {t('common.blog')}
                    </MobileNavLink>
                  </>
                ) : null}
                <MobileNavLink
                  href={withBasePath('/contact')}
                  active={pathnameWithoutHospitalSlug.startsWith('/contact')}
                >
                  {t('common.contact')}
                </MobileNavLink>
              </div>
              <div className="tw-px-4 tw-py-3 tw-border-t tw-border-gray-100">
                <Button
                  className="tw-w-full tw-justify-center tw-bg-primary hover:tw-bg-primary/90"
                  onClick={handleAppointmentClick}
                >
                  {t('common.make_an_appointment')}
                </Button>
              </div>
            </div>
          </Transition>
        </nav>
      </header>
    </>
  );
}
