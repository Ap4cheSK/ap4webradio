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

function App() {
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