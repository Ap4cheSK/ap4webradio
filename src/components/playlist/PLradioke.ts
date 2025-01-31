interface rdsFormat {
	rdsUrl: string;
}

function normalizeString(data: string | null) {
	if(data === null)
		return "";

	return data.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

type Song = {
	interpret: string;
	skladba: string;
	cas: string;
};

async function PLradioke(rdsUrl: rdsFormat) {
	const playlistData: Song[] = [];

	const fetchRDS = await fetch(rdsUrl.rdsUrl);
	const rdsParse = JSON.parse(await fetchRDS.text());

	rdsParse.items.forEach((song: { datetime: string | number | Date; title: any; }) => {
		const date = new Date(song.datetime);
		playlistData.push({
			interpret: normalizeString(song.title),
			skladba: "",
			cas: normalizeString(date.toTimeString().split(" ")[0]),
		});
	});

	return (playlistData);
}

export default PLradioke