import React from 'react';

import Navbar from '@/components/_App/Navbar';
import BrandStatistics from '@/components/Home/BrandStatistics';
import ContactForm from '@/components/Common/ContactForm';
import Carousel from '@/components/Home/Carousel';
import Footer from '@/components/_App/Footer';

import Hospitals from './components/Hospitals';
import SearchForm from './components/SearchForm';
import MainBanner from './components/MainBanner';
import Services from './components/Services';
import DoctorList from './components/DoctorList';
import useHomeModule from './useHomeModule';

export default function HomeView() {
  const { departmentsData, doctorsData, servicesResponse } = useHomeModule();

  const services = servicesResponse.data?.items || [];

  return (
    <>
      <Navbar />

      <MainBanner />

      <SearchForm />

      <Hospitals />

      <Services data={services} />

      <DoctorList
        departmentsData={departmentsData}
        doctorsData={doctorsData}
      />

      <BrandStatistics />

      <ContactForm showImage />

      <Carousel />

      <Footer />
    </>
  );
}
