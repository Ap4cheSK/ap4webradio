import { useEffect, useState } from "react";
import AppHeader from "./AppHeader";

function RadioSettings() {
	const [autoPlay, setAutoPlay] = useState(false);
	const [defaultVolume, setDefaultVolume] = useState(20);

	// Get settings from LocalStorage and set them
	const ls_autoPlay = localStorage.getItem("app_autoplay");
	const ls_defaultVolume = localStorage.getItem("app_def_vol");

	useEffect(() => {
		if(ls_defaultVolume) setDefaultVolume(parseInt(ls_defaultVolume));
		if(ls_autoPlay) {
			if(ls_autoPlay === "true") setAutoPlay(true);
			else setAutoPlay(false);
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	function handleDefaultVolume(event: React.ChangeEvent<HTMLInputElement>) {
		const newVolume = parseInt((event.target.value).toString());
		if(isNaN(newVolume) || newVolume < 0) {
			setDefaultVolume(0);
		} else if(newVolume > 100) {
			setDefaultVolume(100);
		} else {
			setDefaultVolume(Math.round(newVolume));
		}
	}

	function handleAutoPlay() {
		if(autoPlay) {
			setAutoPlay(false);
		} else {
			setAutoPlay(true);
		}
	}

	function handleSave() {
		localStorage.setItem("app_autoplay", autoPlay.toString());
		localStorage.setItem("app_def_vol", defaultVolume.toString());
		alert("Settings saved.");
	}

	return (
		<>
			<AppHeader backBtn={true}/>
			<section className="radio-settings">
				<h2 className="page-header">Radio Player Settings</h2>

				<section className="settings-list">
					<div className="settings-item">
						<p>Auto-Play radio stream</p>
						<div className={autoPlay ? "settings-switch active-switch" : "settings-switch"} onClick={handleAutoPlay}>
							<div className="settings-switch-indicator"></div>
						</div>
					</div>

					<div className="settings-item">
						<p>Default volume</p>
						<input className="settings-range" type="number" min={0} step={1} max={100} onChange={handleDefaultVolume} value={defaultVolume.toString()}/>
					</div>
				</section>

				<button className="app-btn" onClick={handleSave}>Save</button>
			</section>
		</>
	);
}

export default RadioSettings;