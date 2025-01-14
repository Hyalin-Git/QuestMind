"use server";
import { getGames } from "@/api/games";
import { getNationalities } from "@/api/nationalities";
import { getPlayers } from "@/api/players";
import Games from "@/components/games/Games";
import Player from "@/components/players/Player";
import Regions from "@/components/regions/Regions";
import { outfit } from "@/libs/font";
import styles from "@/styles/page/athletes.module.css";
import React from "react";

export default async function Athletes({ searchParams }) {
	const queries = await searchParams;

	const players = await getPlayers(
		queries?.game,
		queries?.is_mobile,
		queries.region
	);
	const games = await getGames();
	const nationalities = await getNationalities();

	// Group players by games
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
					{/* Game filters */}
					<div>
						<Games data={games?.data} />
					</div>
					{/* Region filters */}
					<div>
						<Regions data={nationalities?.data} />
					</div>
				</section>
				{/* Athletes list */}
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
