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

	useEffect(() => {
		if(radioStation.rdsUrl === "") {
			setRdsString("");
			return;
		}

		// Start RDS Calls if RDS present
		rdsCall();
		async function rdsCall() {
			if(radioStation?.id === "funradio" || radioStation?.id === "radiovlna") {
				// FunRadio Live / RadioVlna RDS
				setRdsString(await RDSfunvlna({ rdsUrl: radioStation.rdsUrl }));
			} else if(radioStation?.id === "funczsk" || radioStation?.id === "fundance" || radioStation?.id === "funchill" || radioStation?.id === "radiovlnarock" || radioStation?.id === "radiovlnaparty" || radioStation?.id === "funleto" || radioStation?.id === "funretro" || radioStation?.id === "funmilenial") {
				// FunRadio CZSK / Dance / Chill / RadioVlnaRock / RadioVlnaParty RDS
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
			}
		}

		const rdsInterval = setInterval(rdsCall, 1000*60*3); // msec*sec*min
		return () => clearInterval(rdsInterval);
		// eslint-disable-next-line react-hooks/exhaustive-deps
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
	const { t } = useTranslation();
	
	useEffect(() => {
		const ls_dataSaving = localStorage.getItem("app_data_saving");
		if(ls_dataSaving && ls_dataSaving === "true") setUseDataSaving(true);
	}, []);

	return (
		<>
			<AppHeader settingsBtn={true}/>
			<section>
				<h2 className="radio-list-group">{t("rds_supp")}</h2>
				<section className="radio-list">
					{radioJsonList.map(station => (
						station.rdsUrl ?
						<RadioItem key={station.id} id={station.id} name={station.name} info={useDataSaving ? station.lowInfo : station.highInfo} imgUrl={station.imgUrl} rdsUrl={station.rdsUrl}/> : ""
					))}
				</section>
				<h2 className="radio-list-group">{t("rds_unsupp")}</h2>
				<section className="radio-list">
					{radioJsonList.map(station => (
						!station.rdsUrl ?
						<RadioItem key={station.id} id={station.id} name={station.name} info={useDataSaving ? station.lowInfo : station.highInfo} imgUrl={station.imgUrl} rdsUrl={""}/> : ""
					))}
				</section>
			</section>
			<AppFooter/>
		</>
	);
}

export default RadioList;