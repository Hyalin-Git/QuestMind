"use server";
import { getSponsors } from "@/api/sponsors";
import { getTrendingPlayers } from "@/api/trending";
import Cards from "@/components/cards/Cards";
import Sponsors from "@/components/sponsors/Sponsors";
import { outfit, roboto } from "@/libs/font";
import styles from "@/styles/page/home.module.css";
import {
	faCircleArrowLeft,
	faCircleArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";

export default async function Home() {
	const players = await getTrendingPlayers();
	const sponsors = await getSponsors();

	console.log(players);

	return (
		<main className={styles.container}>
			{/* background */}
			{/* <div id="square-top">
				<Image
					src={"/square-top.svg"}
					width={1200}
					height={1200}
					alt="Background noir"
				/>
			</div> */}
			<div id="dark-bg">
				<Image src={"/dark-bg.svg"} fill alt="Background noir" />
			</div>
			<div id="yellow-bg">
				<Image
					src={"/yellow-bg.svg"}
					width={600}
					height={600}
					alt="Background jaune"
				/>
			</div>
			{/* Heading */}
			<div className={styles.header}>
				<h1 className={outfit.className}>
					Inspiring <span>Talent</span>. Achieving <span>Excellence</span>.
				</h1>
				<p>Turning Gamers into Icons and Passion into Opportunity.</p>
				<button className={roboto.className}>contact</button>
			</div>
			{/* Trending players */}
			<div className={styles.trending}>
				<Cards data={players?.data} />
			</div>
			<Sponsors data={sponsors} />
			<div id="square-bottom"></div>
		</main>
	);
}
