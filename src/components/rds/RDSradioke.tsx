interface rdsFormat {
	rdsUrl: string;
}

async function RDSradioke(rdsUrl: rdsFormat) {
	const fetchRDS = await fetch(rdsUrl.rdsUrl);
	const rdsParse = JSON.parse(await fetchRDS.text());
	const rdsData: string = (rdsParse.items[0].title).normalize("NFD").replace(/[\u0300-\u036f]/g, "");

	console.log(`AP4-RDS: ${rdsData}`);
	return (rdsData);
}

export default RDSradioke