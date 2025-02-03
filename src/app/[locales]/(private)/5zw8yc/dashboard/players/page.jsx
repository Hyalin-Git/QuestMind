"use server";
import { getGames } from "@/api/games";
import { getNationalities } from "@/api/nationalities";
import { getPlayers } from "@/api/players";
import Table from "@/components/dashboard/Table";

import styles from "@/styles/page/players.module.css";

export default async function Players() {
	const players = await getPlayers();
	const games = await getGames();
	const nationalities = await getNationalities();

	console.log(players);

	const data = [];

	const theads = [
		"Prénom",
		"Nom",
		"Pseudo",
		"Photo de profil",
		"Région",
		"Jeu",
		"Équipe",
		"Réseaux sociaux",
		"Audience",
		"Date de création",
		"Date de mise à jour",
		"Actions",
	];

	return (
		<main className={styles.main}>
			<div className={styles.container}>
				{/* Header */}
				<div>
					<h1>Gestion des joueurs</h1>
				</div>
				{/* Players list */}
				<Table
					data={players?.data}
					games={games?.data}
					nationalities={nationalities?.data}
					section={"Joueurs"}
					theads={theads}
					btnText={"Ajouter un joueur"}
					type={"player"}
				/>
				{/* Players Performances */}
				<section>
					<h2>Performances des joueurs</h2>
				</section>
			</div>
		</main>
	);
}
