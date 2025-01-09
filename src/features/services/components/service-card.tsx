'use client';

interface ServiceCardProps {
  title: string;
}

/**
 * ### CLIENT SIDE COMPONENT
 */
export function ServiceCard({ title }: ServiceCardProps) {
  return (
    <div className="tw-group tw-block">
      <div className="tw-relative tw-overflow-hidden tw-bg-white tw-rounded-xl tw-p-6 tw-shadow-lg hover:tw-shadow-xl tw-transition-all tw-duration-300 tw-border tw-border-gray-100 group-hover:tw-border-primary/30">
        <div className="tw-absolute tw-right-0 tw-top-0 tw-w-32 tw-h-32 tw-opacity-10 tw-bg-gradient-to-br tw-from-primary tw-to-primary/50 tw-rounded-bl-full tw-transition-all tw-duration-300 group-hover:tw-opacity-20" />

        <div className="tw-relative tw-flex tw-justify-center tw-flex-col tw-h-full tw-text-center">
          <div className="tw-mb-6 tw-flex tw-justify-center">
            <div className="tw-w-20 tw-h-20 tw-bg-gradient-to-br tw-from-primary tw-to-primary/80 tw-rounded-2xl tw-flex tw-items-center tw-justify-center tw-transform -tw-rotate-6 group-hover:tw-rotate-0 tw-transition-transform tw-duration-300">
              <span className="flaticon-support tw-text-3xl tw-text-white" />
            </div>
          </div>

          <h3 className="tw-text-xl tw-font-bold tw-text-gray-800 tw-mb-3 group-hover:tw-text-primary tw-transition-colors">
            {title}
          </h3>

          <div className="tw-flex tw-justify-center tw-text-primary tw-font-semibold tw-mt-4 group-hover:tw-translate-x-2 tw-transition-transform">
            <span>Daha Fazla Bilgi</span>
            <svg
              className="tw-w-5 tw-h-5 tw-ml-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
