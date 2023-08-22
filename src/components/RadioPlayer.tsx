import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import radioJsonList from "../assets/radios.json";
import AppHeader from "./AppHeader";
import ErrorPage from "./ErrorPage";
import RDSradioke from "./rds/RDSradioke";
import RDSfunvlna from "./rds/RDSradiofunlivevlna";
import RDSfunother from "./rds/RDSradiofunother";

function RadioPlayer() {
	function playButton() {
		return (
			<button id="player-play" className="radio-player-controls-btn" onClick={handlePlay}>
				<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 384 512"><path d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80V432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z"/></svg>
			</button>
		);
	}

	function stopButton() {
		return (
			<button id="player-stop" className="radio-player-controls-btn" onClick={handleStop}>
				<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 384 512"><path d="M0 128C0 92.7 28.7 64 64 64H320c35.3 0 64 28.7 64 64V384c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V128z"/></svg>
			</button>
		);
	}

	// Find desired radiostation
	const { radioid } = useParams();
	const radioStation = radioJsonList.find(radio => radio.id === radioid);

	// Init
	const audioStream = useRef<HTMLAudioElement>(null);
	const soundWaveRef = useRef<HTMLDivElement>(null);
	const [isPlaying, setIsPlaying] = useState(false);
	const [volume, setVolume] = useState(20);
	const [rdsString, setRdsString] = useState("");

	function handlePlay() {setIsPlaying(true)}
	function handleStop() {setIsPlaying(false)}
	function handleVolume(event: React.ChangeEvent<HTMLInputElement>) {
		const newVolume = parseInt((event.target.value).toString());
		if(isNaN(newVolume) || newVolume < 0) {
			setVolume(0);
		} else if(newVolume > 100) {
			setVolume(100);
		} else {
			setVolume(Math.round(newVolume));
		}
	}
	function decreaseVol() {
		const newVolume = volume - 1;
		if(newVolume < 0) {
			setVolume(0)
		} else setVolume(newVolume);
	}
	function increaseVol() {
		const newVolume = volume + 1;
		if(newVolume > 100) {
			setVolume(100)
		} else setVolume(newVolume);
	}

	if(soundWaveRef.current) {
		// Don't remove! Will cause not loading soundwave properly.
	}

	useEffect(() => {
		if(audioStream.current) {
			if(isPlaying) {
				audioStream.current.pause();
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

	useEffect(() => {
		if(audioStream.current) {
			audioStream.current.volume = volume / 100;
		}
	}, [volume]);

	// 
	useEffect(() => {
		rdsCall();
		async function rdsCall() {
			if(radioStation?.id === "funradio" || radioStation?.id === "radiovlna") {
				// FunRadio Live / RadioVlna RDS
				setRdsString(await RDSfunvlna({ rdsUrl: radioStation.rdsUrl }));
			} else if(radioStation?.id === "funczsk" || radioStation?.id === "fundance" || radioStation?.id === "funchill") {
				// FunRadio CZSK / Dance / Chill RDS
				setRdsString(await RDSfunother({ rdsUrl: radioStation.rdsUrl }));
			} else if(radioStation?.id === "radioke") {
				// RadioKE RDS
				setRdsString(await RDSradioke({ rdsUrl: radioStation.rdsUrl }));
			} else {
				// No RDS
				setRdsString("RDS Unsupported");
			}
		}

		const rdsInterval = setInterval(rdsCall, 120000);
		return () => clearInterval(rdsInterval);
	}, []);

	// Copy Playing Now to Clipboard
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
			console.error("Unable to copy.", error);
		}

		document.body.removeChild(tempTextArea);
	}

	if(radioStation) {
		return (
			<>
				<AppHeader/>
				<section className="radio-player">
					<section className="radio-player-station">
						<img className="radio-player-avatar" src={radioStation.imgUrl}/>
						<h2 className="radio-player-name">{radioStation.name}</h2>
						<h3 className="radio-player-genre">{radioStation.genre}</h3>
						<p className="radio-player-info">{radioStation.info}</p>
					</section>

					<section className="radio-player-controls">
						{ isPlaying ? stopButton() : playButton() }
						<input type="range" value={volume.toString()} onChange={handleVolume} min={0} max={100} step={1} id="player-volume"/>
						<div className="volume-custom">
							<button id="volDec" className="player-volume-btn" onClick={decreaseVol}>-</button>
							<input type="number" value={volume.toString()} onChange={handleVolume} min={0} max={100} step={1} id="player-volume-numerical"/>
							<button id="volInc" className="player-volume-btn" onClick={increaseVol}>+</button>
						</div>
					</section>
		
					<audio src={radioStation.url} ref={audioStream} id="radio-source"></audio>

					<section className="radio-player-rds">
						<h2>Playing now</h2>
						<h3 className="radio-player-song" onClick={handleCopyNow}>{rdsString}</h3>
					</section>

					<div id="sound-wave" ref={soundWaveRef}>
						<div className="box box1"></div>
						<div className="box box2"></div>
						<div className="box box3"></div>
						<div className="box box4"></div>
						<div className="box box5"></div>
					</div>
				</section>
			</>
		)
	}

	return (
		<ErrorPage error="Radio Not Found"/>
	);
}

export default RadioPlayer;