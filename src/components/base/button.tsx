import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/cn';

const buttonVariants = cva(
  'tw-inline-flex tw-items-center tw-justify-center tw-font-medium tw-transition-all tw-duration-300 tw-ease-in-out disabled:tw-opacity-70 disabled:tw-cursor-not-allowed',
  {
    variants: {
      variant: {
        primary:
          'tw-bg-primary tw-text-white hover:tw-bg-primary/70 disabled:hover:tw-bg-primary-600',
        secondary:
          'tw-bg-gray-100 tw-text-gray-900 hover:tw-bg-gray-200 disabled:hover:tw-bg-gray-100',
        outline:
          'tw-border tw-border-gray-200 tw-border-solid tw-bg-transparent hover:tw-bg-gray-100',
        ghost: 'tw-bg-transparent tw-text-gray-700 hover:tw-bg-gray-50',
        text: 'tw-bg-transparent tw-text-gray-700 hover:tw-underline',
        soft: 'tw-bg-gray-50 tw-text-gray-700 hover:tw-bg-gray-100',
        softPrimary: 'tw-bg-primary/10 tw-text-primary hover:tw-bg-primary/20',
      },
      size: {
        xs: 'tw-text-xs tw-px-4.5 tw-py-1.5',
        sm: 'tw-text-sm tw-px-6 tw-py-2',
        md: 'tw-text-base tw-px-7 tw-py-2.5',
        lg: 'tw-text-lg tw-px-8 tw-py-2.5',
        iconOnly: 'tw-p-2',
      },
      fullWidth: {
        true: 'tw-w-full',
      },
      isLoading: {
        true: 'tw-opacity-70 tw-cursor-not-allowed',
      },
      rounded: {
        full: 'tw-rounded-full',
        xl: 'tw-rounded-xl',
        lg: 'tw-rounded-lg',
        md: 'tw-rounded-md',
        default: 'tw-rounded',
        sm: 'tw-rounded-sm',
        none: 'tw-rounded-none',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
      fullWidth: false,
      isLoading: false,
      rounded: 'default',
    },
  },
);

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  isLoading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      fullWidth,
      isLoading,
      rounded,
      leftIcon,
      rightIcon,
      children,
      disabled,
      ...props
    },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        className={cn(
          buttonVariants({ variant, size, fullWidth, rounded, isLoading: !!isLoading, className }),
        )}
        disabled={disabled || !!isLoading}
        {...props}
      >
        {isLoading && (
          <svg
            className="tw-animate-spin tw-h-4 tw-w-4 tw-mr-2"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="tw-opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="tw-opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {leftIcon && <span className="tw-mr-2">{leftIcon}</span>}
        {children}
        {rightIcon && <span className="tw-ml-2">{rightIcon}</span>}
      </button>
    );
  },
);

Button.displayName = 'Button';

export { Button, type ButtonProps };
