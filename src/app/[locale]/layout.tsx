import { Inter } from 'next/font/google';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, unstable_setRequestLocale } from 'next-intl/server';

import websiteConfig from '@/config/website.config';
import HospitalStoreProvider from '@/features/hospitals/providers/hospital-store-provider';
import { routing } from '@/i18n/routing';
import ModalsProvider from '@/providers/modals-provider';
import ReactQueryProvider from '@/providers/react-query-provider';
import StyleIntegrationsProvider from '@/providers/style-integrations-provider';

import '../globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
});

// Generate all possible locale paths at build time
export function generateStaticParams() {
  return websiteConfig.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  const messages = await getMessages();

  unstable_setRequestLocale(locale);

  return (
    <html lang={locale} suppressHydrationWarning className={inter.className}>
      <body>
        <NextIntlClientProvider messages={messages} locale={locale}>
          <ReactQueryProvider>
            <StyleIntegrationsProvider>
              <HospitalStoreProvider>
                <ModalsProvider>{children}</ModalsProvider>
              </HospitalStoreProvider>
            </StyleIntegrationsProvider>
          </ReactQueryProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
