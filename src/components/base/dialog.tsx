import { Dialog as HeadlessDialog } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import React from 'react';

import { Button } from './button';

export interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  maxWidth?: string;
}

export default function Dialog({
  isOpen,
  onClose,
  title,
  children,
  maxWidth = 'tw-max-w-md',
}: DialogProps) {
  return (
    <HeadlessDialog open={isOpen} onClose={onClose} className="tw-relative tw-z-50">
      <div className="tw-fixed tw-inset-0 tw-bg-black/30 tw-backdrop-blur-lg" aria-hidden="true" />

      <div className="tw-fixed tw-inset-0 tw-flex tw-items-center tw-justify-center tw-p-4">
        <HeadlessDialog.Panel
          className={`tw-w-full ${maxWidth} tw-transform tw-overflow-hidden tw-rounded-2xl tw-bg-white tw-p-6 tw-text-left tw-align-middle tw-shadow-xl tw-transition-all`}
        >
          <div className="tw-flex tw-items-center tw-justify-between">
            {title && (
              <HeadlessDialog.Title className="tw-text-lg tw-font-medium tw-leading-6 tw-text-gray-900">
                {title}
              </HeadlessDialog.Title>
            )}
            <Button
              onClick={onClose}
              variant="secondary"
              size="iconOnly"
              className="tw-p-1"
              rounded="full"
            >
              <XMarkIcon className="tw-h-5 tw-w-5" />
            </Button>
          </div>

          <div className="tw-mt-4">{children}</div>
        </HeadlessDialog.Panel>
      </div>
    </HeadlessDialog>
  );
}
