import { Link } from "react-router-dom";

function AppHeader() {
	return (
		<header className="app-header">
			<Link to={"/radioweb/"}>
				<h1 id="app-header-name">Ap4che radio player</h1>
			</Link>
		</header>
	);
}

export default AppHeader;