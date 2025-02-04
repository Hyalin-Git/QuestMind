"use server";
import { getGames } from "@/api/games";
import Table from "@/components/dashboard/Table";
import styles from "@/styles/page/dashboard/game.module.css";

export default async function Games() {
	const games = await getGames();
	const theads = [
		"Jeu",
		"Photo",
		"Jeu mobile",
		"Date de création",
		"Date de mise à jour",
		"Actions",
	];

	return (
		<main className={styles.main}>
			<div className={styles.container}>
				<div>
					<h1>Gestion des jeux</h1>
				</div>
				{games?.success && (
					<Table
						data={games?.data}
						theads={theads}
						btnText={"Ajouter un jeu"}
						type={"game"}
					/>
				)}
			</div>
		</main>
	);
}
