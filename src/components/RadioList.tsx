import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import radioJsonList from "../assets/radios.json";
import AppHeader from "./AppHeader";
import noImage from "../assets/noimage.jpg";
import AppFooter from "./AppFooter";

interface radioStationFormat {
	station: {
		id: string;
		name: string;
		info: string;
		imgUrl: string;
	}
}

function RadioItem(radioStation:radioStationFormat) {
	return (
		<Link to={"/radioweb/radio/" + radioStation.station.id}>
			<div className="radio-item">
				<img className="radio-avatar" src={radioStation.station.imgUrl ? radioStation.station.imgUrl : noImage}/>
				<div>
					<h2 className="radio-name">{radioStation.station.name}</h2>
					<p className="radio-info">{radioStation.station.info}</p>
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
						<RadioItem key={station.id} station={
							{
								id: station.id,
								name: station.name,
								info: useDataSaving ? station.lowInfo : station.highInfo,
								imgUrl: station.imgUrl
							}
						}/>
						: ""
					))}
				</section>
				<h2 className="radio-list-group">{t("rds_unsupp")}</h2>
				<section className="radio-list">
					{radioJsonList.map(station => (
						!station.rdsUrl ?
						<RadioItem key={station.id} station={
							{
								id: station.id,
								name: station.name,
								info: useDataSaving ? station.lowInfo : station.highInfo,
								imgUrl: station.imgUrl
							}
						}/>
						: ""
					))}
				</section>
			</section>
			<AppFooter/>
		</>
	);
}

export default RadioList;