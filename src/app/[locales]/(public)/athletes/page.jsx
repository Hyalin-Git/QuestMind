import { getGames } from "@/api/games";
import { getNationalities } from "@/api/nationalities";
import { getPlayers } from "@/api/players";
import Games from "@/components/games/Games";
import Player from "@/components/players/Player";
import Regions from "@/components/regions/Regions";
import { outfit } from "@/libs/font";
import { isNotEmpty } from "@/libs/utils";
import styles from "@/styles/page/athletes.module.css";
import React from "react";

// Définir la revalidation ISR
export const revalidate = 120;

export default async function Athletes({ searchParams }) {
	const queries = await searchParams;

	// Lancer les appels API en parallèle
	const [players, games, nationalities] = await Promise.all([
		getPlayers(queries?.game, queries?.is_mobile, queries?.region),
		getGames(),
		getNationalities(),
	]);

	// Regroupement des joueurs par jeu
	const groupedPlayers = players?.data?.reduce((acc, player) => {
		if (!acc[player.game]) {
			acc[player.game] = [];
		}
		acc[player.game].push(player);
		return acc;
	}, {});

	return (
		<main className={styles.main}>
			<div className={styles.background}></div>
			<div>
				<section className={styles.filters}>
					{/* Filtres des jeux */}
					<div>{isNotEmpty(games?.data) && <Games data={games?.data} />}</div>
					{/* Filtres des régions */}
					<div>
						{isNotEmpty(nationalities?.data) && (
							<Regions data={nationalities?.data} />
						)}
					</div>
				</section>
				{/* Liste des athlètes */}
				{isNotEmpty(players?.data) && (
					<div className={styles.players}>
						{groupedPlayers &&
							Object.entries(groupedPlayers).map(([game, players]) => (
								<React.Fragment key={game}>
									{players.map((elt) => (
										<Player elt={elt} key={elt.id} />
									))}
								</React.Fragment>
							))}
					</div>
				)}
			</div>
			{/* Slogan */}
			<div className={styles.slogan}>
				<p className={outfit.className}>
					Inspiring <span>Talent</span>. Achieving <span>Excellence</span>.
				</p>
				<p>Turning Gamers into Icons and Passion into Opportunity.</p>
			</div>
		</main>
	);
}
