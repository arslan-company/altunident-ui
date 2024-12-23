import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import InlineSVG from 'react-inlinesvg';

import useLocale from '@/hooks/useLocale';

import Box from '@/components/base/Box';
import Button from '@/components/base/Button';

import { Dropdown, DropdownLink } from '@/components/templates/navigation/Dropdown';

import useDom from '@/hooks/useDom';

import { FlagIcon } from './root';

function SwitchLanguage() {
  const { asPath } = useRouter();
  const { currentLanguage, locales } = useLocale();
  const { domLoaded } = useDom();

  const [open, setOpen] = useState(false);

  return (
    <Box>
      <Button
        variant="text"
        size="iconOnly"
        onClick={() => setOpen((prev) => !prev)}
      >
        <FlagIcon
          width={20}
          height={20}
          quality={60}
          src={`/icons/languages/${currentLanguage}.png`}
          alt={`${currentLanguage} logo`}
        />
        {currentLanguage?.toUpperCase()}
        <InlineSVG
          src="/icons/arrow_down.svg"
          width={25}
          height={25}
          fill="white"
        />
      </Button>
      <Dropdown open={open} cssx={{ maxWidth: '100px' }}>
        {locales.map((item) => (
          <DropdownLink
            href="/"
            cssx={{ padding: 0 }}
            passHref
            key={item.id}
          >
            {domLoaded && (
              <Link
                href={asPath}
                locale={item.language}
                style={{
                  display: 'inline-block',
                  width: '100%',
                  color: 'black',
                  padding: '0.7rem 1rem',
                }}
                onClick={() => setOpen(false)}
              >
                <FlagIcon
                  width={20}
                  height={20}
                  quality={60}
                  src={`/icons/languages/${item.language}.png`}
                  alt={`atakent ${item.text.toLowerCase()} icon`}
                />
                <Box as="span">{item.text}</Box>
              </Link>
            )}
          </DropdownLink>
        ))}
      </Dropdown>
    </Box>
  );
}

export default SwitchLanguage;
