const countriesLangCode = [
    { name: 'Afrikaans', value: 'af' },
    { name: 'Albanian', value: 'sq' },
    { name: 'Amharic', value: 'am' },
    { name: 'Arabic', value: 'ar' },
    { name: 'Armenian', value: 'hy' },
    { name: 'Assamese', value: 'as' },
    { name: 'Aymara', value: 'ay' },
    { name: 'Azerbaijani', value: 'az' },
    { name: 'Bambara', value: 'bm' },
    { name: 'Basque', value: 'eu' },
    { name: 'Belarusian', value: 'be' },
    { name: 'Bengali', value: 'bn' },
    { name: 'Bhojpuri', value: 'bho' },
    { name: 'Bosnian', value: 'bs' },
    { name: 'Bulgarian', value: 'bg' },
    { name: 'Catalan', value: 'ca' },
    { name: 'Cebuano', value: 'ceb' },
    { name: 'Chinese(Simplified)', value: 'zh-CN' },
    { name: 'Chinese(Traditional)', value: 'zh-TW' },
    { name: 'Corsican', value: 'co' },
    { name: 'Croatian', value: 'hr' },
    { name: 'Czech', value: 'cs' },
    { name: 'Danish', value: 'da' },
    { name: 'Dhivehi', value: 'dv' },
    { name: 'Dogri', value: 'doi' },
    { name: 'Dutch', value: 'nl' },
    { name: 'English', value: 'en' },
    { name: 'Esperanto', value: 'eo' },
    { name: 'Estonian', value: 'et' },
    { name: 'Ewe', value: 'ee' },
    { name: 'Filipino', value: 'fil' },
    { name: 'Finnish', value: 'fi' },
    { name: 'French', value: 'fr' },
    { name: 'Frisian', value: 'fy' },
    { name: 'Galician', value: 'gl' },
    { name: 'Georgian', value: 'ka' },
    { name: 'German', value: 'de' },
    { name: 'Greek', value: 'el' },
    { name: 'Guarani', value: 'gn' },
    { name: 'Gujarati', value: 'gu' },
    { name: 'Haitian Creole', value: 'ht' },
    { name: 'Hausa', value: 'ha' },
    { name: 'Hawaiian', value: 'haw' },
    { name: 'Hebrew', value: 'he' },
    { name: 'Hindi', value: 'hi' },
    { name: 'Hmong', value: 'hmn' },
    { name: 'Hungarian', value: 'hu' },
    { name: 'Icelandic', value: 'is' },
    { name: 'Igbo', value: 'ig' },
    { name: 'Ilocano', value: 'ilo' },
    { name: 'Indonesian', value: 'id' },
    { name: 'Irish', value: 'ga' },
    { name: 'Italian', value: 'it' },
    { name: 'Japanese', value: 'ja' },
    { name: 'Javanese', value: 'jv' },
    { name: 'Kannada', value: 'kn' },
    { name: 'Kazakh', value: 'kk' },
    { name: 'Khmer', value: 'km' },
    { name: 'Kinyarwanda', value: 'rw' },
    { name: 'Konkani', value: 'gom' },
    { name: 'Korean', value: 'ko' },
    { name: 'Krio', value: 'kri' },
    { name: 'Kurdish', value: 'ku' },
    { name: 'Kurdish(Sorani)', value: 'ckb' },
    { name: 'Kyrgyz', value: 'ky' },
    { name: 'Lao', value: 'lo' },
    { name: 'Latin', value: 'la' },
    { name: 'Latvian', value: 'lv' },
    { name: 'Lingala', value: 'ln' },
    { name: 'Lithuanian', value: 'lt' },
    { name: 'Luganda', value: 'lg' },
    { name: 'Luxembourgish', value: 'lb' },
    { name: 'Macedonian', value: 'mk' },
    { name: 'Maithili', value: 'mai' },
    { name: 'Malagasy', value: 'mg' },
    { name: 'Malay', value: 'ms' },
    { name: 'Malayalam', value: 'ml' },
    { name: 'Maltese', value: 'mt' },
    { name: 'Maori', value: 'mi' },
    { name: 'Marathi', value: 'mr' },
    { name: 'Meiteilon', value: 'mni-Mtei' },
    { name: 'Mizo', value: 'lus' },
    { name: 'Mongolian', value: 'mn' },
    { name: 'Myanmar', value: 'my' },
    { name: 'Nepali', value: 'ne' },
    { name: 'Norwegian', value: 'no' },
    { name: 'Nyanja', value: 'ny' },
    { name: 'Odia', value: 'or' },
    { name: 'Oromo', value: 'om' },
    { name: 'Pashto', value: 'ps' },
    { name: 'Persian', value: 'fa' },
    { name: 'Polish', value: 'pl' },
    { name: 'Portuguese', value: 'pt' },
    { name: 'Punjabi', value: 'pa' },
    { name: 'Quechua', value: 'qu' },
    { name: 'Romanian', value: 'ro' },
    { name: 'Russian', value: 'ru' },
    { name: 'Samoan', value: 'sm' },
    { name: 'Sanskrit', value: 'sa' },
    { name: 'Scots', value: 'gd' },
    { name: 'Sepedi', value: 'nso' },
    { name: 'Serbian', value: 'sr' },
    { name: 'Sesotho', value: 'st' },
    { name: 'Shona', value: 'sn' },
    { name: 'Sindhi', value: 'sd' },
    { name: 'Sinhala', value: 'si' },
    { name: 'Slovak', value: 'sk' },
    { name: 'Slovenian', value: 'sl' },
    { name: 'Somali', value: 'so' },
    { name: 'Spanish', value: 'es' },
    { name: 'Sundanese', value: 'su' },
    { name: 'Swahili', value: 'sw' },
    { name: 'Swedish', value: 'sv' },
    { name: 'Tagalog', value: 'tl' },
    { name: 'Tajik', value: 'tg' },
    { name: 'Tamil', value: 'ta' },
    { name: 'Tatar', value: 'tt' },
    { name: 'Telugu', value: 'te' },
    { name: 'Thai', value: 'th' },
    { name: 'Tigrinya', value: 'ti' },
    { name: 'Tsonga', value: 'ts' },
    { name: 'Turkish', value: 'tr' },
    { name: 'Turkmen', value: 'tk' },
    { name: 'Twi', value: 'ak' },
    { name: 'Ukrainian', value: 'uk' },
    { name: 'Urdu', value: 'ur' },
    { name: 'Uyghur', value: 'ug' },
    { name: 'Uzbek', value: 'uz' },
    { name: 'Vietnamese', value: 'vi' },
    { name: 'Welsh', value: 'cy' },
    { name: 'Xhosa', value: 'xh' },
    { name: 'Yiddish', value: 'yi' },
    { name: 'Yoruba', value: 'yo' },
    { name: 'Zulu', value: 'zu' },
];

export default countriesLangCode;

export const CountryCodes: { title: string; value: string }[] = [
    { title: 'All', value: 'All' },
    { title: 'Afghanistan', value: 'AF' },
    { title: 'Aland Islands', value: 'AX' },
    { title: 'Albania', value: 'AL' },
    { title: 'Algeria', value: 'DZ' },
    { title: 'American Samoa', value: 'AS' },
    { title: 'Andorra', value: 'AD' },
    { title: 'Angola', value: 'AO' },
    { title: 'Anguilla', value: 'AI' },
    { title: 'Antarctica', value: 'AQ' },
    { title: 'Antigua and Barbuda', value: 'AG' },
    { title: 'Argentina', value: 'AR' },
    { title: 'Armenia', value: 'AM' },
    { title: 'Aruba', value: 'AW' },
    { title: 'Australia', value: 'AU' },
    { title: 'Austria', value: 'AT' },
    { title: 'Azerbaijan', value: 'AZ' },
    { title: 'Bahamas', value: 'BS' },
    { title: 'Bahrain', value: 'BH' },
    { title: 'Bangladesh', value: 'BD' },
    { title: 'Barbados', value: 'BB' },
    { title: 'Belarus', value: 'BY' },
    { title: 'Belgium', value: 'BE' },
    { title: 'Belize', value: 'BZ' },
    { title: 'Benin', value: 'BJ' },
    { title: 'Bermuda', value: 'BM' },
    { title: 'Bhutan', value: 'BT' },
    { title: 'Bolivia', value: 'BO' },
    { title: 'Bonaire, Saint Eustatius and Saba ', value: 'BQ' },
    { title: 'Bosnia and Herzegovina', value: 'BA' },
    { title: 'Botswana', value: 'BW' },
    { title: 'Bouvet Island', value: 'BV' },
    { title: 'Brazil', value: 'BR' },
    { title: 'British Indian Ocean Territory', value: 'IO' },
    { title: 'British Virgin Islands', value: 'VG' },
    { title: 'Brunei', value: 'BN' },
    { title: 'Bulgaria', value: 'BG' },
    { title: 'Burkina Faso', value: 'BF' },
    { title: 'Burundi', value: 'BI' },
    { title: 'Cambodia', value: 'KH' },
    { title: 'Cameroon', value: 'CM' },
    { title: 'Canada', value: 'CA' },
    { title: 'Cape Verde', value: 'CV' },
    { title: 'Cayman Islands', value: 'KY' },
    { title: 'Central African Republic', value: 'CF' },
    { title: 'Chad', value: 'TD' },
    { title: 'Chile', value: 'CL' },
    { title: 'China', value: 'CN' },
    { title: 'Christmas Island', value: 'CX' },
    { title: 'Cocos Islands', value: 'CC' },
    { title: 'Colombia', value: 'CO' },
    { title: 'Comoros', value: 'KM' },
    { title: 'Cook Islands', value: 'CK' },
    { title: 'Costa Rica', value: 'CR' },
    { title: 'Croatia', value: 'HR' },
    { title: 'Cuba', value: 'CU' },
    { title: 'Curacao', value: 'CW' },
    { title: 'Cyprus', value: 'CY' },
    { title: 'Czech Republic', value: 'CZ' },
    { title: 'Democratic Republic of the Congo', value: 'CD' },
    { title: 'Denmark', value: 'DK' },
    { title: 'Djibouti', value: 'DJ' },
    { title: 'Dominica', value: 'DM' },
    { title: 'Dominican Republic', value: 'DO' },
    { title: 'East Timor', value: 'TL' },
    { title: 'Ecuador', value: 'EC' },
    { title: 'Egypt', value: 'EG' },
    { title: 'El Salvador', value: 'SV' },
    { title: 'Equatorial Guinea', value: 'GQ' },
    { title: 'Eritrea', value: 'ER' },
    { title: 'Estonia', value: 'EE' },
    { title: 'Ethiopia', value: 'ET' },
    { title: 'Falkland Islands', value: 'FK' },
    { title: 'Faroe Islands', value: 'FO' },
    { title: 'Fiji', value: 'FJ' },
    { title: 'Finland', value: 'FI' },
    { title: 'France', value: 'FR' },
    { title: 'French Guiana', value: 'GF' },
    { title: 'French Polynesia', value: 'PF' },
    { title: 'French Southern Territories', value: 'TF' },
    { title: 'Gabon', value: 'GA' },
    { title: 'Gambia', value: 'GM' },
    { title: 'Georgia', value: 'GE' },
    { title: 'Germany', value: 'DE' },
    { title: 'Ghana', value: 'GH' },
    { title: 'Gibraltar', value: 'GI' },
    { title: 'Greece', value: 'GR' },
    { title: 'Greenland', value: 'GL' },
    { title: 'Grenada', value: 'GD' },
    { title: 'Guadeloupe', value: 'GP' },
    { title: 'Guam', value: 'GU' },
    { title: 'Guatemala', value: 'GT' },
    { title: 'Guernsey', value: 'GG' },
    { title: 'Guinea', value: 'GN' },
    { title: 'Guinea-Bissau', value: 'GW' },
    { title: 'Guyana', value: 'GY' },
    { title: 'Haiti', value: 'HT' },
    { title: 'Heard Island and McDonald Islands', value: 'HM' },
    { title: 'Honduras', value: 'HN' },
    { title: 'Hong Kong', value: 'HK' },
    { title: 'Hungary', value: 'HU' },
    { title: 'Iceland', value: 'IS' },
    { title: 'India', value: 'IN' },
    { title: 'Indonesia', value: 'ID' },
    { title: 'Iran', value: 'IR' },
    { title: 'Iraq', value: 'IQ' },
    { title: 'Ireland', value: 'IE' },
    { title: 'Isle of Man', value: 'IM' },
    { title: 'Israel', value: 'IL' },
    { title: 'Italy', value: 'IT' },
    { title: 'Ivory Coast', value: 'CI' },
    { title: 'Jamaica', value: 'JM' },
    { title: 'Japan', value: 'JP' },
    { title: 'Jersey', value: 'JE' },
    { title: 'Jordan', value: 'JO' },
    { title: 'Kazakhstan', value: 'KZ' },
    { title: 'Kenya', value: 'KE' },
    { title: 'Kiribati', value: 'KI' },
    { title: 'Kosovo', value: 'XK' },
    { title: 'Kuwait', value: 'KW' },
    { title: 'Kyrgyzstan', value: 'KG' },
    { title: 'Laos', value: 'LA' },
    { title: 'Latvia', value: 'LV' },
    { title: 'Lebanon', value: 'LB' },
    { title: 'Lesotho', value: 'LS' },
    { title: 'Liberia', value: 'LR' },
    { title: 'Libya', value: 'LY' },
    { title: 'Liechtenstein', value: 'LI' },
    { title: 'Lithuania', value: 'LT' },
    { title: 'Luxembourg', value: 'LU' },
    { title: 'Macao', value: 'MO' },
    { title: 'Macedonia', value: 'MK' },
    { title: 'Madagascar', value: 'MG' },
    { title: 'Malawi', value: 'MW' },
    { title: 'Malaysia', value: 'MY' },
    { title: 'Maldives', value: 'MV' },
    { title: 'Mali', value: 'ML' },
    { title: 'Malta', value: 'MT' },
    { title: 'Marshall Islands', value: 'MH' },
    { title: 'Martinique', value: 'MQ' },
    { title: 'Mauritania', value: 'MR' },
    { title: 'Mauritius', value: 'MU' },
    { title: 'Mayotte', value: 'YT' },
    { title: 'Mexico', value: 'MX' },
    { title: 'Micronesia', value: 'FM' },
    { title: 'Moldova', value: 'MD' },
    { title: 'Monaco', value: 'MC' },
    { title: 'Mongolia', value: 'MN' },
    { title: 'Montenegro', value: 'ME' },
    { title: 'Montserrat', value: 'MS' },
    { title: 'Morocco', value: 'MA' },
    { title: 'Mozambique', value: 'MZ' },
    { title: 'Myanmar', value: 'MM' },
    { title: 'Namibia', value: 'NA' },
    { title: 'Nauru', value: 'NR' },
    { title: 'Nepal', value: 'NP' },
    { title: 'Netherlands', value: 'NL' },
    { title: 'New Caledonia', value: 'NC' },
    { title: 'New Zealand', value: 'NZ' },
    { title: 'Nicaragua', value: 'NI' },
    { title: 'Niger', value: 'NE' },
    { title: 'Nigeria', value: 'NG' },
    { title: 'Niue', value: 'NU' },
    { title: 'Norfolk Island', value: 'NF' },
    { title: 'North Korea', value: 'KP' },
    { title: 'Northern Mariana Islands', value: 'MP' },
    { title: 'Norway', value: 'NO' },
    { title: 'Oman', value: 'OM' },
    { title: 'Pakistan', value: 'PK' },
    { title: 'Palau', value: 'PW' },
    { title: 'Palestinian Territory', value: 'PS' },
    { title: 'Panama', value: 'PA' },
    { title: 'Papua New Guinea', value: 'PG' },
    { title: 'Paraguay', value: 'PY' },
    { title: 'Peru', value: 'PE' },
    { title: 'Philippines', value: 'PH' },
    { title: 'Pitcairn', value: 'PN' },
    { title: 'Poland', value: 'PL' },
    { title: 'Portugal', value: 'PT' },
    { title: 'Puerto Rico', value: 'PR' },
    { title: 'Qatar', value: 'QA' },
    { title: 'Republic of the Congo', value: 'CG' },
    { title: 'Reunion', value: 'RE' },
    { title: 'Romania', value: 'RO' },
    { title: 'Russia', value: 'RU' },
    { title: 'Rwanda', value: 'RW' },
    { title: 'Saint Barthelemy', value: 'BL' },
    { title: 'Saint Helena', value: 'SH' },
    { title: 'Saint Kitts and Nevis', value: 'KN' },
    { title: 'Saint Lucia', value: 'LC' },
    { title: 'Saint Martin', value: 'MF' },
    { title: 'Saint Pierre and Miquelon', value: 'PM' },
    { title: 'Saint Vincent and the Grenadines', value: 'VC' },
    { title: 'Samoa', value: 'WS' },
    { title: 'San Marino', value: 'SM' },
    { title: 'Sao Tome and Principe', value: 'ST' },
    { title: 'Saudi Arabia', value: 'SA' },
    { title: 'Senegal', value: 'SN' },
    { title: 'Serbia', value: 'RS' },
    { title: 'Seychelles', value: 'SC' },
    { title: 'Sierra Leone', value: 'SL' },
    { title: 'Singapore', value: 'SG' },
    { title: 'Sint Maarten', value: 'SX' },
    { title: 'Slovakia', value: 'SK' },
    { title: 'Slovenia', value: 'SI' },
    { title: 'Solomon Islands', value: 'SB' },
    { title: 'Somalia', value: 'SO' },
    { title: 'South Africa', value: 'ZA' },
    { title: 'South Georgia and the South Sandwich Islands', value: 'GS' },
    { title: 'South Korea', value: 'KR' },
    { title: 'South Sudan', value: 'SS' },
    { title: 'Spain', value: 'ES' },
    { title: 'Sri Lanka', value: 'LK' },
    { title: 'Sudan', value: 'SD' },
    { title: 'Suriname', value: 'SR' },
    { title: 'Svalbard and Jan Mayen', value: 'SJ' },
    { title: 'Swaziland', value: 'SZ' },
    { title: 'Sweden', value: 'SE' },
    { title: 'Switzerland', value: 'CH' },
    { title: 'Syria', value: 'SY' },
    { title: 'Taiwan', value: 'TW' },
    { title: 'Tajikistan', value: 'TJ' },
    { title: 'Tanzania', value: 'TZ' },
    { title: 'Thailand', value: 'TH' },
    { title: 'Togo', value: 'TG' },
    { title: 'Tokelau', value: 'TK' },
    { title: 'Tonga', value: 'TO' },
    { title: 'Trinidad and Tobago', value: 'TT' },
    { title: 'Tunisia', value: 'TN' },
    { title: 'Turkey', value: 'TR' },
    { title: 'Turkmenistan', value: 'TM' },
    { title: 'Turks and Caicos Islands', value: 'TC' },
    { title: 'Tuvalu', value: 'TV' },
    { title: 'U.S. Virgin Islands', value: 'VI' },
    { title: 'Uganda', value: 'UG' },
    { title: 'Ukraine', value: 'UA' },
    { title: 'United Arab Emirates', value: 'AE' },
    { title: 'United Kingdom', value: 'GB' },
    { title: 'United States', value: 'US' },
    { title: 'United States Minor Outlying Islands', value: 'UM' },
    { title: 'Uruguay', value: 'UY' },
    { title: 'Uzbekistan', value: 'UZ' },
    { title: 'Vanuatu', value: 'VU' },
    { title: 'Vatican', value: 'VA' },
    { title: 'Venezuela', value: 'VE' },
    { title: 'Vietnam', value: 'VN' },
    { title: 'Wallis and Futuna', value: 'WF' },
    { title: 'Western Sahara', value: 'EH' },
    { title: 'Yemen', value: 'YE' },
    { title: 'Zambia', value: 'ZM' },
    { title: 'Zimbabwe', value: 'ZW' },
];
