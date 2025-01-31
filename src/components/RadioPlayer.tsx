import React, { useEffect, useRef, useState } from "react";
import { useParams, Link } from "react-router-dom";
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
				<i className="fa-solid fa-play"></i>
			</button>
		);
	}

	function stopButton() {
		return (
			<button id="player-stop" className="radio-player-controls-btn" onClick={handleStop} aria-label="Stop">
				<i className="fa-solid fa-stop"></i>
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

	async function rdsCall() {
		switch (radioStation?.id) {
			case "funradio":
			case "radiovlna":
				setRdsString(await RDSfunvlna({ rdsUrl: radioStation.rdsUrl }));
				break;

			case "funczsk":
			case "fundance":
			case "funchill":
			case "radiovlnarock":
			case "radiovlnaparty":
			case "funleto":
			case "funretro":
			case "funmilenial":
				setRdsString(await RDSfunother({ rdsUrl: radioStation.rdsUrl }));
				break;

			case "radioeu2sk":
			case "radiomelody":
				setRdsString(await RDSradioeu2melody({ rdsUrl: radioStation.rdsUrl }));
				break;

			case "radioexpress":
				setRdsString(await RDSradioexpres({ rdsUrl: radioStation.rdsUrl }));
				break;
		
			case "radioke":
				setRdsString(await RDSradioke({ rdsUrl: radioStation.rdsUrl }));
				break;

			case "radioeu2cz":
				setRdsString(await RDSradioevropa2({ rdsUrl: radioStation.rdsUrl }));
				break;

			case "radiorock":
				setRdsString(await RDSradiorock({ rdsUrl: radioStation.rdsUrl }));
				break;

			case "radiobestfm":
				setRdsString(await RDSbestfm({ rdsUrl: radioStation.rdsUrl }));
				break;

			default:
				setRdsString(t("rds_unsupp"));
				break;
		}
	}

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
		const rdsInterval = setInterval(rdsCall, 1000*60*2);
		return () => clearInterval(rdsInterval);
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
					<p className="copy-text small-text" onClick={handleCopyNow}>{t("copy_song_note")}</p>
					<p className="refresh-text" onClick={rdsCall}>
						<i className="fa-solid fa-arrows-rotate"></i> Refresh song
					</p>
					<Link to={`/playlist/${radioStation.id}`} className="playlist-link">
						<p><i className="fa-solid fa-list"></i> Playlist</p>
					</Link>
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