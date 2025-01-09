'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import React from 'react';

import slugify from '@/utils/slugify';

/**
 * ### CLIENT SIDE COMPONENT
 */
export default function DoctorName({
  name,
  id,
  href,
}: {
  name: string;
  id?: string | number;
  href?: string;
}) {
  const { hospitalSlug } = useParams();

  const defaultHref = `${hospitalSlug ? `/${hospitalSlug}` : ''}/doctors/${id}/${slugify(name)}`;

  return (
    <Link
      href={href || defaultHref}
      className="tw-text-xl tw-text-left tw-font-bold tw-text-gray-900 tw-line-clamp-1 tw-transition-colors hover:tw-text-primary"
    >
      {name}
    </Link>
  );
}
