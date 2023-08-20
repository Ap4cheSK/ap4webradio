import { Link } from "react-router-dom";
import radioJsonList from "../assets/radios.json";
import AppHeader from "./AppHeader";

interface radioStationFormat {
	station: {
		id: string;
		name: string;
		genre: string;
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
					<h3 className="radio-genre">{radioStation.station.genre}</h3>
					<p className="radio-info">{radioStation.station.info}</p>
				</div>
			</div>
		</Link>
	);
}

function RadioList() {
	return (
		<>
			<AppHeader/>
			<section className="radio-list">
				{radioJsonList.map(station => (
					<RadioItem key={station.id} station={
						{
							id: station.id,
							name: station.name,
							genre: station.genre,
							info: station.info,
							imgUrl: station.imgUrl
						}
					}/>
				))}
			</section>
		</>
	);
}

export default RadioList;