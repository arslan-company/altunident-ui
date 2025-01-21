const servicesPathByLocale: Record<string, string> = {
  de: '/dienstleistungen',
  en: '/services',
  fr: '/services',
  tr: '/hizmetlerimiz',
};

export default function getServicesPath(locale: string) {
  return servicesPathByLocale[locale] || '/services';
} 