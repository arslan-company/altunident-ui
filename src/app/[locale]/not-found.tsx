'use server';

import Link from 'next/link';
import { getTranslations } from 'next-intl/server';

import { Button } from '@/components/base/button';
import Footer from '@/components/shared/footer';
import Navbar from '@/components/shared/navbar';

export default async function NotFound() {
  const t = await getTranslations();

  return (
    <>
      <Navbar />
      <main className="tw-min-h-screen tw-flex tw-items-center tw-justify-center tw-py-16 tw-bg-gray-50">
        <div className="container tw-mx-auto tw-px-4">
          <div className="tw-text-center tw-space-y-8">
            {/* 404 Görseli */}
            <div className="tw-relative tw-inline-block">
              <span className="tw-text-[180px] md:tw-text-[220px] tw-font-bold tw-text-primary-600/10">
                404
              </span>
            </div>

            {/* Mesaj */}
            <div className="tw-space-y-4 tw-max-w-2xl tw-mx-auto">
              <h1 className="tw-text-2xl md:tw-text-3xl tw-font-bold tw-text-gray-800">
                {t('common.page_not_found')}
              </h1>
              <p className="tw-text-gray-600 tw-text-lg">
                {t('common.page_not_found_description')}
              </p>
            </div>

            {/* Butonlar */}
            <div className="tw-flex tw-flex-col sm:tw-flex-row tw-gap-4 tw-justify-center tw-items-center tw-mt-8">
              <Link href="/">
                <Button>{t('common.back_to_home')}</Button>
              </Link>
            </div>

            {/* İletişim Linki */}
            <p className="tw-text-gray-500 tw-mt-8">
              {t('common.do_you_need_help')}{' '}
              <Link href="/contact" className="tw-text-primary hover:tw-underline">
                {t('common.get_in_touch_with_us')}
              </Link>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
