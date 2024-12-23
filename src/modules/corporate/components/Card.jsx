import { createElement, useTheme, css } from '@tiger-ui/react';
import Image from 'next/image';
import Link from 'next/link';

import Box from '@/components/base/Box';

const Card = createElement('div')({
  style: ({ theme: { colors, transitions } }) => ({
    backgroundColor: '#525252',
    transition: `all ${transitions.duration.mid} ${transitions.easing.ease}`,
    ':hover': {
      backgroundColor: colors.base.primary.main,
      '& img': {
        transform: 'scale(1.05)',
        opacity: 1,
      },
    },
  }),
  Children: ({
    image,
    href,
    title,
  }) => {
    const { transitions } = useTheme();

    return (
      <Link href={href}>
        <Box
          cssx={{
            overflow: 'hidden',
          }}
        >
          <Image
            src={image}
            alt="head"
            width={510}
            height={340}
            quality={60}
            className={css({
              transition: `all ${transitions.duration.mid} ${transitions.easing.ease}`,
              opacity: 0.9,
            })}
          />
        </Box>
        <Box>
          <Box
            cssx={({ typography }) => ({
              fontSize: typography.h5.fontSize,
            })}
            color="#fff"
            px={2}
            py={0.8}
          >
            {title}
          </Box>
        </Box>
      </Link>
    );
  },
});

export default Card;
