'use client';

import Link from 'next/link';
import React from 'react';

import Dialog from '@/components/base/dialog';
import socialMediaLinks from '@/constants/social-media-links';
import { filenameType, Media } from '@/features/files';
import withImageUrl from '@/utils/with-image-url';

import { useHospital } from '../hooks';

interface AppointmentDialogProps {
  filter?: number[];
  isOpen: boolean;
  onClose: () => void;
}

const MULTIPLE_HOSPITAL = false;

export function HospitalAppointmentDialog({ isOpen, onClose, filter }: AppointmentDialogProps) {
  const { hospitals } = useHospital();

  const filteredHospitals = filter
    ? hospitals.filter((hospital) => filter.includes(hospital.id))
    : hospitals;

  if (!MULTIPLE_HOSPITAL) {
    return (
      <Dialog isOpen={isOpen} onClose={onClose} title="Şimdi Randevu Alın" maxWidth="tw-max-w-2xl">
        <div className="tw-w-full">
          <Link
            href={socialMediaLinks[4].href}
            className="tw-flex tw-items-center tw-gap-5 tw-w-full tw-p-2 tw-rounded-md hover:tw-bg-gray-100 tw-group"
            target="_blank"
          >
            <div className="tw-w-[50px] tw-h-[50px] tw-overflow-hidden tw-rounded-md">
              <Media
                src="/img/social-media/whatsapp.png"
                imageProps={{ alt: 'Whatsapp ile Randevu Al', quality: 25, sizes: '20vw' }}
              />
            </div>
            <div className="tw-line-clamp-1 tw-w-full tw-max-w-[200px] lg:tw-w-auto lg:tw-max-w-none">
              <h3 className="group-hover:tw-text-primary tw-transition-all tw-duration-300 tw-text-sm lg:tw-text-lg tw-font-medium tw-m-0">
                Whatsapp ile Randevu Al
              </h3>
            </div>
          </Link>
        </div>
      </Dialog>
    );
  }

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
