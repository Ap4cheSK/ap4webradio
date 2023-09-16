import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import AppHeader from "./AppHeader";

function RadioSettings() {
	const [autoPlay, setAutoPlay] = useState(false);
	const [dataSaving, setDataSaving] = useState(false);
	const [language, setLanguage] = useState("en");
	const { i18n, t } = useTranslation();

	useEffect(() => {
		// Handle LocalStorage; Get settings from LocalStorage and set them
		const ls_autoPlay = localStorage.getItem("app_autoplay");
		if(ls_autoPlay) {
			if(ls_autoPlay === "true") setAutoPlay(true);
			else setAutoPlay(false);
		}
		
		const ls_dataSaving = localStorage.getItem("app_data_saving");
		if(ls_dataSaving) {
			if(ls_dataSaving === "true") setDataSaving(true);
			else setDataSaving(false);
		}

		const ls_lang = localStorage.getItem("app_lang");
		if(ls_lang) setLanguage(ls_lang);

	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	// Handle settings
	function handleAutoPlay() {
		if(autoPlay) {
			setAutoPlay(false);
		} else {
			setAutoPlay(true);
		}
	}

	function handleDataSaving() {
		if(dataSaving) {
			setDataSaving(false);
		} else {
			setDataSaving(true);
		}
	}

	function handleLanguageSwitch(event: React.ChangeEvent<HTMLSelectElement>) {
		setLanguage(event.target.value);
	}

	// Save and reset
	function handleSave() {
		localStorage.setItem("app_autoplay", autoPlay.toString());
		localStorage.setItem("app_data_saving", dataSaving.toString());
		localStorage.setItem("app_lang", language);
		i18n.changeLanguage(language);
		alert("Settings saved.");
	}

	function handleReset() {
		setAutoPlay(false);
		setDataSaving(false);
		setLanguage("en");
		localStorage.removeItem("app_autoplay");
		localStorage.removeItem("app_def_vol");
		localStorage.removeItem("app_data_saving");
		localStorage.removeItem("app_lang");
		i18n.changeLanguage(language);
		alert("Settings reset.");
	}

	return (
		<>
			<AppHeader homeBtn={true}/>
			<section className="radio-settings">
				<h2 className="page-header">{t("settings_header")}</h2>

				<section className="settings-list">
					<div className="settings-item">
						<p>{t("stg_lang")}</p>
						<select className="settings-lang-selector" value={language} onChange={handleLanguageSwitch}>
							<option value="en">English</option>
							<option value="sk">Slovenčina</option>
							<option value="cz">Čeština</option>
						</select>
					</div>

					<div className="settings-item">
						<p>{t("stg_autoplay")}</p>
						<div className={autoPlay ? "settings-switch active-switch" : "settings-switch"} onClick={handleAutoPlay}>
							<div className="settings-switch-indicator"></div>
						</div>
					</div>

					<div className="settings-item">
						<p>{t("stg_datasave")}</p>
						<div className={dataSaving ? "settings-switch active-switch" : "settings-switch"} onClick={handleDataSaving}>
							<div className="settings-switch-indicator"></div>
						</div>
					</div>
				</section>

				<button className="app-btn" onClick={handleSave}>{t("stg_save")}</button>
				<button className="app-btn cancel-btn" onClick={handleReset}>{t("stg_reset")}</button>
			</section>
		</>
	);
}

export default RadioSettings;