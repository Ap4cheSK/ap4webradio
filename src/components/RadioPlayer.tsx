import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import radioJsonList from "../assets/radios.json";
import AppHeader from "./AppHeader";
import ErrorPage from "./ErrorPage";
import noImage from "../assets/noimage.webp";
import RDSradioke from "./rds/RDSradioke";
import RDSfunvlna from "./rds/RDSradiofunlivevlna";
import RDSfunother from "./rds/RDSradiofunother";
import RDSradioevropa2 from "./rds/RDSradioevropa2";
import RDSradiorock from "./rds/RDSradiorock";
import RDSradioeu2melody from "./rds/RDSradioeu2melody";
import RDSradioexpres from "./rds/RDSradioexpres";
import RDSbestfm from "./rds/RDSbestfm";

function RadioPlayer() {
	function playButton() {
		return (
			<button id="player-play" className="radio-player-controls-btn" onClick={handlePlay} aria-label="Play">
				<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 384 512"><path d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80V432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z"/></svg>
			</button>
		);
	}

	function stopButton() {
		return (
			<button id="player-stop" className="radio-player-controls-btn" onClick={handleStop} aria-label="Stop">
				<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 384 512"><path d="M0 128C0 92.7 28.7 64 64 64H320c35.3 0 64 28.7 64 64V384c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V128z"/></svg>
			</button>
		);
	}

	function handlePlay() {setIsPlaying(true)}

	function handleStop() {setIsPlaying(false)}

	function handleVolume(event: React.ChangeEvent<HTMLInputElement>) {
		const newVolume = parseInt((event.target.value).toString());

		if(isNaN(newVolume) || newVolume < 0) setVolume(0);
		else if(newVolume > 100) setVolume(100);
		else setVolume(newVolume);

		localStorage.setItem("app_def_vol", volume.toString());
	}

	function handleCopyNow() {
		const tempTextArea = document.createElement("textarea");
		tempTextArea.style.position = "fixed";
		tempTextArea.style.opacity = "0";
		tempTextArea.value = rdsString;
		document.body.appendChild(tempTextArea);
		tempTextArea.select();

		try {
			const copy = document.execCommand("copy");
			console.log(copy ? "Playing now copied to clipboard!" : "Copying failed!");
			alert(copy ? "Playing now copied to clipboard!" : "Copying failed!");
		} catch(error) {
			console.error("Unablen to copy.", error);
		}

		document.body.removeChild(tempTextArea);
	}

	function RadioLogo() {
		if(radioStation?.bigImgUrl === "")
			return (
				<img className="radio-player-avatar" src={radioStation.imgUrl ? radioStation.imgUrl : noImage}/>
			);

		return (
			<img className="radio-player-avatar big-image" src={radioStation?.bigImgUrl ? radioStation.bigImgUrl : noImage}/>
		);
	}

	// Find radiostation
	const { radioid } = useParams();
	const radioStation = radioJsonList.find(radio => radio.id === radioid);
	// AudioStream
	const audioStream = useRef<HTMLAudioElement>(null);
	const [isPlaying, setIsPlaying] = useState(false);
	const [volume, setVolume] = useState(20);
	const [useDataSaving, setUseDataSaving] = useState(false);
	// RDS
	const [rdsString, setRdsString] = useState("");
	// Other
	const soundWaveRef = useRef<HTMLDivElement>(null);
	const { t } = useTranslation();

	useEffect(() => {
		// Get LocalStorage data-saving-mode
		const ls_dataSaving = localStorage.getItem("app_data_saving");
		if(ls_dataSaving && ls_dataSaving === "true") setUseDataSaving(true);

		// Get LocalStorage AutoPlay setting
		const ls_autoPlay = localStorage.getItem("app_autoplay");
		if(ls_autoPlay && ls_autoPlay === "true") setIsPlaying(true);

		// Get LocalStorage default volume
		const ls_defaultVolume = localStorage.getItem("app_def_vol");
		if(ls_defaultVolume) setVolume(parseInt(ls_defaultVolume));

		// Start RDS Calls
		rdsCall();
		async function rdsCall() {
			if(radioStation?.id === "funradio" || radioStation?.id === "radiovlna") {
				// FunRadio Live / RadioVlna RDS
				setRdsString(await RDSfunvlna({ rdsUrl: radioStation.rdsUrl }));
			} else if(radioStation?.id === "funczsk" || radioStation?.id === "fundance" || radioStation?.id === "funchill" || radioStation?.id === "radiovlnarock" || radioStation?.id === "radiovlnaparty" || radioStation?.id === "funleto" || radioStation?.id === "funretro" || radioStation?.id === "funmilenial") {
				// FunRadio CZSK / Dance / Chill / Leto / Milenialky / Usmev / RadioVlnaRock / RadioVlnaParty RDS
				setRdsString(await RDSfunother({ rdsUrl: radioStation.rdsUrl }));
			} else if(radioStation?.id === "radioeu2sk" || radioStation?.id === "radiomelody") {
				// Europa 2 / Melody RDS
				setRdsString(await RDSradioeu2melody({ rdsUrl: radioStation.rdsUrl }));
			} else if(radioStation?.id === "radioexpress") {
				// Expres RDS
				setRdsString(await RDSradioexpres({ rdsUrl: radioStation.rdsUrl }));
			} else if(radioStation?.id === "radioke") {
				// RadioKE RDS
				setRdsString(await RDSradioke({ rdsUrl: radioStation.rdsUrl }));
			} else if(radioStation?.id === "radioeu2cz") {
				// Evropa 2 RDS
				setRdsString(await RDSradioevropa2({ rdsUrl: radioStation.rdsUrl }));
			} else if(radioStation?.id === "radiorock") {
				// RadioRock RDS
				setRdsString(await RDSradiorock({ rdsUrl: radioStation.rdsUrl }));
			} else if(radioStation?.id === "radiobestfm") {
				// Best.FM RDS
				setRdsString(await RDSbestfm({ rdsUrl: radioStation.rdsUrl }));
			} else {
				// No RDS
				setRdsString(t("rds_unsupp"));
			}
		}

		const rdsInterval = setInterval(rdsCall, 1000*60*2); // msec*sec*min
		return () => clearInterval(rdsInterval);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	// Handle start/stop stream
	useEffect(() => {
		if(audioStream.current) {
			if(isPlaying) {
				audioStream.current.load();
				audioStream.current.play();
				if(soundWaveRef.current) {
					const bars = soundWaveRef.current.querySelectorAll(".box");
					bars.forEach(bar => {bar.classList.add("barplay")})
				}
			} else {
				audioStream.current.pause();
				if(soundWaveRef.current) {
					const bars = soundWaveRef.current.querySelectorAll(".box");
					bars.forEach(bar => {bar.classList.remove("barplay")})
				}
			}
		}
	}, [isPlaying]);

	// Handle setting stream volume
	useEffect(() => {if(audioStream.current) audioStream.current.volume = volume / 100;}, [volume]);

	if(radioStation) {
		return (<>
			<AppHeader homeBtn={true} settingsBtn={true}/>
			<section className="radio-player">
				<section className="radio-player-station">
					<RadioLogo/>
					<h2 className="radio-player-name">{radioStation.name}</h2>
					<p className="radio-player-info small-text">{useDataSaving ? radioStation.lowInfo : radioStation.highInfo}</p>
				</section>

				<section className="radio-player-controls">
					{ isPlaying ? stopButton() : playButton() }
					<input type="range" value={volume.toString()} onChange={handleVolume} min={0} max={100} step={1} id="player-volume"/>
					<p className="volume-display"><b>{volume.toString()}%</b></p>
				</section>
	
				<audio src={useDataSaving ? radioStation.lowUrl : radioStation.highUrl} ref={audioStream} id="radio-source"></audio>

				<section className="radio-player-rds">
					<h2 className="playing-now">{t("playing_now")}</h2>
					<h3 className="radio-player-song" onClick={handleCopyNow} title={`${rdsString} | Click to copy song name`}>{rdsString}</h3>
					<p className="copy-text small-text">Click to copy song name</p>
				</section>

				<div id="sound-wave" ref={soundWaveRef} aria-label="Audio animation">
					<div className="box box1"></div>
					<div className="box box2"></div>
					<div className="box box3"></div>
					<div className="box box4"></div>
					<div className="box box5"></div>
				</div>
			</section>
		</>)
	}

	return (
		<ErrorPage error={t("err_noradio")}/>
	);
}

export default RadioPlayer;