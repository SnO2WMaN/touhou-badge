const path = require('path');

module.exports = {
  i18n: {
    defaultNS: 'common',
    defaultLocale: 'jp',
    locales: ['jp'],
    serializeConfig: false,
    localePath: path.resolve('./public/locales'),
  },
};
