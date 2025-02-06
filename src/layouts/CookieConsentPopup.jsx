import { roboto } from "@/libs/font";
import styles from "@/styles/layouts/cookie-consent-popup.module.css";

export default function CookieConsentPopup() {
	return (
		<div className={styles.container}>
			<p className={styles.text}>
				Nous utilisons des cookies pour améliorer votre expérience et mesurer
				notre audience. Vous pouvez accepter ou refuser leur utilisation.
			</p>
			<div className={styles.buttons}>
				<button className={`${styles.button} ${roboto.className}`}>
					Refuser
				</button>
				<button className={`${styles.button} ${roboto.className}`}>
					Accepter
				</button>
			</div>
		</div>
	);
}
