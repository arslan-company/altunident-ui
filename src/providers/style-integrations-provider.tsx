'use client';

import AOS from 'aos';
import React, { useEffect } from 'react';


// aos
import 'aos/dist/aos.css';
// modal video
import 'react-modal-video/css/modal-video.min.css';
// accessible accordion
import 'react-accessible-accordion/dist/fancy-example.css';
// datepicker
import 'react-datepicker/dist/react-datepicker.css';
// swiper
import 'swiper/css';
import 'swiper/css/bundle';

// bootstrap
import '@/styles/bootstrap.min.css';
// animate
import '@/styles/animate.css';
// meanmenu
import '@/styles/meanmenu.css';
// boxicons
import '@/styles/boxicons.min.css';
// flaticon
import '@/styles/flaticon.css';

// global styles
import '@/styles/style.css';
import '@/styles/responsive.css';

// page styles
// departments
import '@/styles/pages/departments/index.css';
// hospital detail
import '@/styles/pages/hospitals/hospital-detail/index.css';
// corporate
import '@/styles/pages/corporate/index.css';
import '@/styles/pages/corporate/human-resources/cv-form/components/form/index.css';
// blog
import '@/styles/pages/blog/index.css';
import '@/styles/pages/blog/components/blog-sidebar/index.css';
import '@/styles/pages/blog/blog-detail/index.css';
// doctors
import '@/styles/pages/doctors/index.css';
import '@/styles/pages/doctors/doctor-detail/index.css';

// component styles
import '@/styles/components/app/navbar/index.css';
import '@/styles/components/app/top-header/index.css';
import '@/styles/components/app/fixed-link/index.css';
import '@/styles/components/app/campaigns-popup/index.css';
import '@/styles/components/app/go-top/index.css';
import '@/styles/components/app/footer/index.css';
import '@/styles/components/app/layout/index.css';
import '@/styles/components/app/appointment-popup/index.css';
import '@/styles/components/app/make-an-appointment-button/index.css';
import '@/styles/components/data-entry/input/index.css';
import '@/styles/components/home/main-banner/index.css';
import '@/styles/components/home/main-banner-2/index.css';
import '@/styles/components/home/doctor-list/index.css';
import '@/styles/components/home/news/index.css';
import '@/styles/components/home/carousel/index.css';
import '@/styles/components/home/search-form/index.css';
import '@/styles/components/home/brand-statistics/index.css';
import '@/styles/components/home/services/index.css';
import '@/styles/components/contact-us/contact-info/index.css';
import '@/styles/components/pagination/index.css';
import '@/styles/components/common/blog-card/index.css';
import '@/styles/components/common/hospital-card/index.css';
import '@/styles/components/common/doctors/index.css';
import '@/styles/components/common/page-banner/index.css';
import '@/styles/components/common/loading/index.css';
import '@/styles/components/common/contact-form/index.css';
import '@/styles/components/common/doctor-card/index.css';
import '@/styles/components/popup/index.css';

export default function StyleIntegrationsProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // to initialize animation, we need to call AOS.init()
    AOS.init();
  }, []);

  return children;
}
