import { useEffect } from 'react';
import AOS from 'aos';
import { appWithTranslation } from 'next-i18next';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ThemeProvider, TigerTheme } from '@tiger-ui/react';

import 'aos/dist/aos.css';
import 'react-modal-video/css/modal-video.min.css';
import 'react-accessible-accordion/dist/fancy-example.css';
import 'react-datepicker/dist/react-datepicker.css';
import 'swiper/css';
import 'swiper/css/bundle';

import '../styles/bootstrap.min.css';
import '../styles/animate.css';
import '../styles/meanmenu.css';
import '../styles/boxicons.min.css';
import '../styles/flaticon.css';

/* - Global Styles - */
import '../styles/style.css';
import '../styles/responsive.css';

/* - Page Styles - */
// departments
import '../styles/pages/departments/index.css';
// hospital detail
import '../styles/pages/hospitals/hospital-detail/index.css';
// corporate
import '../styles/pages/corporate/index.css';
import '../styles/pages/corporate/human-resources/cv-form/components/form/index.css';
// blog
import '../styles/pages/blog/index.css';
import '../styles/pages/blog/components/blog-sidebar/index.css';
import '../styles/pages/blog/blog-detail/index.css';
// doctors
import '../styles/pages/doctors/index.css';
import '../styles/pages/doctors/doctor-detail/index.css';

/* - Component Styles - */
import '../styles/components/app/navbar/index.css';
import '../styles/components/app/top-header/index.css';
import '../styles/components/app/fixed-link/index.css';
import '../styles/components/app/campaigns-popup/index.css';
import '../styles/components/app/go-top/index.css';
import '../styles/components/app/footer/index.css';
import '../styles/components/app/layout/index.css';
import '../styles/components/app/appointment-popup/index.css';
import '../styles/components/app/make-an-appointment-button/index.css';
import '../styles/components/data-entry/input/index.css';
import '../styles/components/home/main-banner/index.css';
import '../styles/components/home/main-banner-2/index.css';
import '../styles/components/home/doctor-list/index.css';
import '../styles/components/home/news/index.css';
import '../styles/components/home/carousel/index.css';
import '../styles/components/home/search-form/index.css';
import '../styles/components/home/brand-statistics/index.css';
import '../styles/components/home/services/index.css';
import '../styles/components/contact-us/contact-info/index.css';
import '../styles/components/pagination/index.css';
import '../styles/components/common/blog-card/index.css';
import '../styles/components/common/hospital-card/index.css';
import '../styles/components/common/doctors/index.css';
import '../styles/components/common/page-banner/index.css';
import '../styles/components/common/loading/index.css';
import '../styles/components/common/contact-form/index.css';
import '../styles/components/common/doctor-card/index.css';
import '../styles/components/popup/index.css';

import Layout from '../components/_App/Layout';

// Context
import GlobalContextProvider from '../context';
import QueryContextProvider from '../hooks/useQuery';
import PaginationContextProvider from '../hooks/usePagination';

import { GlobalHospitalDataProvider } from '@/hooks/useGlobalHospitalData';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30000,
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

const tigerTheme = new TigerTheme({
  colors: {
    base: {
      primary: {
        main: '#0cb8b6',
      },
    },
  },
  typography: {
    paragraph: {
      fontSize: '14px',
    },
  },
  breakpoints: {
    values: {
      sm: 576,
      md: 768,
      lg: 992,
      xl: 1200,
      xxl: 1400,
    },
  },
});

function MyApp(props) {
  const { Component, pageProps } = props;

  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={tigerTheme}>
        <GlobalHospitalDataProvider>
          <GlobalContextProvider>
            <QueryContextProvider>
              <PaginationContextProvider>
                <Layout>
                  <Component {...pageProps} />
                </Layout>
              </PaginationContextProvider>
            </QueryContextProvider>
          </GlobalContextProvider>
        </GlobalHospitalDataProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default appWithTranslation(MyApp);
