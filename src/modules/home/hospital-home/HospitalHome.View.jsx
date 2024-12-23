import React from 'react';

import Navbar from '@/components/_App/Navbar';
import Footer from '@/components/_App/Footer';

import MainBanner from '../components/MainBanner';
import SearchForm from '../components/SearchForm';
import Services from '../components/Services';
import DoctorList from '../components/DoctorList';

import useHospitalHomeModule from './useHospitalHomeModule';

export default function HospitalHomeView() {
  const {
    departmentsData,
    doctorsData,
    servicesResponse,
  } = useHospitalHomeModule();

  const services = servicesResponse.data?.items || [];

  return (
    <>
      <Navbar />

      <MainBanner />

      <SearchForm />

      <DoctorList
        departmentsData={departmentsData}
        doctorsData={doctorsData}
      />

      <Services data={services} />

      <Footer />
    </>
  );
}
