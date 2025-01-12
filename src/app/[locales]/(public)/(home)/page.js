"use server";
import { getSponsors } from "@/api/sponsors";
import { getTrendingPlayers } from "@/api/trending";
import initTranslations from "@/app/i18n";
import Players from "@/components/players/Players";
import Sponsors from "@/components/sponsors/Sponsors";
import { outfit, roboto } from "@/libs/font";
import styles from "@/styles/page/home.module.css";
import Link from "next/link";

export default async function Home({ params }) {
	const { locales } = await params;
	const players = await getTrendingPlayers();
	const sponsors = await getSponsors();
	const { t } = await initTranslations(locales, ["common"]);

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
				<Players data={players?.data} />
			</div>
			<Sponsors data={sponsors} background={true} />
		</main>
	);
}
