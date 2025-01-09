'use client';

import React from 'react';
import Link from 'next/link';

import Dialog from '@/components/base/dialog';

import { filenameType, Media } from '@/features/files';

import withImageUrl from '@/utils/with-image-url';

import { useHospital } from '../hooks';

interface AppointmentDialogProps {
  filter?: number[];
  isOpen: boolean;
  onClose: () => void;
}

export function HospitalAppointmentDialog({ isOpen, onClose, filter }: AppointmentDialogProps) {
  const { hospitals } = useHospital();

  const filteredHospitals = filter
    ? hospitals.filter((hospital) => filter.includes(hospital.id))
    : hospitals;

  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      title="Randevu Almak İstediğiniz Hastaneyi Seçiniz"
      maxWidth="tw-max-w-2xl"
    >
      <div className="tw-w-full">
        {filteredHospitals.map((hospital) => {
          if (!hospital.appointment_link) {
            return null;
          }

          const imageUrl =
            filenameType(hospital?.image_url) === 'unknown'
              ? '/img/hospitals/representative-hospital-image.jpg'
              : withImageUrl(hospital?.image_url);

          return (
            <Link
              key={hospital?.id}
              href={hospital?.appointment_link}
              className="tw-flex tw-items-center tw-gap-5 tw-w-full tw-p-2 tw-rounded-md hover:tw-bg-gray-100 tw-group"
              target="_blank"
            >
              <div className="tw-w-[100px] lg:tw-w-[130px] tw-h-auto tw-overflow-hidden tw-rounded-md">
                <Media
                  src={imageUrl}
                  imageProps={{ alt: hospital?.name, quality: 25, sizes: '20vw' }}
                />
              </div>
              <div className="tw-line-clamp-1 tw-w-full tw-max-w-[200px] lg:tw-w-auto lg:tw-max-w-none">
                <h3 className="group-hover:tw-text-primary tw-transition-all tw-duration-300 tw-text-sm lg:tw-text-lg tw-font-medium tw-m-0">
                  {hospital?.name}
                </h3>
              </div>
            </Link>
          );
        })}
      </div>
    </Dialog>
  );
}
