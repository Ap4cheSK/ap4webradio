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

async function PLfunother(rdsUrl: rdsFormat) {
	const playlistData: Song[] = [];

	const fetchRDS = await fetch(rdsUrl.rdsUrl);
	const xmlParser = new DOMParser();
	const rdsParse = xmlParser.parseFromString(await fetchRDS.text(), "text/xml");

	let index = 0;
	while(true) {
		if(rdsParse.getElementsByTagName("interpret")[index] === undefined)
			break;
		
		playlistData.push({
			interpret: normalizeString(rdsParse.getElementsByTagName("interpret")[index].childNodes[0].nodeValue),
			skladba: normalizeString(rdsParse.getElementsByTagName("skladba")[index].childNodes[0].nodeValue),
			cas: normalizeString(rdsParse.getElementsByTagName("time")[index].childNodes[0].nodeValue),
		});

		index++;
	}

	return playlistData;
}

export default PLfunother;