import { roboto } from "@/libs/font";
import styles from "@/styles/layouts/cookie-consent-popup.module.css";

export default function CookieConsentPopup() {
	return (
		<div className={styles.container}>
			<p>
				Nous utilisons des cookies pour améliorer votre expérience sur notre
				site, analyser le trafic et personnaliser le contenu. En continuant à
				utiliser ce site, vous acceptez notre utilisation des cookies.
			</p>
			<div className={styles.buttons}>
				<button className={roboto.className}>Refuser</button>
				<button className={roboto.className}>Accepter</button>
			</div>
		</div>
	);
}
