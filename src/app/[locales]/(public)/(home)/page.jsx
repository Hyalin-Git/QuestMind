import { getSponsors } from "@/api/sponsors";
import { getTrendingPlayers } from "@/api/trending";
import initTranslations from "@/app/i18n";
import Players from "@/components/players/Players";
import Sponsors from "@/components/sponsors/Sponsors";
import { outfit, roboto } from "@/libs/font";
import { isNotEmpty } from "@/libs/utils";
import styles from "@/styles/page/home.module.css";
import Link from "next/link";

export const revalidate = 120;

export default async function Home({ params }) {
	const { locales } = await params;

	// Lancer les appels API en parallèle
	const [players, sponsors, translations] = await Promise.all([
		getTrendingPlayers(),
		getSponsors(),
		initTranslations(locales, ["common"]),
	]);

	const { t } = translations;

	return (
		<main className={styles.container}>
			<div className={styles.background}></div>
			{/* Heading */}
			<div className={styles.header}>
				<h1 className={outfit.className}>
					Inspiring <span>Talent</span>. Achieving <span>Excellence</span>.
				</h1>
				<p>Turning Gamers into Icons and Passion into Opportunity.</p>
				<Link href={"/contact"}>
					<button id="contact" className={roboto.className}>
						{t("btnContact")}
					</button>
				</Link>
			</div>
			{/* Trending players */}
			<div className={styles.trending}>
				{isNotEmpty(players?.data) && <Players data={players?.data} />}
			</div>
			{isNotEmpty(sponsors?.data) && (
				<Sponsors data={sponsors} background={true} />
			)}
		</main>
	);
}
