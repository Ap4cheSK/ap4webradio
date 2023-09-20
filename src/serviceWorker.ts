function registerServiceWorker() {
	if("serviceWorker" in navigator) {
		window.addEventListener("load", () => {
			navigator.serviceWorker.register("/assets/service-worker.js").then(registration => {
				console.log("Service worker registrated with scope:", registration.scope);
			}).catch(error => {
				console.error("Service worker registration failed:", error);
			});
		});
	}
}

export default registerServiceWorker;