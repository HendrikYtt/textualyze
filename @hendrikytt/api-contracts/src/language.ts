//LANGUAGE STUFF
export interface LanguageSelectionOptions {
    label: string;
    value: string;
    countryCode: string;
}

export const autoDetect = 'DETECT';

export const languageOptions: LanguageSelectionOptions[] = [
    { label: 'Auto-Detect', value: autoDetect, countryCode: '-' },
    { label: 'Afrikaans', value: 'af', countryCode: 'za' }, // South Africa
    { label: 'Albanian', value: 'sq', countryCode: 'al' }, // Albania
    { label: 'Amharic', value: 'am', countryCode: 'et' }, // Ethiopia
    { label: 'Arabic', value: 'ar', countryCode: 'sa' }, // Saudi Arabia
    { label: 'Armenian', value: 'hy', countryCode: 'am' }, // Armenia
    { label: 'Assamese', value: 'as', countryCode: 'in' }, // India
    { label: 'Azerbaijani', value: 'az', countryCode: 'az' }, // Azerbaijan
    { label: 'Bashkir', value: 'ba', countryCode: 'ru' }, // Russia
    { label: 'Basque', value: 'eu', countryCode: 'es' }, // Spain
    { label: 'Belarusian', value: 'be', countryCode: 'by' }, // Belarus
    { label: 'Bengali', value: 'bn', countryCode: 'bd' }, // Bangladesh
    { label: 'Bosnian', value: 'bs', countryCode: 'ba' }, // Bosnia and Herzegovina
    { label: 'Breton', value: 'br', countryCode: 'fr' }, // France
    { label: 'Bulgarian', value: 'bg', countryCode: 'bg' }, // Bulgaria
    { label: 'Catalan', value: 'ca', countryCode: 'es' }, // Spain
    { label: 'Chinese', value: 'zh', countryCode: 'cn' }, // China
    { label: 'Croatian', value: 'hr', countryCode: 'hr' }, // Croatia
    { label: 'Czech', value: 'cs', countryCode: 'cz' }, // Czech Republic
    { label: 'Danish', value: 'da', countryCode: 'dk' }, // Denmark
    { label: 'Dutch', value: 'nl', countryCode: 'nl' }, // Netherlands
    { label: 'English', value: 'en', countryCode: 'gb' }, // United Kingdom
    { label: 'Estonian', value: 'et', countryCode: 'ee' }, // Estonia
    { label: 'Faroese', value: 'fo', countryCode: 'fo' }, // Faroe Islands
    { label: 'Finnish', value: 'fi', countryCode: 'fi' }, // Finland
    { label: 'French', value: 'fr', countryCode: 'fr' }, // France
    { label: 'Galician', value: 'gl', countryCode: 'es' }, // Spain
    { label: 'Georgian', value: 'ka', countryCode: 'ge' }, // Georgia
    { label: 'German', value: 'de', countryCode: 'de' }, // Germany
    { label: 'Greek', value: 'el', countryCode: 'gr' }, // Greece
    { label: 'Gujarati', value: 'gu', countryCode: 'in' }, // India
    { label: 'Haitian Creole', value: 'ht', countryCode: 'ht' }, // Haiti
    { label: 'Hausa', value: 'ha', countryCode: 'ng' }, // Nigeria
    { label: 'Hawaiian', value: 'haw', countryCode: 'us' }, // United States
    { label: 'Hebrew', value: 'he', countryCode: 'il' }, // Israel
    { label: 'Hindi', value: 'hi', countryCode: 'in' }, // India
    { label: 'Hungarian', value: 'hu', countryCode: 'hu' }, // Hungary
    { label: 'Icelandic', value: 'is', countryCode: 'is' }, // Iceland
    { label: 'Indonesian', value: 'id', countryCode: 'id' }, // Indonesia
    { label: 'Italian', value: 'it', countryCode: 'it' }, // Italy
    { label: 'Japanese', value: 'ja', countryCode: 'jp' }, // Japan
    { label: 'Javanese', value: 'jw', countryCode: 'id' }, // Indonesia
    { label: 'Kannada', value: 'kn', countryCode: 'in' }, // India
    { label: 'Kazakh', value: 'kk', countryCode: 'kz' }, // Kazakhstan
    { label: 'Khmer', value: 'km', countryCode: 'kh' }, // Cambodia
    { label: 'Korean', value: 'ko', countryCode: 'kr' }, // South Korea
    { label: 'Lao', value: 'lo', countryCode: 'la' }, // Laos
    { label: 'Latin', value: 'la', countryCode: 'va' }, // Vatican
    { label: 'Latvian', value: 'lv', countryCode: 'lv' }, // Latvia
    { label: 'Lingala', value: 'ln', countryCode: 'cd' }, // Democratic Republic of the Congo
    { label: 'Lithuanian', value: 'lt', countryCode: 'lt' }, // Lithuania
    { label: 'Luxembourgish', value: 'lb', countryCode: 'lu' }, // Luxembourg
    { label: 'Macedonian', value: 'mk', countryCode: 'mk' }, // North Macedonia
    { label: 'Malagasy', value: 'mg', countryCode: 'mg' }, // Madagascar
    { label: 'Malay', value: 'ms', countryCode: 'my' }, // Malaysia
    { label: 'Malayalam', value: 'ml', countryCode: 'in' }, // India
    { label: 'Maltese', value: 'mt', countryCode: 'mt' }, // Malta
    { label: 'Maori', value: 'mi', countryCode: 'nz' }, // New Zealand
    { label: 'Marathi', value: 'mr', countryCode: 'in' }, // India
    { label: 'Mongolian', value: 'mn', countryCode: 'mn' }, // Mongolia
    { label: 'Myanmar', value: 'my', countryCode: 'mm' }, // Myanmar
    { label: 'Nepali', value: 'ne', countryCode: 'np' }, // Nepal
    { label: 'Norwegian', value: 'no', countryCode: 'no' }, // Norway
    { label: 'Nynorsk', value: 'nn', countryCode: 'no' }, // Norway
    { label: 'Occitan', value: 'oc', countryCode: 'fr' }, // France
    { label: 'Pashto', value: 'ps', countryCode: 'af' }, // Afghanistan
    { label: 'Persian', value: 'fa', countryCode: 'ir' }, // Iran
    { label: 'Polish', value: 'pl', countryCode: 'pl' }, // Poland
    { label: 'Portuguese', value: 'pt', countryCode: 'pt' }, // Portugal
    { label: 'Punjabi', value: 'pa', countryCode: 'in' }, // India
    { label: 'Romanian', value: 'ro', countryCode: 'ro' }, // Romania
    { label: 'Russian', value: 'ru', countryCode: 'ru' }, // Russia
    { label: 'Sanskrit', value: 'sa', countryCode: 'in' }, // India
    { label: 'Serbian', value: 'sr', countryCode: 'rs' }, // Serbia
    { label: 'Shona', value: 'sn', countryCode: 'zw' }, // Zimbabwe
    { label: 'Sindhi', value: 'sd', countryCode: 'pk' }, // Pakistan
    { label: 'Sinhala', value: 'si', countryCode: 'lk' }, // Sri Lanka
    { label: 'Slovak', value: 'sk', countryCode: 'sk' }, // Slovakia
    { label: 'Slovenian', value: 'sl', countryCode: 'si' }, // Slovenia
    { label: 'Somali', value: 'so', countryCode: 'so' }, // Somalia
    { label: 'Spanish', value: 'es', countryCode: 'es' }, // Spain
    { label: 'Sundanese', value: 'su', countryCode: 'id' }, // Indonesia
    { label: 'Swahili', value: 'sw', countryCode: 'tz' }, // Tanzania
    { label: 'Swedish', value: 'sv', countryCode: 'se' }, // Sweden
    { label: 'Tagalog', value: 'tl', countryCode: 'ph' }, // Philippines
    { label: 'Tajik', value: 'tg', countryCode: 'tj' }, // Tajikistan
    { label: 'Tamil', value: 'ta', countryCode: 'in' }, // India
    { label: 'Tatar', value: 'tt', countryCode: 'ru' }, // Russia
    { label: 'Telugu', value: 'te', countryCode: 'in' }, // India
    { label: 'Thai', value: 'th', countryCode: 'th' }, // Thailand
    { label: 'Tibetan', value: 'bo', countryCode: 'cn' }, // China
    { label: 'Turkish', value: 'tr', countryCode: 'tr' }, // Turkey
    { label: 'Turkmen', value: 'tk', countryCode: 'tm' }, // Turkmenistan
    { label: 'Ukrainian', value: 'uk', countryCode: 'ua' }, // Ukraine
    { label: 'Urdu', value: 'ur', countryCode: 'pk' }, // Pakistan
    { label: 'Uzbek', value: 'uz', countryCode: 'uz' }, // Uzbekistan
    { label: 'Vietnamese', value: 'vi', countryCode: 'vn' }, // Vietnam
    { label: 'Welsh', value: 'cy', countryCode: 'gb-wls' }, // Wales
    { label: 'Yiddish', value: 'yi', countryCode: 'il' }, // Israel
    { label: 'Yoruba', value: 'yo', countryCode: 'ng' }, // Nigeria
];

export const targetLanguageOptions: LanguageSelectionOptions[] = [
    {
        label: 'Bulgarian',
        value: 'BG',
        countryCode: 'bg' // Bulgaria
    },
    {
        label: 'Czech',
        value: 'CS',
        countryCode: 'cz' // Czech Republic
    },
    {
        label: 'Danish',
        value: 'DA',
        countryCode: 'dk' // Denmark
    },
    {
        label: 'German',
        value: 'DE',
        countryCode: 'de' // Germany
    },
    {
        label: 'Greek',
        value: 'EL',
        countryCode: 'gr' // Greece
    },
    {
        label: 'English (British)',
        value: 'EN-GB',
        countryCode: 'gb' // United Kingdom
    },
    {
        label: 'English (American)',
        value: 'EN-US',
        countryCode: 'us' // United States
    },
    {
        label: 'Spanish',
        value: 'ES',
        countryCode: 'es' // Spain
    },
    {
        label: 'Estonian',
        value: 'ET',
        countryCode: 'ee' // Estonia
    },
    {
        label: 'Finnish',
        value: 'FI',
        countryCode: 'fi' // Finland
    },
    {
        label: 'French',
        value: 'FR',
        countryCode: 'fr' // France
    },
    {
        label: 'Hungarian',
        value: 'HU',
        countryCode: 'hu' // Hungary
    },
    {
        label: 'Indonesian',
        value: 'ID',
        countryCode: 'id' // Indonesia
    },
    {
        label: 'Italian',
        value: 'IT',
        countryCode: 'it' // Italy
    },
    {
        label: 'Japanese',
        value: 'JA',
        countryCode: 'jp' // Japan
    },
    {
        label: 'Korean',
        value: 'KO',
        countryCode: 'kr' // South Korea
    },
    {
        label: 'Lithuanian',
        value: 'LT',
        countryCode: 'lt' // Lithuania
    },
    {
        label: 'Latvian',
        value: 'LV',
        countryCode: 'lv' // Latvia
    },
    {
        label: 'Norwegian (Bokmål)',
        value: 'NB',
        countryCode: 'no' // Norway
    },
    {
        label: 'Dutch',
        value: 'NL',
        countryCode: 'nl' // Netherlands
    },
    {
        label: 'Polish',
        value: 'PL',
        countryCode: 'pl' // Poland
    },
    {
        label: 'Portuguese (Brazilian)',
        value: 'PT-BR',
        countryCode: 'br' // Brazil
    },
    {
        label: 'Portuguese',
        value: 'PT-PT',
        countryCode: 'pt' // Portugal
    },
    {
        label: 'Romanian',
        value: 'RO',
        countryCode: 'ro' // Romania
    },
    {
        label: 'Russian',
        value: 'RU',
        countryCode: 'ru' // Russia
    },
    {
        label: 'Slovak',
        value: 'SK',
        countryCode: 'sk' // Slovakia
    },
    {
        label: 'Slovenian',
        value: 'SL',
        countryCode: 'si' // Slovenia
    },
    {
        label: 'Swedish',
        value: 'SV',
        countryCode: 'se' // Sweden
    },
    {
        label: 'Turkish',
        value: 'TR',
        countryCode: 'tr' // Turkey
    },
    {
        label: 'Ukrainian',
        value: 'UK',
        countryCode: 'ua' // Ukraine
    },
    {
        label: 'Chinese (simplified)',
        value: 'ZH',
        countryCode: 'cn' // China
    }
];
