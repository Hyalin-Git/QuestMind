"use server";
import { getNationalities } from "@/api/nationalities";
import Table from "@/components/dashboard/Table";
import styles from "@/styles/page/dashboard/game.module.css";

export default async function Region() {
	const nationalities = await getNationalities();

	const theads = [
		"Région",
		"Date de création",
		"Date de mise à jour",
		"Actions",
	];
	return (
		<main className={styles.main}>
			<div className={styles.container}>
				<div>
					<h1>Gestion des régions</h1>
				</div>
				{nationalities?.success && (
					<Table
						data={nationalities?.data}
						theads={theads}
						btnText={"Ajouter une région"}
						type={"region"}
					/>
				)}
			</div>
		</main>
	);
}
