'use client';

import Image from 'next/image';

import { cn } from '@/lib/cn';

export type VideoElementProps = React.DetailedHTMLProps<
  React.VideoHTMLAttributes<HTMLVideoElement>,
  HTMLVideoElement
>;

export interface ImageProps {
  /**
   * default: false
   */
  fill?: boolean;
  /**
   * default: 400
   */
  width?: number;
  /**
   * default: 400
   */
  height?: number;
  /**
   * default: 75
   */
  quality?: number;
  /**
   * default: false
   */
  priority?: boolean;
  /**
   * default: `'(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'`
   */
  sizes?: string;
  className?: string;
  style?: React.CSSProperties;
  alt?: string;
  /**
   * only use in client components
   */
  onLoadingComplete?: () => void;
}

export interface MediaProps {
  readonly src: any;
  readonly className?: string;
  readonly videoProps?: Omit<VideoElementProps, 'src' | 'className'>;
  readonly imageProps?: ImageProps;
  /**
   * default: `'image'`
   */
  readonly element?: 'image' | 'video';
}

/**
 * This component optimizes image and video files.
 */
export function Media({
  className,
  src,
  videoProps,
  imageProps = {},
  element = 'image',
}: MediaProps) {
  switch (element) {
    case 'image':
      return (
        <Image
          src={src}
          alt={imageProps.alt || ''}
          fill={imageProps.fill}
          width={!imageProps.fill ? imageProps.width || 400 : undefined}
          height={!imageProps.fill ? imageProps.height || 400 : undefined}
          quality={imageProps.quality || 75}
          priority={imageProps.priority}
          sizes={imageProps.sizes || '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'}
          className={cn(imageProps.fill && 'tw-position-absolute', className)}
          style={imageProps.style}
          onLoadingComplete={imageProps.onLoadingComplete || undefined}
        />
      );
    case 'video':
      return (
        <video {...videoProps} src={src} className={cn('tw-w-full tw-h-auto', className)}>
          <track kind="captions" />
        </video>
      );
    default:
      return null;
  }
}
