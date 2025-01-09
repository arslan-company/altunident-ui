'use client';

import { forwardRef, useState, useCallback } from 'react';
import { Check, ChevronDown, Search } from 'lucide-react';
import { cva, type VariantProps } from 'class-variance-authority';
import { useTranslations } from 'next-intl';

import { cn } from '@/lib/cn';

import { Button } from './button';
import { Input } from './input';

const selectTriggerVariants = cva(['tw-w-full tw-justify-between tw-font-normal'], {
  variants: {
    size: {
      sm: 'tw-py-2 tw-text-sm tw-h-9',
      md: 'tw-py-2.5 tw-text-base tw-h-10',
      lg: 'tw-py-3 tw-text-lg tw-h-11',
    },
    error: {
      true: 'tw-border-red-500',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

const iconVariants = cva('tw-ml-2 tw-shrink-0', {
  variants: {
    size: {
      sm: 'tw-h-4 tw-w-4',
      md: 'tw-h-5 tw-w-5',
      lg: 'tw-h-6 tw-w-6',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

const optionVariants = cva(
  'tw-relative tw-w-full tw-cursor-pointer !tw-justify-start tw-text-left tw-font-normal',
  {
    variants: {
      size: {
        sm: 'tw-py-2 tw-text-sm',
        md: 'tw-py-2.5 tw-text-base',
        lg: 'tw-py-3 tw-text-lg',
      },
      selected: {
        true: 'tw-bg-gray-200 tw-text-primary hover:!tw-bg-gray-200',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  },
);

export interface SelectOption {
  value: any;
  label: string;
}

interface SelectProps
  extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'value' | 'onChange' | 'size'>,
    Omit<VariantProps<typeof selectTriggerVariants>, 'error'> {
  options: SelectOption[];
  placeholder?: string;
  error?: string;
  className?: string;
  searchPlaceholder?: string;
  value?: SelectOption['value'];
  onChange?: (value: SelectOption['value']) => void;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      options,
      placeholder,
      error,
      className,
      searchPlaceholder,
      value,
      onChange = () => {},
      size,
      ...props
    },
    ref,
  ) => {
    const t = useTranslations();

    const [isOpen, setIsOpen] = useState(false);
    const [search, setSearch] = useState('');

    const selectedOption = options.find((option) => option.value === value);

    const filteredOptions = options.filter((option) =>
      option.label.toLowerCase().includes(search.toLowerCase()),
    );

    const handleSelect = useCallback(
      (option: SelectOption) => {
        onChange?.(option.value);
        setIsOpen(false);
        setSearch('');
      },
      [onChange],
    );

    return (
      <div className="tw-w-full">
        <div className="tw-relative">
          <Button
            type="button"
            variant="outline"
            role="combobox"
            aria-expanded={isOpen}
            className={cn(selectTriggerVariants({ size, error: !!error, className }))}
            onClick={() => setIsOpen(!isOpen)}
          >
            {selectedOption ? (
              selectedOption.label
            ) : (
              <span className="tw-text-gray-500">{placeholder}</span>
            )}
            <ChevronDown className={iconVariants({ size })} />
          </Button>
          {isOpen && (
            <div className="tw-absolute tw-z-50 tw-mt-1 tw-max-h-60 tw-w-full tw-overflow-auto tw-rounded-lg tw-border tw-border-gray-200 tw-bg-white tw-py-1 tw-shadow-lg">
              <div className="tw-sticky tw-top-0 tw-z-10 tw-bg-white tw-px-2 tw-pb-2">
                <Input
                  placeholder={searchPlaceholder || t('common.search')}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  startIcon={<Search />}
                  size={size}
                  className="tw-border-gray-200"
                />
              </div>
              {filteredOptions.length > 0 ? (
                filteredOptions.map((option) => (
                  <Button
                    key={String(option.value)}
                    type="button"
                    variant="ghost"
                    role="option"
                    onClick={() => handleSelect(option)}
                    className={optionVariants({
                      size,
                      selected: option.value === value,
                    })}
                  >
                    <Check
                      className={cn(
                        iconVariants({ size }),
                        'tw-mr-2 tw-text-primary',
                        option.value === value ? 'tw-opacity-100' : 'tw-opacity-0',
                      )}
                    />
                    {option.label}
                  </Button>
                ))
              ) : (
                <p
                  className={cn(
                    'tw-px-2 tw-py-4 tw-text-center tw-text-gray-500',
                    size === 'sm' && 'tw-text-sm',
                    size === 'lg' && 'tw-text-lg',
                  )}
                >
                  Sonuç bulunamadı.
                </p>
              )}
            </div>
          )}
        </div>
        {error && <p className="tw-mt-1 tw-text-sm tw-text-red-500">{error}</p>}

        {/* Hidden select for form submission */}
        <select
          ref={ref}
          className="tw-hidden"
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option key={String(option.value)} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    );
  },
);

Select.displayName = 'Select';
