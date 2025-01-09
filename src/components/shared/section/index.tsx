'use client';

import { cn } from '@/lib/cn';

import useMounted from '@/hooks/use-mounted';

export default function Section({
  children,
  title,
  description,
  container = false,
  className,
  ...props
}: {
  children: React.ReactNode;
  title?: string;
  description?: string;
  container?: boolean;
  className?: string;
}) {
  const mounted = useMounted();

  if (!mounted) return null;

  return (
    <section
      className={cn(
        'tw-relative tw-bg-gradient-to-b tw-from-gray-50 tw-to-white tw-py-24',
        className,
      )}
      {...props}
    >
      {title || description ? (
        <div className="container tw-text-center tw-mb-12">
          {!!title && (
            <h2 className="tw-text-3xl md:tw-text-4xl tw-font-bold tw-text-gray-800 tw-mb-4">
              {title}
            </h2>
          )}
          {!!description && <p className="tw-max-w-[700px] tw-mx-auto">{description}</p>}
          <div className="tw-w-20 tw-h-1 tw-bg-gradient-to-r tw-from-primary tw-to-primary/60 tw-mx-auto" />
        </div>
      ) : null}
      <div className={cn(container ? 'container' : '')}>{children}</div>
    </section>
  );
}
