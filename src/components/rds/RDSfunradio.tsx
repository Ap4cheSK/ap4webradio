import { useState } from "react";

interface funVlnaRdsFormat {
	Url: string;
}

function RDSfunvlna(rdsUrl: funVlnaRdsFormat) {
	const [XMLdoc, setXMLdoc] = useState<XMLDocument | null>(null);
	const xmlRequest = new XMLHttpRequest();
	xmlRequest.open("GET", rdsUrl.Url, true);
	xmlRequest.onreadystatechange = function () {
		const doc_live = xmlRequest.responseXML;
		setXMLdoc(doc_live);
	}
	xmlRequest.send(null);

	return (
		(XMLdoc?.getElementsByTagName("interpret")[1].childNodes[0].nodeValue + " - " + XMLdoc?.getElementsByTagName("skladba")[1].childNodes[0].nodeValue).normalize("NFD").replace(/[\u0300-\u036f]/g, "")
	);
}

export default RDSfunvlna;