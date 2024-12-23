import Link from 'next/link';

import Box from '@/components/base/Box';
import Button from '@/components/base/Button';

import {
  BlogCardBody,
  BlogCardContainer,
  BlogCardHead,
  BlogCardImage,
} from './root';
import { useFile } from '@/hooks/fetch/useFiles';
import isValidFileName from '@/utils/isValidFileName';

/**
 * @param {{
 *  image: string;
 *  title: string;
 *  date: string;
 *  blogId: string | number;
 * }& React.ComponentProps<typeof BlogCardContainer>} props
*/
export default function BlogCard({
  image,
  title,
  date,
  blogId,
  ...props
}) {
  const imageResponse = useFile({
    params: {
      fileName: image,
    },
    options: {
      enabled: !!image && isValidFileName(image, ['.png', '.jpg', '.jpeg']),
    },
  });

  return (
    <BlogCardContainer {...props}>
      <BlogCardHead>
        <Box
          cssx={({ colors }) => ({
            position: 'absolute',
            top: 0,
            left: 0,
            backgroundColor: colors.base.primary.main,
            padding: '0.4rem 1.2rem',
            color: 'white',
          })}
        >
          {date}
        </Box>
        {imageResponse.data && (
          <BlogCardImage
            src={imageResponse.data}
            alt=""
            width={680}
            height={440}
            quality={60}
          />
        )}
      </BlogCardHead>
      <BlogCardBody>
        <Box
          href={`/corporate/corporate-events/${blogId}`}
          as={Link}
          cssx={({ typography, colors }) => ({
            display: '-webkit-box',
            '-webkit-line-clamp': '2',
            '-webkit-box-orient': 'vertical',
            width: '100%',
            overflow: 'hidden',
            color: 'black',
            fontSize: typography.h5.fontSize,
            marginBottom: '1rem',
            ':hover': {
              color: colors.base.primary.main,
            },
          })}
        >
          {title}
        </Box>
        <Button href={`/corporate/corporate-events/${blogId}`} as={Link}>
          Yazıya Git
        </Button>
      </BlogCardBody>
    </BlogCardContainer>
  );
}
