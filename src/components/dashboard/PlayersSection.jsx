import { montserrat } from "@/libs/font";
import Image from "next/image";

export default function PlayersSection({ players }) {
	return (
		<section className={montserrat.className}>
			<h2>Joueurs</h2>
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
				<tbody>
					{players?.map((player) => {
						const createdAt = player?.created_at?.split("T")[0];
						const updatedAt = player?.updated_at?.split("T")[0];
						return (
							<tr>
								<th scope="row">{player?.firstName}</th>
								<th>{player?.lastName || "null"}</th>
								<th>{player?.username}</th>
								<th>
									<Image
										src={player?.picture}
										width={50}
										height={50}
										quality={100}
										alt={`Photo de ${player?.username}`}
										style={{
											position: "relative",
											top: "1.5px",
											objectFit: "contain",
											borderRadius: "4px",
										}}
									/>
								</th>
								<th>{player?.region}</th>
								<th>{player?.game}</th>
								<th>{player?.team}</th>
								<th>{player?.team}</th>
								<th>{player?.audience}</th>
								<th>{createdAt}</th>
								<th>{updatedAt || "null"}</th>
								<th>Supprimer</th>
							</tr>
						);
					})}
				</tbody>
			</table>
		</section>
	);
}
