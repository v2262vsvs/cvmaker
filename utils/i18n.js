import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import translate from "./translate";



const languages = ['en', 'ua'];

const resources = translate


i18n
    .use(initReactI18next)

    .init({
        resources,
        lng: languages,

        interpolation: {
            escapeValue: false, // not needed for react as it escapes by default
        }
    });


export default i18n;
