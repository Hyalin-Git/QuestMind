"use client";
import styles from "@/styles/components/dashboard/gamesSection.module.css";
import { faPenToSquare, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { useState } from "react";
import FormGames from "./FormGames";

export default function GamesSection({ games }) {
	const [addGame, setAddGame] = useState(false);
	console.log(games);
	return (
		<div className={styles.container}>
			<div className={styles.btn}>
				<button onClick={(e) => setAddGame(true)}>Ajouter un jeu</button>
			</div>
			<div>
				<table>
					<thead>
						<tr>
							<th scope="col">Jeu</th>
							<th scope="col">Photo</th>
							<th scope="col">Jeu mobile</th>
							<th scope="col">Actions</th>
						</tr>
					</thead>
					<tbody>
						{games?.length > 0 &&
							games?.map((game) => {
								return (
									<tr key={game?.id}>
										<th scope="row">{game?.game}</th>
										<th>
											{game?.picture && (
												<Image
													src={game?.picture}
													width={50}
													height={50}
													quality={100}
													alt={`Photo de ${game?.game}`}
													style={{
														position: "relative",
														top: "1.5px",
														objectFit: "contain",
														borderRadius: "4px",
													}}
												/>
											)}
										</th>
										<th>{game?.is_mobile ? "Oui" : "Non"}</th>
										<th>
											<FontAwesomeIcon icon={faPenToSquare} />
											<FontAwesomeIcon icon={faXmark} />
										</th>
									</tr>
								);
							})}
					</tbody>
				</table>
			</div>
			{addGame && <FormGames />}
		</div>
	);
}
