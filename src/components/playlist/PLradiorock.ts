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

async function PLradiorock(rdsUrl: rdsFormat) {
	const playlistData: Song[] = [];

	const fetchRDS = await fetch(rdsUrl.rdsUrl);
	const rdsParse = JSON.parse(await fetchRDS.text());

	rdsParse.forEach((song: { date: string | number | Date; artist: string; title: string; }) => {
		const date = new Date(song.date);
		playlistData.push({
			interpret: normalizeString(song.artist),
			skladba: normalizeString(song.title),
			cas: normalizeString(date.toTimeString().split(" ")[0]),
		});
	});

	return (playlistData);
}

export default PLradiorock;