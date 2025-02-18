import Header from "@/layouts/Header";
import "@/styles/globals.css";
import { montserrat } from "@/libs/font";
import FakeLoading from "@/components/FakeLoading";
import Footer from "@/layouts/Footer";
import initTranslations from "@/app/i18n";
import TranslationsProvider from "@/app/TranslationsProvider";
import Head from "next/head";
import CookieConsentPopup from "@/layouts/CookieConsentPopup";
import Script from "next/script";
import { cookies } from "next/headers";
import HeadComponenent from "@/components/HeadComponent";

const i18nNamespaces = ["common"];

export const metadata = {
	title: "Questmind",
	description:
		"Questmind a été fondé par une passion commune pour l’esport, nourrie au fil des années par une expérience riche et un réseau solide dans l’industrie. Nous comprenons les exigences du jeu compétitif et les défis spécifiques auxquels les joueurs font face. Notre équipe d’experts, véritablement immergée dans l’univers de l’esport, s'engage à accompagner chaque joueur dans la construction d’une carrière réussie et pérenne.",
	keywords: ["Questmind", "Inspiring", "Talent", "esport"],
};

export default async function RootLayout({ children, params }) {
	const { locales } = await params;
	const { resources } = await initTranslations(locales, ["common"]);

	return (
		<TranslationsProvider
			resources={resources}
			locale={locales}
			namespaces={i18nNamespaces}>
			<html lang={locales}>
				<HeadComponenent />
				<body className={montserrat.className} id="services">
					<FakeLoading />
					<Header />
					{children}
					<Footer />
					<CookieConsentPopup />
				</body>
			</html>
		</TranslationsProvider>
	);
}
