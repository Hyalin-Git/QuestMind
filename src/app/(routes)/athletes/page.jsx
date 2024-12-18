"use server";
import { getGames } from "@/api/games";
import { getPlayers } from "@/api/players";
import Games from "@/components/games/Games";
import Player from "@/components/players/Player";
import { outfit } from "@/libs/font";
import styles from "@/styles/page/athletes.module.css";

export default async function Athletes({ searchParams }) {
	const queries = await searchParams;

	const players = await getPlayers();
	const games = await getGames();
	console.log(games);

	// console.log(players);
	return (
		<main className={styles.main}>
			<div></div>
			<div>
				<section className={styles.filters}>
					<div>
						<strong className={outfit.className}>Game</strong>
						<Games data={games?.data} />
						{/* Game filters */}
					</div>
					<div>
						<strong className={outfit.className}>Region</strong>
						{/* Region filters */}
						<div></div>
					</div>
				</section>
				{/* Athletes list */}
				<div className={styles.players}>
					{players?.data?.map((elt) => {
						return <Player elt={elt} key={elt.id} />;
					})}
				</div>
			</div>
			{/* Slogan */}
		</main>
	);
}
