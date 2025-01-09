'use client';

import React, { useState } from 'react';
import { ClipboardPlus } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Button } from '@/components/base/button';

import { HospitalAppointmentDialog } from '@/features/hospitals';

import { type DoctorCardProps } from '.';

interface AppointmentActionProps {
  doctorHospitals: DoctorCardProps['hospitals'];
}

/**
 * ### CLIENT SIDE COMPONENT
 */
export default function AppointmentAction({ doctorHospitals }: AppointmentActionProps) {
  const t = useTranslations();
  const [appointmentDialogOpen, setAppointmentDialogOpen] = useState(false);

  return (
    <>
      <HospitalAppointmentDialog
        isOpen={appointmentDialogOpen}
        onClose={() => setAppointmentDialogOpen(false)}
        filter={doctorHospitals?.map((hospital) => hospital.id)}
      />

      <Button
        variant="softPrimary"
        size="sm"
        onClick={() => setAppointmentDialogOpen(true)}
        className="tw-flex-1"
      >
        <ClipboardPlus className="tw-w-4 tw-h-4 tw-mr-2" />
        {t('common.make_an_appointment')}
      </Button>
    </>
  );
}
