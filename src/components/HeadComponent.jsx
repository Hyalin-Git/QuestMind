"use client";
import { getCookie } from "cookies-next";
import Script from "next/script";
import { useEffect, useState } from "react";

export default function HeadComponent() {
	const [hasConsent, setHasConsent] = useState(false);

	useEffect(() => {
		const checkConsent = () => {
			const cookie = getCookie("cookie_consent");
			setHasConsent(cookie === "true");
		};

		// Vérifier une première fois
		checkConsent();

		// Ajouter un event listener pour surveiller les changements de cookies
		const interval = setInterval(checkConsent, 500);

		// Nettoyer l'intervalle lors du démontage du composant
		return () => clearInterval(interval);
	}, []);

	return (
		<>
			{hasConsent && (
				<>
					{/* Google Analytics */}
					<Script
						async
						src="https://www.googletagmanager.com/gtag/js?id=G-YXSTR4XRT5"></Script>
					<Script id="google-analytics">
						{`
					  window.dataLayer = window.dataLayer || [];
						function gtag(){dataLayer.push(arguments);}
						gtag('js', new Date());

						gtag('config', 'G-YXSTR4XRT5');
						`}
					</Script>
				</>
			)}
		</>
	);
}
