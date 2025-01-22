const pathMappings = {
  services: {
    de: '/dienstleistungen',
    en: '/services',
    fr: '/services',
    tr: '/hizmetlerimiz',
  },
  doctors: {
    de: '/aerzte',
    en: '/doctors',
    fr: '/medecins',
    tr: '/doktorlarimiz',
  },
  departments: {
    de: '/abteilungen',
    en: '/departments',
    fr: '/departements',
    tr: '/bolumlerimiz',
  },
  contact: {
    de: '/kontakt',
    en: '/contact',
    fr: '/contact',
    tr: '/iletisim',
  },
  corporate: {
    de: '/unternehmen',
    en: '/corporate',
    fr: '/entreprise',
    tr: '/kurumsal',
  },
  blog: {
    de: '/blog',
    en: '/blog',
    fr: '/blog',
    tr: '/blog',
  },
} as const;

export type PathKey = keyof typeof pathMappings;
export type LocaleKey = keyof (typeof pathMappings)[PathKey];

// Get the base path for a section (e.g., 'services' -> '/services')
export const getBasePath = (key: PathKey) => {
  return pathMappings[key].en;
};

// Get the section key from a localized path (e.g., '/dienstleistungen' -> 'services')
export const getSectionFromPath = (path: string): PathKey | null => {
  const pathWithoutSlash = path.startsWith('/') ? path.substring(1) : path;
  const entry = Object.entries(pathMappings).find(([, value]) =>
    Object.values(value).some((p) => p.substring(1) === pathWithoutSlash),
  );
  return entry ? (entry[0] as PathKey) : null;
};

export const getLocalizedPath = (path: string, locale: string) => {
  // Validate locale
  const validLocale = (locale as LocaleKey) || 'tr';

  // Find if the path matches any of our path mappings
  const pathEntry = Object.entries(pathMappings).find(([, value]) =>
    Object.values(value).some((p) => p.substring(1) === path),
  );

  if (pathEntry) {
    const [key] = pathEntry;
    return pathMappings[key as PathKey][validLocale as LocaleKey];
  }

  return `/${path}`;
};

export default pathMappings;
