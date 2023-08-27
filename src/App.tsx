import { BrowserRouter, Routes, Route } from 'react-router-dom';
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
import './css/global.css';

function App() {
	const ls_lang = localStorage.getItem("app_lang");
	const [ language, setLanguage ] = useState("en");

	useEffect(() => {
		if(ls_lang) setLanguage(ls_lang);
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

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

	return (
		<BrowserRouter>
			<Routes>
				<Route index path='/radioweb/' element={<RadioList/>}/>
				<Route path='/radioweb/radio/:radioid' element={<RadioPlayer/>}/>
				<Route path='/radioweb/settings' element={<RadioSettings/>}/>
				{/* <Route path='/radioweb/settings' element={<ErrorPage error="This feature is not available now."/>}/> */}
				<Route path='/radioweb/*' element={<ErrorPage error="404 Page not Found"/>}/>
				<Route path='*' element={<ErrorPage error="404: Page not Found"/>}/> {/* Possibly dev only */}
			</Routes>
		</BrowserRouter>
	)
}

export default App;