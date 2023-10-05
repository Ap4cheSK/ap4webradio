import AppHeader from "./AppHeader";
import AppFooter from "./AppFooter";

function Changelog() {
	return (
		<>
			<AppHeader homeBtn={true} settingsBtn={true}/>

			<section className="privacy-policy">
				<h2 className="page-header">Changelog</h2>

				<section className="changelog-update">
					<h3>v5.0.0 | 20-9-2023</h3>
					<ul>
						<li>Fixed translations loading</li>
						<li>Added changelog page</li>
					</ul>
				</section>

				<section className="changelog-update">
					<h3>v5.1.0 | 4-10-2023</h3>
					<ul>
						<li>New OLED-friendly design</li>
						<li>Added Themes and Theme switcher</li>
					</ul>
				</section>

				<section className="changelog-update">
					<h3>v5.2.0 | 5-10-2023</h3>
					<ul>
						<li>Added Rádio Vlna Classic Rock (+RDS)</li>
						<li>Added Rádio Vlna Oldies Party (+RDS)</li>
						<li>Removed volume buttons and numerical input</li>
						<li>Design fixes</li>
						<li>Code optimization</li>
					</ul>
				</section>
				
			</section>

			<AppFooter/>
		</>
	);
}

export default Changelog;