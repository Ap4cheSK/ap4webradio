import { useState } from "react";
import AppHeader from "./AppHeader";

function RadioSettings() {
	const [autoPlay, setAutoPlay] = useState(false);
	const [defaultVolume, setDefaultVolume] = useState(20);

	function handleDefaultVolume(event: React.ChangeEvent<HTMLInputElement>) {
		const newVolume = parseInt((event.target.value).toString());
		if(isNaN(newVolume) || newVolume < 0) {
			setDefaultVolume(0);
			// Cookies.set("radio_def_volume", "0", {expires: 30});
		} else if(newVolume > 100) {
			setDefaultVolume(100);
			// Cookies.set("radio_def_volume", "100", {expires: 30});
		} else {
			setDefaultVolume(Math.round(newVolume));
			// const newVolumeStr = newVolume.toString();
			// Cookies.set("radio_def_volume", newVolumeStr, {expires: 30});
		}
	}

	function handleAutoPlay() {
		if(autoPlay) {
			setAutoPlay(false);
			// Cookies.set("radio_autoplay", "false", {expires: 30});
		} else {
			setAutoPlay(true);
			// Cookies.set("radio_autoplay", "true", {expires: 30});
		}
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
			</section>
		</>
	);
}

export default RadioSettings;