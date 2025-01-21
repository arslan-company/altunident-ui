'use server';

import fs from 'fs';
import path from 'path';

import React from 'react';

import { Media } from '@/features/files';

/**
 * ### SERVER SIDE COMPONENT
 */
export default async function References() {
  const imagesPath = '/img/references';
  const referencesDir = path.join(process.cwd(), `public${imagesPath}`);
  const files = fs.readdirSync(referencesDir);
  const images = files.filter((file) => /\.(jpg|jpeg|png|gif|webp)$/i.test(file));

  return (
    <div className="tw-grid tw-grid-cols-2 md:tw-grid-cols-3 lg:tw-grid-cols-4 tw-gap-6">
      {images.map((imagePath, index) => (
        <div className="tw-w-full tw-flex tw-items-center tw-justify-center" key={imagePath}>
          <div className="tw-flex tw-items-center tw-justify-center tw-w-[180px] tw-h-[100px]">
            <Media
              src={`${imagesPath}/${imagePath}`}
              element="image"
              className="tw-w-full tw-h-full tw-object-contain"
              imageProps={{
                alt: `Referans ${index + 1}`,
                sizes: '100vw',
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
