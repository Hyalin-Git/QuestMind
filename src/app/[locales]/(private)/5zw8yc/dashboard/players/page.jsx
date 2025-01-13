"use server";
import { getPlayers } from "@/api/players";
import PlayersSection from "@/components/dashboard/PlayersSection";
import styles from "@/styles/page/players.module.css";

export default async function Players() {
	const players = await getPlayers();

	return (
		<main className={styles.main}>
			<div className={styles.container}>
				{/* Header */}
				<div>
					<h1>Gestion des joueurs</h1>
				</div>
				{/* Players list */}
				<PlayersSection players={players?.data} />
				{/* Players Performances */}
				<section>
					<h2>Performances des joueurs</h2>
				</section>
			</div>
		</main>
	);
}
