import { ChevronDownIcon } from '@heroicons/react/24/outline';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useLocale } from 'next-intl';
import { tv } from 'tailwind-variants';

import { Button } from '@/components/base/button';

const dropdownStyles = tv({
  slots: {
    content: [
      'tw-min-w-[140px] tw-bg-white tw-rounded-md tw-p-1 tw-shadow-lg tw-border tw-border-gray-200',
      'tw-origin-top-right',
      'tw-relative',
      'data-[state=open]:tw-animate-contentShow',
      'data-[state=closed]:tw-animate-contentHide',
    ],
    item: [
      'tw-flex tw-items-center tw-gap-2 tw-w-full tw-px-3 tw-py-2',
      'tw-text-sm tw-text-gray-700 tw-rounded tw-transition-colors',
      'tw-outline-none',
      'hover:tw-bg-gray-100',
      'focus:tw-bg-gray-100',
      'tw-select-none',
    ],
  },
});

const { content, item } = dropdownStyles();

const languages = [
  {
    id: 1,
    label: 'TÜRKÇE',
    locale: 'tr',
  },
  {
    id: 2,
    label: 'ENGLISH',
    locale: 'en',
  },
  {
    id: 3,
    label: 'DEUTSCH',
    locale: 'de',
  },
  {
    id: 4,
    label: 'FRANÇAIS',
    locale: 'fr',
  },
  {
    id: 5,
    label: 'РУССКИЙ',
    locale: 'ru',
  },
  {
    id: 6,
    label: 'عربي',
    locale: 'ar',
  },
] as const;

export function SwitchLanguage() {
  const locale = useLocale();
  const pathname = usePathname();

  const pathnameWithoutLocale = (() => {
    const path = pathname.replace(`/${locale}`, '');

    return !path ? '/' : path;
  })();

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <Button variant="text" size="sm" className="tw-space-x-2 !tw-px-0">
          <Image
            className="tw-w-4 tw-h-4 tw-object-cover"
            width={20}
            height={20}
            quality={60}
            src={`/icons/languages/${locale}.png`}
            alt={`${locale} flag`}
          />
          <span>{locale.toUpperCase()}</span>
          <ChevronDownIcon className="tw-w-4 tw-h-4" />
        </Button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Content className={content()} sideOffset={5} align="end" alignOffset={0}>
        {languages.map((language) => (
          <DropdownMenu.Item key={language.id} className={item()} asChild>
            <a href={`/${language.locale}${pathnameWithoutLocale}`}>
              <Image
                className="tw-w-4 tw-h-4 tw-object-cover"
                width={20}
                height={20}
                quality={60}
                src={`/icons/languages/${language.locale}.png`}
                alt={`${language.label.toLowerCase()} flag`}
              />
              <span className="tw-font-semibold">{language.label}</span>
            </a>
          </DropdownMenu.Item>
        ))}
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}
