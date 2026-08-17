// Name pools used by the remitter-origin bias probe (see paper's finding on
// name-driven "foreign origin" misclassification). Categories intentionally
// mirror the paper's grouping: English, non-English Latin-script (ES/FR),
// and non-Latin script (AR/HI/ZH), each with a Latin-transliterated form.

const ENGLISH = [
  'James Whitfield', 'Sarah Connelly', 'Michael Turner', 'Emily Sanders',
  'Robert Hayes', 'Laura Bennett', 'David Foster', 'Jessica Cole',
  'William Parker', 'Amanda Reed',
];

const LATIN_NON_ENGLISH = [
  { es_fr: 'María García', lang: 'ES' },
  { es_fr: 'Jean-Luc Dubois', lang: 'FR' },
  { es_fr: 'Carmen Ibáñez', lang: 'ES' },
  { es_fr: 'François Moreau', lang: 'FR' },
  { es_fr: 'Alejandro Fuentes', lang: 'ES' },
  { es_fr: 'Camille Lefèvre', lang: 'FR' },
  { es_fr: 'Isabel Navarro', lang: 'ES' },
  { es_fr: 'Étienne Girard', lang: 'FR' },
];

// Each entry pairs the native-script rendering with a Latin transliteration,
// so the probe can compare native-script vs. transliterated presentation.
const NON_LATIN = [
  { native: 'محمد الفارسي', translit: 'Mohammed Al-Farsi', lang: 'AR' },
  { native: 'فاطمة الزهراني', translit: 'Fatima Al-Zahrani', lang: 'AR' },
  { native: 'प्रिया शर्मा', translit: 'Priya Sharma', lang: 'HI' },
  { native: 'राजेश कुमार', translit: 'Rajesh Kumar', lang: 'HI' },
  { native: '张伟', translit: 'Wei Zhang', lang: 'ZH' },
  { native: '李娜', translit: 'Na Li', lang: 'ZH' },
];

module.exports = { ENGLISH, LATIN_NON_ENGLISH, NON_LATIN };
