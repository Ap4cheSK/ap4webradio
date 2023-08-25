import { Link } from "react-router-dom";
import radioJsonList from "../assets/radios.json";
import AppHeader from "./AppHeader";

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
				<img className="radio-avatar" src={radioStation.station.imgUrl}/>
				<div>
					<h2 className="radio-name">{radioStation.station.name}</h2>
					<p className="radio-info">{radioStation.station.info}</p>
				</div>
			</div>
		</Link>
	);
}

function RadioList() {
	return (
		<>
			<AppHeader settingsBtn={true}/>
			<section>
				<h2 className="radio-list-group">RDS Supported</h2>
				<section className="radio-list">
					{radioJsonList.map(station => (
						station.rdsUrl ?
						<RadioItem key={station.id} station={
							{
								id: station.id,
								name: station.name,
								info: station.info,
								imgUrl: station.imgUrl
							}
						}/>
						: ""
					))}
				</section>
				<h2 className="radio-list-group">RDS Unsupported</h2>
				<section className="radio-list">
					{radioJsonList.map(station => (
						!station.rdsUrl ?
						<RadioItem key={station.id} station={
							{
								id: station.id,
								name: station.name,
								info: station.info,
								imgUrl: station.imgUrl
							}
						}/>
						: ""
					))}
				</section>
			</section>
		</>
	);
}

export default RadioList;