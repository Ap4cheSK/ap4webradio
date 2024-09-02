import changelogJson from "../assets/changelog.json";
import AppHeader from "./AppHeader";
import AppFooter from "./AppFooter";

interface changelogInfo {
	version: string;
	date: string;
	changes: string[];
}

function ChangelogCard(info: changelogInfo) {
	return (
		<section className="changelog-update">
			<h3>v{info.version} | {info.date}</h3>
			<ul>
				{info.changes.map(change => (
					<li>{change}</li>
				))}
			</ul>
		</section>
	);
}

function Changelog() {
	return (
		<>
			<AppHeader homeBtn={true} settingsBtn={true}/>

			<section className="privacy-policy">
				<h2 className="page-header">Changelog</h2>

				{changelogJson.slice().reverse().map(changelog => (
					<ChangelogCard version={changelog.version} date={changelog.date} changes={changelog.changes}/>	
				))}
				
			</section>

			<AppFooter/>
		</>
	);
}

export default Changelog;