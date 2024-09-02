import { useTranslation } from "react-i18next";
import AppHeader from "./AppHeader";
import AppFooter from "./AppFooter";

function PrivacyPolicy() {
	const { t } = useTranslation();

	return (
		<>
			<AppHeader homeBtn={true} settingsBtn={true}/>

			<section className="privacy-policy">
				<h2 className="page-header">{t("pp-header")}</h2>
				<p>{t("pp-update")}</p>

				<p>{t("pp-part-a")}</p>
				<p>{t("pp-part-b")}</p>

				<p><b>{t("pp-device")}</b> {t("pp-device-a")}</p>
				<p><b>Cookies</b> {t("pp-cookies")}</p>
				<p><b>LocalStorage</b> {t("pp-ls")}</p>

				<h3>{t("pp-datac")}</h3>
				<p>{t("pp-datac-a")}</p>

				<h3>{t("pp-types")}</h3>
				<p>{t("pp-types-a")}</p>

				<h3>{t("pp-agree")}</h3>
				<p>{t("pp-agree-a")}</p>
			</section>

			<AppFooter/>
		</>
	);
}

export default PrivacyPolicy;