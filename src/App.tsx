import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RadioList from './components/RadioList';
import RadioPlayer from "./components/RadioPlayer";
import './css/global.css';

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route index path='/radioweb/' element={<RadioList/>}/>
				<Route path='/radioweb/radio/:radioid' element={<RadioPlayer/>}/>
				<Route path='/radioweb/*' element={<h1>404</h1>}/>
			</Routes>
		</BrowserRouter>
	)
}

export default App;