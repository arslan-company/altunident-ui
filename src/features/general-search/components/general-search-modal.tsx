'use client';

import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';

import { useGeneralSearchStore } from '../store/use-general-search-store';

import { GeneralSearch } from './general-search';

export function GeneralSearchModal() {
  const { isOpen, close } = useGeneralSearchStore();

  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog onClose={close} className="tw-relative tw-z-50">
        {/* Backdrop */}
        <Transition.Child
          as={Fragment}
          enter="tw-ease-out tw-duration-300"
          enterFrom="tw-opacity-0"
          enterTo="tw-opacity-100"
          leave="tw-ease-in tw-duration-200"
          leaveFrom="tw-opacity-100"
          leaveTo="tw-opacity-0"
        >
          <div
            className="tw-fixed tw-inset-0 tw-bg-black/30 tw-backdrop-blur-lg"
            aria-hidden="true"
          />
        </Transition.Child>

        {/* Modal */}
        <div className="tw-fixed tw-inset-0">
          <div className="tw-flex tw-min-h-full tw-items-start tw-justify-center tw-p-4 tw-pt-16">
            <Transition.Child
              as={Fragment}
              enter="tw-ease-out tw-duration-300"
              enterFrom="tw-opacity-0 tw-scale-95"
              enterTo="tw-opacity-100 tw-scale-100"
              leave="tw-ease-in tw-duration-200"
              leaveFrom="tw-opacity-100 tw-scale-100"
              leaveTo="tw-opacity-0 tw-scale-95"
            >
              <Dialog.Panel className="tw-w-full tw-max-w-3xl tw-transform">
                <GeneralSearch />
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
