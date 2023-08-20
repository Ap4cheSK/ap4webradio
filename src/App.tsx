import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RadioList from './components/RadioList';
import RadioPlayer from "./components/RadioPlayer";
import ErrorPage from "./components/ErrorPage";
import './css/global.css';

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route index path='/radioweb/' element={<RadioList/>}/>
				<Route path='/radioweb/radio/:radioid' element={<RadioPlayer/>}/>
				<Route path='/radioweb/*' element={<ErrorPage error="404 Page not Found"/>}/>
				<Route path='*' element={<ErrorPage error="404: Page not Found"/>}/> {/* Possibly dev only */}
			</Routes>
		</BrowserRouter>
	)
}

export default App;