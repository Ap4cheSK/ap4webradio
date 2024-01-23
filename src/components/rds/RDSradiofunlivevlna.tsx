interface rdsFormat {
	rdsUrl: string;
}

async function RDSfunlivevlna(rdsUrl: rdsFormat) {
	const fetchRDS = await fetch(rdsUrl.rdsUrl);
	const xmlParser = new DOMParser();
	const rdsParse = xmlParser.parseFromString(await fetchRDS.text(), "text/xml");
	const rdsData = (rdsParse.getElementsByTagName("interpret")[1].childNodes[0].nodeValue + " - " + rdsParse.getElementsByTagName("skladba")[1].childNodes[0].nodeValue).normalize("NFD").replace(/[\u0300-\u036f]/g, "");

	return (rdsData);
}

export default RDSfunlivevlna;