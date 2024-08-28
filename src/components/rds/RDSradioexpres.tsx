interface rdsFormat {
	rdsUrl: string;
}

async function RDSradioexpres(rdsUrl: rdsFormat) {
	const fetchRDS = await fetch(rdsUrl.rdsUrl);
	const rdsParse = JSON.parse(await fetchRDS.text());
	const rdsData: string = (rdsParse["current"].interpret) + " - " + (rdsParse["current"].song);
	return (rdsData);
}

export default RDSradioexpres;