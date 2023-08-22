interface rdsFormat {
	rdsUrl: string;
}

async function RDSfunother(rdsUrl: rdsFormat) {
	const fetchRDS = await fetch(rdsUrl.rdsUrl);
	const xmlParser = new DOMParser();
	const rdsParse = xmlParser.parseFromString(await fetchRDS.text(), "text/xml");
	const rdsData = (rdsParse.getElementsByTagName("interpret")[0].childNodes[0].nodeValue + " - " + rdsParse.getElementsByTagName("skladba")[0].childNodes[0].nodeValue).normalize("NFD").replace(/[\u0300-\u036f]/g, "");

	console.log(`AP4-RDS: ${rdsData}`);
	return (rdsData);
}

export default RDSfunother;