'use client';

import { forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/cn';

const inputVariants = cva(
  [
    'tw-w-full tw-rounded-md tw-border tw-border-solid tw-border-gray-300 tw-bg-white',
    'tw-text-gray-700 tw-shadow-sm tw-transition-colors',
    'hover:tw-border-primary focus:tw-border-primary focus:tw-ring-2 focus:tw-ring-primary focus:tw-outline-none',
  ],
  {
    variants: {
      size: {
        sm: 'tw-py-2 tw-text-sm tw-h-9',
        md: 'tw-py-2.5 tw-text-base tw-h-10',
        lg: 'tw-py-3 tw-text-lg tw-h-11',
      },
      error: {
        true: 'tw-border-red-500',
      },
      withStartIcon: {
        true: 'tw-pl-10',
        false: 'tw-pl-4',
      },
      withEndIcon: {
        true: 'tw-pr-10',
        false: 'tw-pr-4',
      },
    },
    defaultVariants: {
      size: 'md',
      withStartIcon: false,
      withEndIcon: false,
    },
  },
);

const iconVariants = cva(
  'tw-absolute tw-top-1/2 -tw-translate-y-1/2 tw-text-gray-400 tw-flex tw-items-center tw-justify-center',
  {
    variants: {
      size: {
        sm: 'tw-h-4 tw-w-4',
        md: 'tw-h-5 tw-w-5',
        lg: 'tw-h-6 tw-w-6',
      },
      position: {
        start: 'tw-left-3',
        end: 'tw-right-3',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  },
);

interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
    Omit<VariantProps<typeof inputVariants>, 'error'> {
  error?: string;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, startIcon, endIcon, size, ...props }, ref) => {
    return (
      <div className="tw-w-full">
        <div className="tw-relative tw-flex tw-items-center tw-justify-center">
          {startIcon && (
            <div className={iconVariants({ size, position: 'start' })}>{startIcon}</div>
          )}
          <input
            ref={ref}
            className={cn(
              inputVariants({
                size,
                error: !!error,
                withStartIcon: !!startIcon,
                withEndIcon: !!endIcon,
                className,
              }),
            )}
            {...props}
          />
          {endIcon && <div className={iconVariants({ size, position: 'end' })}>{endIcon}</div>}
        </div>
        {error && <p className="tw-mt-1 tw-text-sm tw-text-red-500">{error}</p>}
      </div>
    );
  },
);

Input.displayName = 'Input';
