import { getTrendingPlayers } from "@/api/trending";
import Cards from "@/components/cards/Cards";
import { outfit, roboto } from "@/libs/font";
import styles from "@/styles/page/home.module.css";
export default async function Home() {
	const players = await getTrendingPlayers();

	return (
		<main className={styles.container}>
			<div className={styles.header}>
				<div>
					<h1 className={outfit.className}>
						Inspiring <span>Talent</span>. Achieving <span>Excellence</span>.
					</h1>
					<p>Turning Gamers into Icons and Passion into Opportunity.</p>
				</div>
				<div>
					<button className={roboto.className}>contact us</button>
				</div>
			</div>
			{/* Trending players */}
			<div>
				<Cards data={players} />
			</div>
		</main>
	);
}
