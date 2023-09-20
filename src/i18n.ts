// Localization
import i18n from "i18next";
import { initReactI18next } from 'react-i18next';
import enTranslation from "./locales/en.json";
import skTranslation from "./locales/sk.json";
import czTranslation from "./locales/cz.json";

const ls_lang = localStorage.getItem("app_lang");

const i18nInstance = i18n.createInstance();
i18nInstance.use(initReactI18next);
i18nInstance.init({
	resources: {
		en : {translation: enTranslation},
		sk : {translation: skTranslation},
		cz : {translation: czTranslation}
	},
	lng: "en",
	fallbackLng: "en",
	interpolation: {
		escapeValue: false,
	},
	debug: false,
});

if(ls_lang) i18nInstance.changeLanguage(ls_lang);

export default i18nInstance;