import { Media } from '@/features/files';
import { cn } from '@/lib/cn';

interface HospitalBannerProps {
  imageSrc: string | null;
  name?: string;
  className?: string;
}

export function HospitalBanner({ imageSrc, name, className }: HospitalBannerProps) {
  return (
    <div
      className={cn('tw-group tw-block tw-relative tw-overflow-hidden tw-aspect-video', className)}
    >
      <Media
        src={imageSrc || '/img/hospitals/representative-hospital-image.jpg'}
        imageProps={{ alt: name, quality: 60 }}
        className="tw-object-cover tw-object-top tw-w-full tw-h-full tw-transition-transform tw-duration-300 tw-relative group-hover:tw-scale-105 tw-z-10"
      />
      {name && (
        <div className="tw-absolute tw-inset-0 tw-bg-gradient-to-t tw-from-black/50 tw-to-transparent tw-z-20">
          <div className="tw-absolute tw-bottom-3 tw-left-4 tw-right-4">
            <h3 className="tw-text-white tw-font-bold tw-text-lg tw-mb-2">{name}</h3>
          </div>
        </div>
      )}
    </div>
  );
}
