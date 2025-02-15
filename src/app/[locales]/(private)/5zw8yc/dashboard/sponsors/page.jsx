"use server";
import { getSponsors } from "@/api/sponsors";
import Table from "@/components/dashboard/Table";
import styles from "@/styles/page/dashboard/game.module.css";

export default async function Sponsors() {
	const sponsors = await getSponsors();

	const theads = [
		"Sponsor",
		"Photo",
		"Date de création",
		"Date de mise à jour",
		"Actions",
	];
	return (
		<main className={styles.main}>
			<div className={styles.container}>
				<div>
					<h1>Gestion des sponsors</h1>
				</div>
				{sponsors?.success && (
					<Table
						data={sponsors?.data}
						theads={theads}
						btnText={"Ajouter un sponsor"}
						type={"sponsor"}
					/>
				)}
			</div>
		</main>
	);
}
