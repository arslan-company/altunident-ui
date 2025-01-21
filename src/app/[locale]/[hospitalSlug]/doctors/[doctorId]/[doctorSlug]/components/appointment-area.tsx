'use client';

import { useTranslations } from 'next-intl';
import React, { useState } from 'react';

import { Button } from '@/components/base/button';
import { HospitalAppointmentDialog } from '@/features/hospitals';

interface AppointmentAreaProps {
  doctorHospitalsIds?: number[];
}

export default function AppointmentArea({ doctorHospitalsIds }: AppointmentAreaProps) {
  // --- HOOKS --- //
  const t = useTranslations();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <HospitalAppointmentDialog
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        filter={doctorHospitalsIds}
      />
      <Button size="sm" onClick={() => setIsOpen(true)} className="tw-w-full">
        {t('doctor_detail_page.available_times_area.make_an_appointment_button_text')}
      </Button>
    </>
  );
}
