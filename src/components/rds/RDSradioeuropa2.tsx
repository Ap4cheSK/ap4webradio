interface rdsFormat {
	rdsUrl: string;
}

async function RDSradioeuropa2(rdsUrl: rdsFormat) {
	const fetchRDS = await fetch(rdsUrl.rdsUrl);
	const rdsParse = JSON.parse(await fetchRDS.text());
	const rdsData: string = (rdsParse[0].artist) + " - " + (rdsParse[0].title);
	return (rdsData);
}

export default RDSradioeuropa2;