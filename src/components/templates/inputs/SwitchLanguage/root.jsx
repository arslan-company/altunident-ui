import { createElement } from '@tiger-ui/react';
import Image from 'next/image';

// eslint-disable-next-line import/prefer-default-export
export const FlagIcon = createElement(Image)({
  style: {
    width: '20px',
    objectFit: 'cover',
    marginRight: '7px',
  },
});
