'use client';

import Link from 'next/link';

import { useHospital } from '@/features/hospitals';

import socialMediaLinks from '@/constants/social-media-links';
import generalInfo from '@/constants/general-info';

export default function TopHeader() {
  const { currentHospital } = useHospital();

  return (
    <div className="tw-bg-gray-100 tw-border-b tw-border-gray-100">
      <div className="tw-container tw-mx-auto">
        <div className="tw-flex tw-justify-end tw-items-center tw-h-10 tw-text-sm">
          {/* Right Side - Contact Information and Social Media */}
          <div className="tw-flex tw-items-center tw-space-x-6 tw-w-full md:tw-w-auto tw-justify-between md:tw-justify-end">
            {/* Contact Information */}
            <div className="tw-flex tw-items-center tw-space-x-6">
              <Link
                href={`tel:${currentHospital?.contact_phone.replace(/\s+/g, '') || generalInfo.phoneNumber.replace(/\s+/g, '')}`}
                className="tw-flex tw-items-center tw-space-x-2 tw-text-gray-600 hover:tw-text-primary"
              >
                <i className="bx bxs-phone tw-text-primary" />
                <span>
                  {currentHospital ? currentHospital?.contact_phone : generalInfo.phoneNumber}
                </span>
              </Link>
              <Link
                href={`mailto:${currentHospital?.contact_email || generalInfo.email}`}
                className="tw-hidden sm:tw-flex tw-items-center tw-space-x-2 tw-text-gray-600 hover:tw-text-primary"
              >
                <i className="bx bxs-envelope tw-text-primary" />
                <span>{currentHospital ? currentHospital?.contact_email : generalInfo.email}</span>
              </Link>
            </div>

            {/* Social Media Icons */}
            <div className="tw-flex tw-items-center tw-space-x-4">
              {socialMediaLinks.map((social) => (
                <Link
                  key={social.id}
                  href={social.href}
                  className="tw-text-gray-400 hover:tw-text-primary tw-transition-colors"
                  target="_blank"
                  rel="noreferrer"
                >
                  <i className={`bx ${social.icon} tw-text-lg`} />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
