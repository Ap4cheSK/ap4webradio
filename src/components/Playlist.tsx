import { useParams } from "react-router-dom";
import radioJsonList from "../assets/radios.json";
import { useTranslation } from "react-i18next";
import AppHeader from "./AppHeader";
import AppFooter from "./AppFooter";
import { useEffect, useState } from "react";
import PLfunother from "./playlist/PLradiofunother";
import PLradioeu2melody from "./playlist/PLradioeu2melody";
import PLradioke from "./playlist/PLradioke";
import PLradiorock from "./playlist/PLradiorock";
import PLfunlivevlna from "./playlist/PLradiofunlivevlna";

type Song = {
	interpret: string;
	skladba: string;
	cas: string;
};

function SongList({playlistData}: {playlistData: Song[]}) {
	return (
		<section className="playlist-wrapper">
			{playlistData.map((song, index) => (
				<div className="playlist-item" key={index}>
					<p className="playlist-timestamp">{song.cas}</p>
					<p className="playlist-interpret">{song.interpret}</p>
					<p className="playlist-song">{song.skladba}</p>
				</div>
			))}
		</section>
	);
}

function Playlist() {
	const [playlist, setPlaylist] = useState<Song[]>();

	const { radioid } = useParams();
	const radioStation = radioJsonList.find(radio => radio.id === radioid);
	const { t } = useTranslation();

	async function plCall() {
		switch (radioStation?.id) {
			case "funradio":
			case "radiovlna":
				setPlaylist(await PLfunlivevlna({ rdsUrl: radioStation.rdsUrl }));
				break;

			case "funczsk":
			case "fundance":
			case "funchill":
			case "radiovlnarock":
			case "radiovlnaparty":
			case "funleto":
			case "funretro":
			case "funmilenial":
				setPlaylist(await PLfunother({ rdsUrl: radioStation.rdsUrl }));
				break;

			case "radioeu2sk":
			case "radiomelody":
				setPlaylist(await PLradioeu2melody({ rdsUrl: radioStation.rdsUrl }));
				break;
		
			case "radioke":
				setPlaylist(await PLradioke({ rdsUrl: radioStation.rdsUrl }));
				break;

			case "radiorock":
				setPlaylist(await PLradiorock({ rdsUrl: radioStation.rdsUrl }));
				break;

			default:
				break;
		}
	}

	useEffect(() => {
		plCall();
	}, []);

	return (<>
		<AppHeader homeBtn={true} settingsBtn={true}/>

		<section className="radio-player">
			<h2>{radioStation?.name} Playlist</h2>

			{playlist ? <SongList playlistData={playlist}/> : <h3 className="pl-unsupported">{t("pl_unsupp")}</h3>}
		</section>

		<AppFooter/>
	</>)
}

export default Playlist;