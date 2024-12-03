"use server";
import { getTrendingPlayers } from "@/api/trending";
import Cards from "@/components/cards/Cards";
import { outfit, roboto } from "@/libs/font";
import styles from "@/styles/page/home.module.css";
import {
	faCircleArrowLeft,
	faCircleArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default async function Home() {
	const players = await getTrendingPlayers();

	console.log(players);

	return (
		<main className={styles.container}>
			{/* Heading */}
			<div className={styles.header}>
				<h1 className={outfit.className}>
					Inspiring <span>Talent</span>. Achieving <span>Excellence</span>.
				</h1>
				<p>Turning Gamers into Icons and Passion into Opportunity.</p>
				<button className={roboto.className}>contact us</button>
			</div>
			{/* Trending players */}
			<div className={styles.trending}>
				<FontAwesomeIcon icon={faCircleArrowLeft} />
				<Cards data={players?.data} />
				<FontAwesomeIcon icon={faCircleArrowRight} />
			</div>
		</main>
	);
}
