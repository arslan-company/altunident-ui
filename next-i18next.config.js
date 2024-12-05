const path = require('path');

module.exports = {
  i18n: {
    locales: ['tr', 'en', 'de', 'fr', 'ru', 'ar'],
    defaultLocale: 'tr',
    localePath: path.resolve(__dirname, './public/locales'),
    reloadOnPrerender: false,
  },
};
