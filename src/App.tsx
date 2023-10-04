// React
import { Routes, Route, HashRouter } from 'react-router-dom';
// Resources
import './css/global.css';
import './i18n';
// Components
import RadioList from './components/RadioList';
import RadioPlayer from "./components/RadioPlayer";
import ErrorPage from "./components/ErrorPage";
import RadioSettings from './components/RadioSettings';
import PrivacyPolicy from './components/PrivacyPolicy';
import Changelog from './components/Changelog';
import { useEffect } from 'react';

function App() {
	useEffect(() => {
		const ls_theme = localStorage.getItem("app_theme");
		if(ls_theme) {
			document.documentElement.setAttribute("selected-theme", ls_theme);
		} else {
			document.documentElement.setAttribute("selected-theme", "lime");
		}
	}, []);

	return (
		<HashRouter>
			<Routes>
				<Route index path='/' element={<RadioList/>}/>
				<Route path='/radio/:radioid' element={<RadioPlayer/>}/>
				<Route path='/settings' element={<RadioSettings/>}/>
				<Route path='/privacypolicy' element={<PrivacyPolicy/>}/>
				<Route path='/changelog' element={<Changelog/>}/>
				<Route path='/*' element={<ErrorPage error="404 Page not Found"/>}/>
				<Route path='*' element={<ErrorPage error="404 Page not Found"/>}/> {/* Possibly dev only */}
			</Routes>
		</HashRouter>
	)
}

export default App;