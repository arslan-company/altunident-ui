import websiteConfig from '@/config/website.config';

const translatedDaysOfWeek: Record<
  (typeof websiteConfig.locales)[number],
  Record<number, string>
> = {
  tr: {
    0: 'Pazartesi',
    1: 'Salı',
    2: 'Çarşamba',
    3: 'Perşembe',
    4: 'Cuma',
    5: 'Cumartesi',
    6: 'Pazar',
  },
  en: {
    0: 'Monday',
    1: 'Tuesday',
    2: 'Wednesday',
    3: 'Thursday',
    4: 'Friday',
    5: 'Saturday',
    6: 'Sunday',
  },
  de: {
    0: 'Montag',
    1: 'Dienstag',
    2: 'Mittwoch',
    3: 'Donnerstag',
    4: 'Freitag',
    5: 'Samstag',
    6: 'Sonntag',
  },
  fr: {
    0: 'Lundi',
    1: 'Mardi',
    2: 'Mercredi',
    3: 'Jeudi',
    4: 'Vendredi',
    5: 'Samedi',
    6: 'Dimanche',
  },
};

export default translatedDaysOfWeek;
