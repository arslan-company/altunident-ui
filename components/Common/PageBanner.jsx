import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

function PageBanner({
  pageTitle,
  homePageUrl,
  homePageText,
  parentPageUrl,
  parentPageText,
  activePageText,
  imageSrc = '/img/page-banner-bg1.jpg',
}) {
  return (
    <div className="page-title-area">
      {imageSrc && (
        <div className="bg-image">
          <Image
            src={imageSrc}
            alt={pageTitle}
            fill
            quality={60}
          />
        </div>
      )}
      <div className="page-title-content">
        <h1>{pageTitle}</h1>
        <ul>
          <li>
            <Link href={homePageUrl}>{homePageText}</Link>
          </li>
          {parentPageText && (
            <li>
              <Link href={parentPageUrl}>{parentPageText}</Link>
            </li>
          )}
          <li className="active">{activePageText}</li>
        </ul>
      </div>
    </div>
  );
}

export default PageBanner;
