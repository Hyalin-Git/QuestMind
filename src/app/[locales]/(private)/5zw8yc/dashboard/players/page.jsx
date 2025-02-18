"use server";
import { getGames } from "@/api/games";
import { getNationalities } from "@/api/nationalities";
import { getPlayersPerformances } from "@/api/performances";
import { getPlayers } from "@/api/players";
import { getTrendingPlayers } from "@/api/trending";
import Table from "@/components/dashboard/Table";

import styles from "@/styles/page/players.module.css";

export default async function Players() {
	const players = await getPlayers();
	const games = await getGames();
	const nationalities = await getNationalities();
	const playersTrending = await getTrendingPlayers();
	const playersPerformances = await getPlayersPerformances();

	console.log(playersPerformances);

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
					theads={theads}
					btnText={"Ajouter un joueur"}
					type={"player"}
				/>
				{/* Players Performances */}
				<div>
					<h1>Performances des joueurs</h1>
				</div>

				<Table
					data={playersPerformances?.data}
					players={players?.data}
					theads={["Pseudo", "Photo de profil", "performance", "Actions"]}
					btnText={"Ajouter une performance"}
					type={"performance"}
				/>

				<div>
					<h1>Gestions des joueurs en trending</h1>
				</div>

				<Table
					data={playersTrending?.data}
					players={players?.data}
					theads={["Pseudo", "Photo de profil", "position", "Actions"]}
					btnText={"Ajouter un joueur en trending"}
					type={"trending"}
				/>
			</div>
		</main>
	);
}
