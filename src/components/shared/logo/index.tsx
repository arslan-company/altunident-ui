'use client';

import { useTranslations } from 'next-intl';
import React from 'react';

import { Media } from '@/features/files';
import { cn } from '@/lib/cn';

const logoVariants = {
  primary: '/img/logos/logo-primary.svg',
  white: '/img/logos/logo-white.svg',
};

interface LogoProps {
  className?: string;
  variant?: keyof typeof logoVariants;
}

export default function Logo({ className, variant = 'primary' }: LogoProps) {
  const t = useTranslations();

  return (
    <Media
      src={logoVariants[variant]}
      element="image"
      imageProps={{ alt: `${t('site.name')} logo`, width: 120, height: 24 }}
      className={cn('tw-w-auto tw-h-14', className)}
    />
  );
}
