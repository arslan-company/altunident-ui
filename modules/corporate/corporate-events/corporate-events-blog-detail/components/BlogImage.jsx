import Image from 'next/image';
import { createElement } from '@tiger-ui/react';

const BlogImage = createElement(Image)({
  style: {
    width: '100%',
    objectFit: 'cover',
  },
});

export default BlogImage;
