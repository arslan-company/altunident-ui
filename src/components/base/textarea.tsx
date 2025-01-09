'use client';

import { forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/cn';

const textareaVariants = cva(
  [
    'tw-w-full tw-rounded-md tw-border tw-border-solid tw-border-gray-300 tw-bg-white',
    'tw-text-gray-700 tw-shadow-sm tw-transition-colors',
    'hover:tw-border-primary focus:tw-border-primary focus:tw-ring-2 focus:tw-ring-primary focus:tw-outline-none',
    'tw-resize-none', // disables resizing by default
  ],
  {
    variants: {
      size: {
        sm: 'tw-py-2 tw-px-4 tw-text-sm min-tw-h-[100px]',
        md: 'tw-py-2.5 tw-px-4 tw-text-base min-tw-h-[120px]',
        lg: 'tw-py-3 tw-px-4 tw-text-lg min-tw-h-[140px]',
      },
      error: {
        true: 'tw-border-red-500',
      },
      resizable: {
        true: 'tw-resize-vertical',
        false: 'tw-resize-none',
      },
    },
    defaultVariants: {
      size: 'md',
      resizable: false,
    },
  },
);

interface TextareaProps
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'size'>,
    Omit<VariantProps<typeof textareaVariants>, 'error'> {
  error?: string;
  resizable?: boolean;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error, size, resizable, ...props }, ref) => {
    return (
      <div className="tw-w-full">
        <textarea
          ref={ref}
          className={cn(
            textareaVariants({
              size,
              error: !!error,
              resizable,
              className,
            }),
          )}
          {...props}
        />
        {error && <p className="tw-mt-1 tw-text-sm tw-text-red-500">{error}</p>}
      </div>
    );
  },
);

Textarea.displayName = 'Textarea';
