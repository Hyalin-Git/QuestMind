"use client";
import styles from "@/styles/components/dashboard/playersSection.module.css";
import { montserrat } from "@/libs/font";
import PlayerList from "./PlayersList";
import { useState } from "react";
import FormPlayer from "./FormPlayer";

export default function PlayersSection({ players, games, nationalities }) {
	const [openModal, setOpenModal] = useState(false);
	const [selectedPlayer, setSelectedPlayer] = useState(null);



	const handleEditPlayer = (player) => {
		setSelectedPlayer(player);
		setOpenModal(true);
	};

	const handleCloseModal = () => {
		setOpenModal(false);
		setSelectedPlayer(null);
	};

	return (
		<section className={`${montserrat.className} ${styles.container}`}>
			<h2>Joueurs</h2>
			<div className={styles.btn}>
				<button
					className={montserrat.className}
					onClick={() => {
						setSelectedPlayer(null);
						setOpenModal(true);
					}}>
					Ajouter un joueur
				</button>
			</div>
			<div className={styles.tableContainer}>
				<table>
					<thead>
						<tr>
							<th scope="col">Prénom</th>
							<th scope="col">Nom</th>
							<th scope="col">Pseudo</th>
							<th scope="col">Photo de profil</th>
							<th scope="col">Région</th>
							<th scope="col">Jeu</th>
							<th scope="col">Équipe</th>
							<th scope="col">Réseaux sociaux</th>
							<th scope="col">Audience</th>
							<th scope="col">Date de création</th>
							<th scope="col">Date de mise à jour</th>
							<th scope="col">Actions</th>
						</tr>
					</thead>
					<PlayerList
						players={players}
						games={games}
						nationalities={nationalities}
						onEditPlayer={handleEditPlayer}
					/>
				</table>
			</div>
			{openModal && (
				<FormPlayer
					setOpenModal={handleCloseModal}
					player={selectedPlayer}
					games={games}
					nationalities={nationalities}
				/>
			)}
		</section>
	);
}
