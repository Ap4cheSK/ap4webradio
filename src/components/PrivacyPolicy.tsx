import AppHeader from "./AppHeader";
import AppFooter from "./AppFooter";

function PrivacyPolicy() {
	return (
		<>
			<AppHeader homeBtn={true} settingsBtn={true}/>

			<section className="privacy-policy">
				<h2 className="page-header">Privacy Policy</h2>
				<p>Last updated: 27th August 2023</p>

				<p>This Privacy Policy describes Our policies and procedures on the collection, use and disclosure of Your information when You use the Service and tells You about Your privacy rights and how the law protects You.</p>

				<p>We do not collect Your Personal data. All data that is needed to improve the Service provided to you, is stored at your Computer, Mobile phone or any other device using technology "LocalStorage".</p>

				<p><b>Device</b> is any device as Computer, mobile phone or any other device that can connect to website and use it.</p>

				<p><b>Cookies</b> are small files that are placed on Your Device by a website, containing the details of Your browsing history and/or settings on that website among its many uses.</p>

				<p><b>LocalStorage</b> is a type of <b>Cookies</b> which are stored only on your device and are not signed or created by Service provider (Server).</p>

				<h3>Data Collecting</h3>

				<p>Data needed to improve Service provided to you are explicitly stored on your Device, which means, Provider of Service do not have access to these data.</p>

				<h3>Types of Usage Data collected</h3>

				<p>Settings in the application which improves experience using Service</p>

				<h3>Agreement</h3>

				<p>You are agreeing to these Policies by using this Service</p>
			</section>

			<AppFooter/>
		</>
	);
}

export default PrivacyPolicy;