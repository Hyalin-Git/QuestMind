"use server";
import { getUsers } from "@/api/users";
import Table from "@/components/dashboard/Table";
import styles from "@/styles/page/dashboard/game.module.css";

export default async function Users() {
	const users = await getUsers();
	const theads = [
		"Utilisateur",
		"Rôle",
		"Date de création",
		"Date de mise à jour",
		"Actions",
	];
	return (
		<main className={styles.main}>
			<div className={styles.container}>
				<div>
					<h1>Gestion des utilisateurs</h1>
				</div>
				{users?.success && (
					<Table
						data={users?.data}
						theads={theads}
						btnText={"Ajouter un utilisateur"}
						type={"users"}
					/>
				)}
			</div>
		</main>
	);
}
