async function RDSradioke() {
	const ke_data = await fetch("https://www.tvkosice.sk/api/playlists/radiokosice?limit=1");
	const ke_song = JSON.parse(await ke_data.text());
	
	return (
		(ke_song.items[0].title).normalize("NFD").replace(/[\u0300-\u036f]/g, "")
	);
}

export default RDSradioke