import { createElement } from '@tiger-ui/react';
import Image from 'next/image';

export const BlogCardContainer = createElement('div')({
  style: {
    width: '100%',
    boxShadow: '0 0 10px rgba(0,0,0,.1)',
    xs: {
      marginBottom: '2rem',
    },
    lg: {
      marginBottom: '1rem',
    },
  },
});

export const BlogCardHead = createElement('div')({
  style: {
    aspectRatio: '680 / 440',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
});

export const BlogCardImage = createElement(Image)({
  style: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
});

export const BlogCardBody = createElement('div')({
  style: {
    padding: '2rem 1.5rem',
    width: '100%',
  },
});
