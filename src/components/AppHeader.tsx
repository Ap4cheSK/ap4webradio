import { Link } from "react-router";

interface appHeaderParams {
	homeBtn?: boolean;
	settingsBtn?: boolean;
}

function HomeBtn() {
	return (
		<Link to={"/"} aria-label="To homepage">
			<p id="app-header-back">
				<i className="fa-sharp fa-solid fa-house-chimney"></i>
			</p>
		</Link>
	);
}

function SettingsBtn() {
	return (
		<Link to={"/settings"} aria-label="To settings">
			<p id="app-header-settings">
				<i className="fa-solid fa-gear"></i>
			</p>
		</Link>
	);
}

function BtnVoid() {
	return (<p></p>);
}

function AppHeader(params: appHeaderParams) {
	return (
		<header className="app-header">
			{params.homeBtn ? HomeBtn() : BtnVoid()}
			<Link to={"/"}>
				<h1 id="app-header-name">AP4 radio player</h1>
			</Link>
			{params.settingsBtn ? SettingsBtn() : BtnVoid()}
		</header>
	);
}

export default AppHeader;