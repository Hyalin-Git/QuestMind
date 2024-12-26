"use server";
import { getGames } from "@/api/games";
import { getNationalities } from "@/api/nationalities";
import { getPlayers } from "@/api/players";
import Games from "@/components/games/Games";
import Player from "@/components/players/Player";
import Regions from "@/components/regions/Regions";
import { outfit } from "@/libs/font";
import styles from "@/styles/page/athletes.module.css";

export default async function Athletes({ searchParams }) {
	const queries = await searchParams;

	const players = await getPlayers(queries?.game, queries.region);
	const games = await getGames();
	const nationalities = await getNationalities();

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
					{players?.data?.map((elt) => {
						return <Player elt={elt} key={elt.id} />;
					})}
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
