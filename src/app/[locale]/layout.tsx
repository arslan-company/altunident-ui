import { notFound } from 'next/navigation';
import { Inter } from 'next/font/google';

import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';

import { routing } from '@/i18n/routing';

import StyleIntegrationsProvider from '@/providers/style-integrations-provider';
import ReactQueryProvider from '@/providers/react-query-provider';
import ModalsProvider from '@/providers/modals-provider';

import HospitalStoreProvider from '@/features/hospitals/providers/hospital-store-provider';

import '../globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
});

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

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

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
