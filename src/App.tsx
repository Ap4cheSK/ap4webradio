import { HashRouter, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
// Localization
import i18n from "i18next";
import { initReactI18next } from 'react-i18next';
import enTranslation from "./locales/en.json";
import skTranslation from "./locales/sk.json";
import czTranslation from "./locales/cz.json";

import RadioList from './components/RadioList';
import RadioPlayer from "./components/RadioPlayer";
import ErrorPage from "./components/ErrorPage";
import RadioSettings from './components/RadioSettings';
import PrivacyPolicy from './components/PrivacyPolicy';
import './css/global.css';

function App() {
	// Localization
	const ls_lang = localStorage.getItem("app_lang");
	const [ language, setLanguage ] = useState("en");

	useEffect(() => {
		if(ls_lang) setLanguage(ls_lang);

		i18n.use(initReactI18next);
		i18n.init({
			resources: {
				en : {translation: enTranslation},
				sk : {translation: skTranslation},
				cz : {translation: czTranslation}
			},
			lng: language,
			fallbackLng: "en",
			interpolation: {
				escapeValue: false,
			},
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	
	return (
		<HashRouter>
			<Routes>
				<Route index path='/' element={<RadioList/>}/>
				<Route path='/radio/:radioid' element={<RadioPlayer/>}/>
				<Route path='/settings' element={<RadioSettings/>}/>
				<Route path='/privacypolicy' element={<PrivacyPolicy/>}/>
				<Route path='/*' element={<ErrorPage error="404 Page not Found"/>}/>
				<Route path='*' element={<ErrorPage error="404: Page not Found"/>}/> {/* Possibly dev only */}
			</Routes>
		</HashRouter>
	)
}

export default App;