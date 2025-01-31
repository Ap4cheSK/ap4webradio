import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import radioJsonList from "../assets/radios.json";
import AppHeader from "./AppHeader";
import AppFooter from "./AppFooter";
import noImage from "../assets/noimage.webp";

import RDSradioke from "./rds/RDSradioke";
import RDSfunvlna from "./rds/RDSradiofunlivevlna";
import RDSfunother from "./rds/RDSradiofunother";
import RDSradioevropa2 from "./rds/RDSradioevropa2";
import RDSradiorock from "./rds/RDSradiorock";
import RDSradioeu2melody from "./rds/RDSradioeu2melody";
import RDSradioexpres from "./rds/RDSradioexpres";
import RDSbestfm from "./rds/RDSbestfm";

interface radioStationFormat {
	id: string;
	name: string;
	info: string;
	imgUrl: string;
	rdsUrl: string;
}

function RadioItem(radioStation:radioStationFormat) {
	const { t } = useTranslation();
	const [rdsString, setRdsString] = useState("");

	async function rdsCall() {
		switch (radioStation.id) {
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
				setRdsString("");
				break;
		}
	}

	useEffect(() => {
		rdsCall();
		const rdsInterval = setInterval(rdsCall, 1000*60*3);
		return () => clearInterval(rdsInterval);
	}, []);

	return (
		<Link to={`/radio/${radioStation.id}`}>
			<div className="radio-item">
				<img className="radio-avatar" src={radioStation.imgUrl ? radioStation.imgUrl : noImage} alt={radioStation.name}/>
				<div>
					<h2 className="radio-name">{radioStation.name}</h2>
					<p className="radio-info small-text">{radioStation.info}</p>
					{rdsString ? <p className="radio-rds small-text"><span className="playing-now">{t("playing_now")}:</span> {rdsString}</p> : ""}
				</div>
			</div>
		</Link>
	);
}

function RadioList() {
	const [useDataSaving, setUseDataSaving] = useState(false);
	// const { t } = useTranslation();
	
	useEffect(() => {
		const ls_dataSaving = localStorage.getItem("app_data_saving");
		if(ls_dataSaving && ls_dataSaving === "true") setUseDataSaving(true);
	}, []);

	return (
		<>
			<AppHeader settingsBtn={true}/>
			<section>
				<section className="radio-list">
					{radioJsonList.map(station => (
						station.rdsUrl ?
						<RadioItem key={station.id} id={station.id} name={station.name} info={useDataSaving ? station.lowInfo : station.highInfo} imgUrl={station.imgUrl} rdsUrl={station.rdsUrl}/> : ""
					))}
				</section>
				{/* <h2 className="radio-list-group">{t("rds_unsupp")}</h2>
				<section className="radio-list">
					{radioJsonList.map(station => (
						!station.rdsUrl ?
						<RadioItem key={station.id} id={station.id} name={station.name} info={useDataSaving ? station.lowInfo : station.highInfo} imgUrl={station.imgUrl} rdsUrl={""}/> : ""
					))}
				</section> */}
			</section>
			<AppFooter/>
		</>
	);
}

export default RadioList;