import radioJsonList from "../assets/radios.json";
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import AppHeader from "./AppHeader";
import ErrorPage from "./ErrorPage";
import RDSradioke from "./rds/RDSradioke";
import RDSfunvlna from "./rds/RDSradiofunvlna";

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
	const [isPlaying, setIsPlaying] = useState(false);
	const [volume, setVolume] = useState(20);
	const [rdsString, setRdsString] = useState("");

	function handlePlay() {setIsPlaying(true)}
	function handleStop() {setIsPlaying(false)}
	function handleVolume(event: React.ChangeEvent<HTMLInputElement>) {setVolume(parseInt(event.target.value))}

	useEffect(() => {
		if(isPlaying) {
			audioStream.current?.load();
			audioStream.current?.play();
		} else {
			audioStream.current?.pause();
		}
	}, [isPlaying]);

	useEffect(() => {
		if(audioStream.current) audioStream.current.volume = volume / 100;
	}, [volume]);

	useEffect(() => {
		rdsCall();
		async function rdsCall() {
			if(radioStation?.id === "funradio" || radioStation?.id === "funczsk" || radioStation?.id === "fundance" || radioStation?.id === "funchill" || radioStation?.id === "radiovlna") {
				// FunRadio / RadioVlna RDS
				setRdsString(await RDSfunvlna({ rdsUrl: radioStation.rdsUrl }));
			} else if(radioStation?.id === "radioke") {
				// RadioKE RDS
				setRdsString(await RDSradioke({ rdsUrl: radioStation.rdsUrl }));
			} else {
				// No RDS
				setRdsString("RDS Unsupported");
			}
		}

		const rdsInterval = setInterval(rdsCall, 30000);
		return () => clearInterval(rdsInterval);
	});

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
						<input type="range" value={volume} onChange={handleVolume} id="player-volume"/>
					</section>
		
					<audio src={radioStation?.url} ref={audioStream} id="radio-source"></audio>

					<section className="radio-player-rds">
						<h2>Playing now</h2>
						<h3>{rdsString}</h3>
					</section>
				</section>
			</>
		)
	}

	return (
		<ErrorPage error="Radio Not Found"/>
	);
}

export default RadioPlayer;