import Header from "@/layouts/Header";
import "@/styles/globals.css";
import { montserrat } from "@/libs/font";
import FakeLoading from "@/components/FakeLoading";
import Footer from "@/layouts/Footer";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import initTranslations from "@/app/i18n";
import TranslationsProvider from "@/app/TranslationsProvider";

const i18nNamespaces = ["common"];

export const metadata = {
	title: "QuestMind",
	description: "Generated by create next app",
};

export default async function RootLayout({ children, params }) {
	const { locales } = await params;
	const { t, resources } = await initTranslations(locales, ["common"]);

	return (
		<TranslationsProvider
			resources={resources}
			locale={locales}
			namespaces={i18nNamespaces}>
			<html lang="fr">
				<body className={montserrat.className} id="services">
					<FakeLoading />
					<Header />
					{children}
					<Footer />
				</body>
			</html>
		</TranslationsProvider>
	);
}
