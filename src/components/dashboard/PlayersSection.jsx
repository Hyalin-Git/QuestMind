"use client";
import styles from "@/styles/components/dashboard/playersSection.module.css";
import { montserrat, outfit } from "@/libs/font";
import PlayerList from "./PlayersList";
import { useActionState, useEffect, useState } from "react";
import { savePlayer } from "@/actions/players";

const initialState = {
	status: "pending",
	message: "",
};

export default function PlayersSection({ players, games, nationalities }) {
	const [addPlayerModal, setAddPlayerModal] = useState(false);
	const [state, formAction, pending] = useActionState(savePlayer, initialState);

	useEffect(() => {
		if (state?.status === "success") {
			setAddPlayerModal(false);
			alert(`${state?.message}`);
		}
		if (state?.status === "failure") {
			alert(`${state?.message}`);
		}
	}, [state]);

	return (
		<section className={`${montserrat.className} ${styles.container}`}>
			<h2>Joueurs</h2>
			<div className={styles.btn}>
				<button
					className={montserrat.className}
					onClick={(e) => setAddPlayerModal(true)}>
					Ajouter un joueur
				</button>
			</div>
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
				<PlayerList players={players} />
			</table>
			{addPlayerModal && (
				<>
					<div className={styles.modal} id="modal">
						<div className={styles["modal__header"]}>
							<span>Ajouter un joueur</span>
						</div>
						<form action={formAction} className={styles["modal__form"]}>
							<div>
								<label htmlFor="lastname">Nom de famille</label>
								<input type="text" id="lastname" name="lastname" />
							</div>
							<div>
								<label htmlFor="firstname">Prénom *</label>
								<input type="text" id="firstname" name="firstname" required />
							</div>
							<div>
								<label htmlFor="username">Pseudo *</label>
								<input type="text" id="username" name="username" required />
							</div>
							<div>
								<label htmlFor="picture">Photo de profil *</label>
								<input type="file" id="picture" name="picture" />
							</div>
							<div>
								<label htmlFor="game-select">Jeux *</label>
								<br />
								<select name="game" id="game-select">
									{games.map((game) => {
										return (
											<option value={game?.id} key={game?.id}>
												{game?.game}
											</option>
										);
									})}
								</select>
							</div>
							<div>
								<label htmlFor="region-select">Région *</label>
								<br />
								<select name="region" id="region-select">
									{nationalities.map((nationality) => {
										return (
											<option value={nationality?.id} key={nationality?.id}>
												{nationality?.region}
											</option>
										);
									})}
								</select>
							</div>
							<div>
								<label htmlFor="team">L'équipe *</label>
								<input type="text" id="team" name="team" />
							</div>
							<div>
								<label htmlFor="audience">Audience *</label>
								<input
									type="number"
									id="audience"
									name="audience"
									defaultValue={0}
									required
								/>
							</div>
							<div>
								<label htmlFor="x-url">Lien X</label>
								<input type="text" id="x-url" name="x-url" />
							</div>
							<div>
								<label htmlFor="twitch-url">Lien Twitch</label>
								<input type="text" id="twitch-url" name="twitch-url" />
							</div>
							<div>
								<label htmlFor="instagram-url">Lien Instagram</label>
								<input type="text" id="instagram-url" name="instagram-url" />
							</div>
							<div>
								<label htmlFor="youtube-url">Lien Youtube</label>
								<input type="text" id="youtube-url" name="youtube-url" />
							</div>
							<div>
								<label htmlFor="tiktok-url">Lien Tiktok</label>
								<input type="text" id="tiktok-url" name="tiktok-url" />
							</div>
							<div className={styles["form__buttons"]}>
								<button
									className={outfit.className}
									onClick={(e) => {
										e.preventDefault();
										setAddPlayerModal(false);
									}}>
									Annuler
								</button>
								<button
									className={outfit.className}
									disabled={pending}
									data-disabled={pending}>
									Ajouter
								</button>
							</div>
						</form>
					</div>
					<div id="layout" onClick={(e) => setAddPlayerModal(false)}></div>
				</>
			)}
		</section>
	);
}
