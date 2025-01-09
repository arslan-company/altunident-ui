import { cn } from '@/lib/cn';

interface HTMLContentProps {
  content: string;
  className?: string;
}

function HTMLContent({ content, className }: HTMLContentProps) {
  return (
    <div
      className={cn('tw-w-full tw-h-full', className)}
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{
        __html: content,
      }}
    />
  );
}

export default HTMLContent;
