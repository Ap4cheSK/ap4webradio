interface rdsFormat {
	rdsUrl: string;
}

async function RDSbestfm(rdsUrl: rdsFormat) {
	const fetchRDS = await fetch(rdsUrl.rdsUrl);
	const xmlParser = new DOMParser();
	const rdsParse = xmlParser.parseFromString(await fetchRDS.text(), "text/xml");
	const rdsData = (rdsParse.getElementsByClassName("streamdata")[8]).innerHTML.replace("&amp;", "&");
	return (rdsData);
}

export default RDSbestfm;