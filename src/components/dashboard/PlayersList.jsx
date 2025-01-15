"use client";
import { deletePlayer } from "@/api/players";
import { faPenToSquare, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";

export default function PlayerList({ players, onEditPlayer }) {
	async function handleDeletePlayer(playerId) {
		const isConfirmed = window.confirm(
			"Voulez-vous vraimment supprimer ce joueur ? "
		);

		if (isConfirmed) {
			const res = await deletePlayer(playerId);

			if (res.success) {
				return alert("Joueur supprimé avec succès");
			} else {
				return alert(res.message || "Impossible de supprimer ce joueur");
			}
		}

		return;
	}

	return (
		<tbody>
			{players?.length > 0 &&
				players?.map((player) => {
					const hasTwitter = player?.x_url;
					const hasTwitch = player?.twitch_url;
					const hasInstagram = player?.instagram_url;
					const hasYoutube = player?.youtube_url;
					const hasTiktok = player?.tiktok_url;

					const createdAt = player?.created_at?.split("T")[0];
					const updatedAt = player?.updated_at?.split("T")[0];

					return (
						<tr key={player?.id}>
							<th scope="row">{player?.firstName}</th>
							<th>{player?.lastName}</th>
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
							<th>
								{hasTwitter && (
									<Link href={hasTwitter}>
										<Image
											src={"/twitter.svg"}
											width={20}
											height={20}
											alt="Twitter"
										/>
									</Link>
								)}
								{hasTwitch && (
									<Link href={hasTwitch}>
										<Image
											src={"/twitch.svg"}
											width={20}
											height={20}
											alt="Twitch"
										/>
									</Link>
								)}
								{hasInstagram && (
									<Link href={hasInstagram}>
										<Image
											src={"/instagram.svg"}
											width={20}
											height={20}
											alt="Instagram"
										/>
									</Link>
								)}
								{hasYoutube && (
									<Link href={hasYoutube}>
										<Image
											src={"/youtube.svg"}
											width={20}
											height={20}
											alt="Youtube"
										/>
									</Link>
								)}
								{hasTiktok && (
									<Link href={hasTiktok}>
										<Image
											src={"/tiktok.svg"}
											width={20}
											height={20}
											alt="Tiktok"
										/>
									</Link>
								)}
							</th>
							<th>{player?.audience}</th>
							<th>{createdAt}</th>
							<th>{updatedAt}</th>
							<th>
								<FontAwesomeIcon
									icon={faPenToSquare}
									onClick={() => onEditPlayer(player)}
								/>
								<FontAwesomeIcon
									icon={faXmark}
									onClick={() => handleDeletePlayer(player?.id)}
								/>
							</th>
						</tr>
					);
				})}
		</tbody>
	);
}
