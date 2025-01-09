type MediaType = 'image' | 'video' | 'unknown';

export const filenameType = (filename: string | undefined): MediaType => {
  if (typeof filename !== 'string' || !filename) {
    return 'unknown';
  }

  const extension = filename.split('.').pop()?.toLowerCase();

  if (['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(extension || '')) {
    return 'image';
  }
  if (['mp4', 'webm', 'ogg'].includes(extension || '')) {
    return 'video';
  }

  return 'unknown';
};
