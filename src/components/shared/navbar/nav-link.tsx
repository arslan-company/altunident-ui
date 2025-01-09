'use client';

import { Fragment } from 'react';
import Link from 'next/link';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';

interface NavLinkProps {
  href: string;
  active?: boolean;
  children: React.ReactNode;
  dropdown?: {
    items: {
      href: string;
      label: string;
    }[];
  };
}

export function NavLink({ href, active, children, dropdown }: NavLinkProps) {
  if (dropdown) {
    return (
      <Menu as="div" className="tw-relative">
        <Menu.Button
          className={`tw-flex tw-items-center tw-px-3 tw-py-2 tw-text-sm tw-gap-1 tw-bg-transparent tw-font-semibold ${
            active
              ? 'tw-text-primary'
              : 'tw-text-gray-600 hover:tw-text-primary tw-transition-colors tw-duration-200'
          }`}
        >
          {children}
          <ChevronDownIcon className="tw-w-4 tw-h-4" />
        </Menu.Button>
        <Transition
          as={Fragment}
          enter="tw-transition tw-duration-100 tw-ease-out"
          enterFrom="tw-transform tw-scale-95 tw-opacity-0"
          enterTo="tw-transform tw-scale-100 tw-opacity-100"
          leave="tw-transition tw-duration-75 tw-ease-in"
          leaveFrom="tw-transform tw-scale-100 tw-opacity-100"
          leaveTo="tw-transform tw-scale-95 tw-opacity-0"
        >
          <Menu.Items className="tw-absolute tw-left-0 tw-mt-1 tw-w-48 tw-origin-top-left tw-rounded-md tw-bg-white tw-shadow-lg tw-ring-1 tw-ring-black tw-ring-opacity-5 tw-focus:outline-none">
            <div className="tw-py-1">
              {dropdown.items.map((item) => (
                <Menu.Item key={item.href}>
                  {({ active: _active }) => (
                    <Link
                      href={item.href}
                      className={`${
                        _active ? 'tw-bg-gray-50 tw-text-primary' : 'tw-text-gray-700'
                      } tw-block tw-px-4 tw-py-2 tw-text-sm tw-font-semibold`}
                    >
                      {item.label}
                    </Link>
                  )}
                </Menu.Item>
              ))}
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    );
  }

  return (
    <Link
      href={href}
      className={`tw-px-3 tw-py-2 tw-text-sm tw-font-semibold ${
        active
          ? 'tw-text-primary tw-font-medium'
          : 'tw-text-gray-600 hover:tw-text-primary tw-transition-colors tw-duration-200'
      }`}
    >
      {children}
    </Link>
  );
}

export function MobileNavLink({ href, active, children, dropdown }: NavLinkProps) {
  if (dropdown) {
    return (
      <Menu as="div" className="tw-relative">
        {({ open }) => (
          <>
            <Menu.Button
              className={`tw-flex tw-items-center tw-justify-between tw-w-full tw-px-3 tw-py-2 tw-rounded-md tw-text-base ${
                active
                  ? 'tw-bg-primary/5 tw-text-primary tw-font-medium'
                  : 'tw-text-gray-600 hover:tw-bg-gray-50 hover:tw-text-primary'
              }`}
            >
              {children}
              <ChevronDownIcon
                className={`tw-w-5 tw-h-5 tw-transition-transform ${open ? 'tw-rotate-180' : ''}`}
              />
            </Menu.Button>
            <Transition
              enter="tw-transition tw-duration-100 tw-ease-out"
              enterFrom="tw-transform tw-scale-95 tw-opacity-0"
              enterTo="tw-transform tw-scale-100 tw-opacity-100"
              leave="tw-transition tw-duration-75 tw-ease-in"
              leaveFrom="tw-transform tw-scale-100 tw-opacity-100"
              leaveTo="tw-transform tw-scale-95 tw-opacity-0"
            >
              <Menu.Items className="tw-px-3 tw-py-1">
                {dropdown.items.map((item) => (
                  <Menu.Item key={item.href}>
                    {({ active: _active }) => (
                      <Link
                        href={item.href}
                        className={`${
                          _active ? 'tw-text-primary' : 'tw-text-gray-600'
                        } tw-block tw-px-3 tw-py-2 tw-text-sm tw-rounded-md hover:tw-bg-gray-50`}
                      >
                        {item.label}
                      </Link>
                    )}
                  </Menu.Item>
                ))}
              </Menu.Items>
            </Transition>
          </>
        )}
      </Menu>
    );
  }

  return (
    <Link
      href={href}
      className={`tw-block tw-px-3 tw-py-2 tw-rounded-md tw-text-base ${
        active
          ? 'tw-bg-primary/5 tw-text-primary tw-font-medium'
          : 'tw-text-gray-600 hover:tw-bg-gray-50 hover:tw-text-primary'
      }`}
    >
      {children}
    </Link>
  );
}
