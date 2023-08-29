interface rdsFormat {
	rdsUrl: string;
}

async function RDSradiorock(rdsUrl: rdsFormat) {
	const fetchRDS = await fetch(rdsUrl.rdsUrl);
	const rdsParse = JSON.parse(await fetchRDS.text());
	const rdsData: string = (rdsParse[0].artist).normalize("NFD").replace(/[\u0300-\u036f]/g, "") + " - " + (rdsParse[0].title).normalize("NFD").replace(/[\u0300-\u036f]/g, "");

	console.log(`AP4-RDS: ${rdsData}`);
	return (rdsData);
}

export default RDSradiorock;