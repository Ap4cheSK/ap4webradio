import { useTranslation } from "react-i18next";
import AppHeader from "./AppHeader";
import AppFooter from "./AppFooter";

interface ErrorPageFormat {
	error: string;
}

function ErrorPage(errorCode: ErrorPageFormat) {
	const { t } = useTranslation();

	return (
		<>
			<AppHeader homeBtn={true}/>
			<div className="error-page">
				<h1>{t("errheader")}</h1>
				<h2 className="error-code">{t("errline")} {errorCode.error}</h2>
			</div>
			<AppFooter/>
		</>
	);
}

export default ErrorPage;