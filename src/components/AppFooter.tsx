import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import changelogJson from "../assets/changelog.json";

function AppFooter() {
	const { t } = useTranslation();

	return (
		<footer className="app-footer">
			<section className="footer-contact">
				<i id="discord-icon" className="fa-brands fa-discord"></i>
				<p><b>apachesk</b></p>
			</section>

			<section className="footer-pp">
				<Link to={"/privacypolicy"}>
					<h3>{t("pp-header")}</h3>
				</Link>
			</section>

			<section className="footer-changelog">
				<Link to={"/changelog"}>
					v{changelogJson[changelogJson.length-1].version} <i className="fa-solid fa-newspaper"></i>
				</Link>
			</section>
		</footer>
	);
}

export default AppFooter;