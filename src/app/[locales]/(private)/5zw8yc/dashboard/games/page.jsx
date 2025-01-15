"use server";
import { getGames } from "@/api/games";
import GamesSection from "@/components/dashboard/games/GamesSection";
import styles from "@/styles/page/dashboard/game.module.css";

export default async function Games() {
	const games = await getGames();

	return (
		<main className={styles.main}>
			<div className={styles.container}>
				<div>
					<h1>Gestion des jeux</h1>
				</div>
				{games?.success && <GamesSection games={games?.data} />}
			</div>
		</main>
	);
}
