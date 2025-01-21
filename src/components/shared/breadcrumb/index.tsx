import Link from 'next/link';

import { cn } from '@/lib/cn';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  title: string;
  items: BreadcrumbItem[];
  className?: string;
  backgroundImage?: string;
}

export default function Breadcrumb({
  title,
  items,
  className,
  backgroundImage = '/img/breadcrumb/default-breadcrumb-image.jpg',
}: BreadcrumbProps) {
  return (
    <div
      className={cn(
        'tw-relative tw-h-[150px] md:tw-h-[180px] lg:tw-h-[280px]',
        'tw-flex tw-flex-col tw-items-center tw-justify-center tw-overflow-hidden',
        'navbar-fix',
        className,
      )}
    >
      {backgroundImage && (
        <div
          className="tw-absolute tw-inset-0 tw-bg-cover tw-bg-center tw-bg-no-repeat"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        />
      )}

      <div className="tw-absolute tw-inset-0 tw-bg-black/60" />
      <div className="tw-absolute tw-inset-0 tw-bg-primary/20" />

      <div className="tw-relative tw-z-10 tw-flex tw-flex-col tw-items-center tw-gap-2 md:tw-gap-4 tw-px-4">
        <h1 className="tw-text-2xl md:tw-text-3xl lg:tw-text-4xl tw-font-bold tw-text-white tw-text-center">
          {title}
        </h1>

        <nav className="tw-flex tw-flex-wrap tw-justify-center tw-items-center tw-text-xs md:tw-text-sm tw-text-white/80">
          {items.map((item, index) => (
            <div key={item.label} className="tw-flex tw-items-center tw-font-semibold">
              {index > 0 && <span className="tw-mx-1 md:tw-mx-2">›</span>}
              {item.href ? (
                <Link
                  href={item.href}
                  className="hover:tw-text-white hover:tw-underline tw-text-primary"
                >
                  {item.label}
                </Link>
              ) : (
                <span className="tw-text-white">{item.label}</span>
              )}
            </div>
          ))}
        </nav>
      </div>
    </div>
  );
}
