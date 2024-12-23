import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

import locales from '@/constants/locales';

export default function useLocale() {
  const { i18n } = useTranslation();
  const { locale: localePath } = useRouter();

  const currentLocale = locales.find((locale) => locale.language === localePath);

  return {
    currentLanguage: i18n.language,
    /**
     * You should use this value when you send a request to the `api.atakent`
     * api with the language parameter. Otherwise, if your current
     * language is `tr` and you try to send a request to an endpoint with
     * `tr` language, the data will be wrong. Because there is no check in
     * `tr` language in the backend.
    */
    currentLanguageQuery: i18n.language === 'tr' ? undefined : i18n.language,
    locales,
    currentLocale,
  };
}
