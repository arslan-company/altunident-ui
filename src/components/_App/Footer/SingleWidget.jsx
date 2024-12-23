import React from 'react';
import Link from 'next/link';
import { useTheme } from '@tiger-ui/react';

import Box from '@/components/base/Box';

function SingleWidget({ items, title }) {
  const { colors } = useTheme();

  return (
    <Box
      className="single-widget"
      data-aos="fade-in"
      data-aos-delay="400"
      data-aos-duration="1200"
    >
      <Box
        as="h3"
        cssx={{
          marginBottom: '30px !important',
          color: `${colors.base.primary.main} !important`,
          display: 'inline-block !important',
          lg: {
            display: 'block !important',
            textAlign: 'center !important',
          },
        }}
      >
        {title}
      </Box>
      <ul>
        {items.map((item) => (
          <Box
            as="li"
            cssx={{
              lg: {
                textAlign: 'center !important',
              },
            }}
            key={item.id}
          >
            <Link href={item?.href}>
              {item.title}
            </Link>
          </Box>
        ))}
      </ul>
    </Box>
  );
}

export default SingleWidget;
