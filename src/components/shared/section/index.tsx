'use client';

import { cn } from '@/lib/cn';

import useMounted from '@/hooks/use-mounted';

export default function Section({
  children,
  title,
  description,
  container = false,
  variant = 'default',
  className,
  titleIcon,
  ...props
}: {
  children: React.ReactNode;
  title?: string;
  description?: string;
  container?: boolean;
  className?: string;
  variant?: 'default' | 'darker';
  titleIcon?: React.ReactNode;
}) {
  const mounted = useMounted();

  if (!mounted) return null;

  return (
    <section
      className={cn(
        'tw-relative  tw-py-24',
        variant === 'darker'
          ? 'tw-bg-darker-600'
          : 'tw-from-gray-50 tw-to-white tw-bg-gradient-to-b',
        className,
      )}
      {...props}
    >
      {title || description ? (
        <div className="container tw-text-center tw-mb-12">
          {!!title && (
            <div className="tw-flex tw-items-center tw-justify-center tw-gap-4 tw-mb-4">
              {titleIcon && (
                <span className="tw-w-16 tw-h-16 tw-rounded-full tw-bg-primary/10 tw-flex tw-items-center tw-justify-center">
                  {titleIcon}
                </span>
              )}
              <h2
                className={cn(
                  'tw-text-3xl md:tw-text-4xl tw-font-bold',
                  variant === 'darker' ? 'tw-text-white' : 'tw-text-gray-800',
                )}
              >
                {title}
              </h2>
            </div>
          )}
          {!!description && (
            <p
              className={cn(
                variant === 'darker' ? 'tw-text-white tw-opacity-75' : 'tw-text-gray-800',
              )}
            >
              {description}
            </p>
          )}
          <div className="tw-w-20 tw-h-1 tw-bg-gradient-to-r tw-from-primary tw-to-primary/60 tw-mx-auto" />
        </div>
      ) : null}
      <div className={cn(container ? 'container' : '')}>{children}</div>
    </section>
  );
}
