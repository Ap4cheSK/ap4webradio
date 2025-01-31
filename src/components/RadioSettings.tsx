import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import AppHeader from "./AppHeader";

function RadioSettings() {
	const [autoPlay, setAutoPlay] = useState(false);
	const [dataSaving, setDataSaving] = useState(false);
	const [language, setLanguage] = useState("en");
	const [theme, setTheme] = useState("lime");
	const { i18n, t } = useTranslation();
	const navigate = useNavigate();

	useEffect(() => {
		// Handle LocalStorage; Get settings from LocalStorage and set them
		const ls_autoPlay = localStorage.getItem("app_autoplay");
		if(ls_autoPlay && ls_autoPlay === "true") setAutoPlay(true);
		else setAutoPlay(false);
		
		const ls_dataSaving = localStorage.getItem("app_data_saving");
		if(ls_dataSaving && ls_dataSaving === "true") setDataSaving(true);
		else setDataSaving(false);

		const ls_lang = localStorage.getItem("app_lang");
		if(ls_lang) setLanguage(ls_lang);

		const ls_theme = localStorage.getItem("app_theme");
		if(ls_theme) setTheme(ls_theme);
		
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	// Handle settings
	function handleAutoPlay() {
		if(autoPlay) setAutoPlay(false);
		else setAutoPlay(true);
	}

	function handleDataSaving() {
		if(dataSaving) setDataSaving(false);
		else setDataSaving(true);
	}

	function handleLanguageSwitch(event: React.ChangeEvent<HTMLSelectElement>) {
		setLanguage(event.target.value);
	}

	function handleThemeSwitch(event: React.ChangeEvent<HTMLSelectElement>) {
		setTheme(event.target.value);
	}

	// Save and reset
	function handleSave() {
		localStorage.setItem("app_autoplay", autoPlay.toString());
		localStorage.setItem("app_data_saving", dataSaving.toString());
		localStorage.setItem("app_lang", language);
		localStorage.setItem("app_theme", theme);
		i18n.changeLanguage(language);
		document.documentElement.setAttribute("selected-theme", theme);

		alert("Settings saved.");
		setTimeout(function() {navigate("/")}, 100);
	}

	function handleReset() {
		setAutoPlay(false);
		setDataSaving(false);
		setLanguage("en");
		setTheme("lime");
		localStorage.removeItem("app_autoplay");
		localStorage.removeItem("app_def_vol");
		localStorage.removeItem("app_data_saving");
		localStorage.removeItem("app_lang");
		localStorage.removeItem("app_theme");
		i18n.changeLanguage(language);
		document.documentElement.setAttribute("selected-theme", "lime");

		alert("Settings reset.");
		setTimeout(function() {navigate("/")}, 100);
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
						<p>{t("stg_theme")}</p>
						<select className="settings-lang-selector" value={theme} onChange={handleThemeSwitch}>
							<option value="lime">{t("stg-th-lime")}</option>
							<option value="pink">{t("stg-th-pink")}</option>
							<option value="cyan">{t("stg-th-cyan")}</option>
							<option value="yellow">{t("stg-th-yellow")}</option>
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