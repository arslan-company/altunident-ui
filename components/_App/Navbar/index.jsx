import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';

import Button from '@/components/base/Button';

import TopHeader from '@/components/_App/TopHeader';

import SwitchLanguage from '@/components/templates/inputs/SwitchLanguage';
import AppointmentDialog from '@/components/templates/feedback/AppointmentDialog';
import { Dropdown, DropdownLink } from '@/components/templates/navigation/Dropdown';

import useLocale from '@/hooks/useLocale';
import useGlobalHospitalData from '@/hooks/useGlobalHospitalData';
import useHospitalRoutes from '@/hooks/useHospitalRoutes';

import { useCorporatePages } from '@/hooks/fetch/useCorporatePages';
import SearchDialog from '@/components/templates/feedback/SearchDialog';

function Navbar({ transparent = true }) {
  const router = useRouter();
  const { currentLanguageQuery } = useLocale();
  const { hospitalsData, currentHospitalData } = useGlobalHospitalData();
  const {
    currentHospitalSlug,
    currentHospitalSlugUrl,
    defaultHospitalSlug,
  } = useHospitalRoutes();

  const { t } = useTranslation('common');

  const [menu, setMenu] = useState(true);

  const [corporateMenu, setCorporateMenu] = useState(false);
  const [hospitalsMenu, setHospitalsMenu] = useState(false);

  const [appointmentDialogOpen, setAppointmentDialogOpen] = useState(false);
  const [searchDialogOpen, setSearchDialogOpen] = useState(false);

  const corporatePagesData = useCorporatePages({
    params: {
      language: currentLanguageQuery,
    },
    options: {
      staleTime: 50000,
    },
  });

  const corporatePages = corporatePagesData.data?.items || [];

  const currentPath = router.asPath;

  const hospitals = hospitalsData.data?.items || [];
  const currentHospital = currentHospitalData.data;

  const toggleNavbar = () => {
    setMenu(!menu);
  };

  useEffect(() => {
    const elementId = document.getElementById('navbar');
    document.addEventListener('scroll', () => {
      if (window.scrollY > 0) {
        elementId.classList.add('is-sticky');
      } else {
        elementId.classList.remove('is-sticky');
      }
    });
  });

  const classOne = menu
    ? 'collapse navbar-collapse'
    : 'collapse navbar-collapse show';
  const classTwo = menu
    ? 'navbar-toggler navbar-toggler-right collapsed'
    : 'navbar-toggler navbar-toggler-right';

  return (
    <>
      <AppointmentDialog
        open={appointmentDialogOpen}
        onClose={() => setAppointmentDialogOpen(false)}
      />

      <SearchDialog
        open={searchDialogOpen}
        onClose={() => setSearchDialogOpen(false)}
        cssx={{
          overflow: 'visible',
          md: {
            top: '20%',
            width: '60%',
          },
          xs: {
            top: '15%',
            width: '90%',
          },
        }}
      />

      <header className="header-area fixed-top">
        <TopHeader />

        <div className="nav-area-2">
          <div id="navbar" className={`navbar-area ${!transparent && 'no-transparent'}`}>
            <div className="main-nav">
              <nav className="navbar navbar-expand-xxl navbar-light">
                <div className="container">

                  <div className="d-flex align-items-center">
                    <div className="d-flex align-items-center me-2">
                      <Link href={`${currentHospital ? currentHospitalSlugUrl : '/'}`} className="navbar-brand">
                        <div className="d-flex flex-column">
                          <div className="logo-wrapper">
                            <Image
                              src="/img/logo/atakent-icon.svg"
                              alt="atakent hastanesi logo"
                              className={`logo-icon ${currentHospital && 'mb-1'}`}
                              width={150}
                              height={150}
                              quality={90}
                            />

                            <Image
                              src="/img/logo/atakent-text-logo.svg"
                              alt="atakent hastanesi logo"
                              className={`logo-text ${currentHospital && 'mb-1'}`}
                              width={150}
                              height={150}
                              quality={90}
                            />

                          </div>
                          {currentHospitalSlug && <span className="logo-subtitle">{currentHospital?.short_name}</span>}
                        </div>
                      </Link>
                    </div>

                    <button
                      onClick={toggleNavbar}
                      className={classTwo}
                      type="button"
                      data-toggle="collapse"
                      data-target="#navbarSupportedContent"
                      aria-controls="navbarSupportedContent"
                      aria-expanded="false"
                      aria-label="Toggle navigation"
                    >
                      <span className="icon-bar top-bar" />
                      <span className="icon-bar middle-bar" />
                      <span className="icon-bar bottom-bar" />
                    </button>
                  </div>

                  <div className={classOne} id="navbarSupportedContent">
                    <ul className="navbar-nav m-auto">
                      <li className="nav-item">
                        <Link
                          href="/"
                          className={`nav-link ${currentPath === '/' && 'active'}`}
                        >
                          {t('navbar.nav_items.home')}
                        </Link>
                      </li>

                      <li
                        className="nav-item"
                        onMouseEnter={() => setHospitalsMenu(true)}
                        onMouseLeave={() => setHospitalsMenu(false)}
                      >
                        <Link href="#!" className="nav-link">
                          {t('navbar.nav_items.hospitals')}
                        </Link>
                        <Dropdown open={hospitalsMenu}>
                          {hospitalsData.isLoading ? (
                            <DropdownLink href="#!">{t('common_loading_component.loading_text')}</DropdownLink>
                          ) : hospitals?.map((hospital) => (
                            <DropdownLink key={hospital?.id} href={`/${hospital?.slug}/`}>{hospital?.name}</DropdownLink>
                          ))}
                        </Dropdown>
                      </li>
                      <li className="nav-item">
                        <Link
                          href={{
                            pathname: `${currentHospitalSlugUrl}/doctors`,
                            query: {
                              hospitalFilter: currentHospitalSlug === defaultHospitalSlug || !currentHospitalSlug ? 'all' : currentHospitalData.data?.id,
                              departmentFilter: 'all',
                              size: '8',
                              page: '1',
                            },
                          }}
                          className={`nav-link ${
                            currentPath === '/doctors/' && 'active'
                          }`}
                        >
                          {t('navbar.nav_items.doctors')}
                        </Link>
                      </li>

                      <li className="nav-item">
                        <Link
                          href={{
                            pathname: `${currentHospitalSlugUrl}/departments/`,
                            query: {
                              hospitalFilter: currentHospitalSlug === defaultHospitalSlug || !currentHospitalSlug ? 'all' : currentHospitalData.data?.id,
                            },
                          }}
                          className={`nav-link ${
                            currentPath === '/departments/' && 'active'
                          }`}
                        >
                          {t('navbar.nav_items.departments')}
                        </Link>
                      </li>

                      <li
                        className="nav-item"
                        onMouseEnter={() => setCorporateMenu(true)}
                        onMouseLeave={() => setCorporateMenu(false)}
                      >
                        <Link
                          href="#"
                          onClick={(e) => e.preventDefault()}
                          className={`nav-link ${
                            currentPath === '/corporate/' && 'active'
                          }`}
                        >
                          {t('navbar.nav_items.corporate')}
                        </Link>
                        <Dropdown open={corporateMenu}>
                          {corporatePages.map((item) => (
                            <DropdownLink key={item?.id} href={`/corporate/${item?.id}/${item?.slug}`}>{t(item?.title)}</DropdownLink>
                          ))}
                          <DropdownLink href="/corporate/organization-schema">
                            {t('navbar.nav_items.corporate_pages.organization_schema')}
                          </DropdownLink>
                          <DropdownLink href="/corporate/quality-studies">
                            {t('navbar.nav_items.corporate_pages.quality_studies')}
                          </DropdownLink>
                          <DropdownLink href="/corporate/human-resources">
                            {t('navbar.nav_items.corporate_pages.human_resources')}
                          </DropdownLink>
                          <DropdownLink href="/corporate/corporate-events">
                            Kurumsal Etkinlikler
                          </DropdownLink>
                        </Dropdown>
                      </li>

                      <li className="nav-item">
                        <Link
                          href={`${currentHospitalSlugUrl}/blog/?page=1&size=6`}
                          className={`nav-link ${
                            currentPath === '/blog/' && 'active'
                          }`}
                        >
                          {t('navbar.nav_items.blog')}
                        </Link>
                      </li>

                      <li className="nav-item">
                        <Link
                          href={`${currentHospitalSlugUrl}/contact/`}
                          className={`nav-link ${
                            currentPath === `${currentHospitalSlugUrl}/contact/` && 'active'
                          }`}
                        >
                          {t('navbar.nav_items.contact')}
                        </Link>
                      </li>
                    </ul>
                  </div>

                  <div className="others-option">
                    <SwitchLanguage />
                    <div className="make-an-appointment">
                      <Button
                        size={{
                          xs: 'xsmall',
                          md: 'small',
                        }}
                        onClick={() => setAppointmentDialogOpen(true)}
                      >
                        {t('navbar.make_an_appointment')}
                      </Button>
                    </div>

                    <div>
                      <Button
                        variant="text"
                        size="iconOnly"
                        cssx={{ fontSize: '20px' }}
                        title="Genel Arama"
                        onClick={() => setSearchDialogOpen(true)}
                      >
                        <i className="bx bx-search search-icon" />
                      </Button>
                    </div>
                  </div>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

export default Navbar;
