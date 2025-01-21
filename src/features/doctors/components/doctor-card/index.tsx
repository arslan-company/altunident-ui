import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/base/tooltip';
import { Media } from '@/features/files';


import AppointmentAction from './appointment-action';
import DoctorName from './doctor-name';

interface Hospital {
  name: string;
  id: number;
}

export interface DoctorCardProps {
  imageSrc: string;
  name: string;
  hospitals?: Hospital[];
  department?: string | undefined;
  id: string | number;
  doctorNameLinkHref?: string;
}

export const DoctorCard = ({
  imageSrc,
  name,
  hospitals,
  department,
  id,
  doctorNameLinkHref,
}: DoctorCardProps) => {
  return (
    <div className="tw-group tw-relative tw-flex tw-flex-col tw-items-center tw-max-h-[600px] tw-w-full tw-overflow-hidden tw-rounded-lg tw-bg-white tw-shadow-md tw-transition-all hover:tw-shadow-lg">
      <div className="tw-aspect-[3.5/4] tw-relative tw-w-full tw-h-full tw-overflow-hidden">
        <Media
          src={imageSrc}
          imageProps={{ alt: name, quality: 60 }}
          className="tw-object-cover tw-object-top tw-w-full tw-h-full tw-transition-transform tw-duration-300 tw-z-10 tw-relative"
        />
        <Media
          src="/img/doctors/doctor-background.jpg"
          imageProps={{ alt: 'doctor-card-overlay', quality: 60 }}
          className="tw-absolute tw-top-0 tw-left-0 tw-w-full tw-h-full tw-object-cover tw-z-0"
        />
      </div>

      <div className="tw-flex tw-flex-col tw-p-4 tw-w-full">
        <div className="tw-flex-1">
          {!!hospitals && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <span className="tw-line-clamp-1 tw-text-primary tw-text-left tw-w-full tw-text-sm tw-mb-2 tw-font-semibold">
                    {hospitals.map((hospital) => hospital.name).join(', ')}
                  </span>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="tw-max-w-[300px] tw-break-words">
                    {hospitals.map((hospital) => hospital.name).join(', ')}
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}

          <h3>
            <DoctorName name={name} id={id} href={doctorNameLinkHref} />
          </h3>
          {!!department && (
            <p className="tw-text-base tw-mb-2 tw-line-clamp-1 tw-text-left">{department}</p>
          )}
        </div>

        {!!hospitals && (
          <div className="tw-mt-5 tw-flex tw-w-full">
            <AppointmentAction doctorHospitals={hospitals} />
          </div>
        )}
      </div>
    </div>
  );
};
