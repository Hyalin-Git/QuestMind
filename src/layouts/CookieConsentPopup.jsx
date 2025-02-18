"use client";
import { roboto } from "@/libs/font";
import styles from "@/styles/layouts/cookie-consent-popup.module.css";
import { getCookie, setCookie } from "cookies-next";
import { useEffect, useState } from "react";

export default function CookieConsentPopup() {
	const [showPopup, setShowPopup] = useState(false);

	// Vérifier si le cookie existe déjà
	useEffect(() => {
		const consentGiven = getCookie("cookie_consent");
		if (!consentGiven) {
			setShowPopup(true); // Afficher la popup si le consentement n'est pas encore donné
		}
	}, []);

	function handleAccept() {
		// Accept cookies
		setCookie("cookie_consent", "true", {
			maxAge: 60 * 60 * 24 * 365, // 1 an en secondes
			path: "/", // Disponible sur tout le site
		});
		setShowPopup(false);
	}

	function handleDecline() {
		// Optionnel : Stocker un refus pour éviter de redemander à chaque visite
		setCookie("cookie_consent", "false", {
			maxAge: 60 * 60 * 24 * 365,
			path: "/",
		});
		setShowPopup(false);
	}

	if (!showPopup) return null;

	return (
		<div className={styles.container}>
			<p className={styles.text}>
				Nous utilisons des cookies pour améliorer votre expérience et mesurer
				notre audience. Vous pouvez accepter ou refuser leur utilisation.
			</p>
			<div className={styles.buttons}>
				<button
					className={`${styles.button} ${roboto.className}`}
					onClick={handleDecline}>
					Refuser
				</button>
				<button
					className={`${styles.button} ${roboto.className}`}
					onClick={handleAccept}>
					Accepter
				</button>
			</div>
		</div>
	);
}
