import styles from "@/styles/components/dashboard/formPlayer.module.css";
import { savePlayer, updatePlayer } from "@/actions/players";
import { outfit } from "@/libs/font";
import { useActionState, useEffect } from "react";

const initialState = {
	status: "pending",
	message: "",
	errors: null,
};

export default function FormPlayer({
	setOpenModal,
	player,
	games,
	nationalities,
}) {
	const hasPlayer = player !== null;
	const [state, formAction, pending] = useActionState(
		hasPlayer ? updatePlayer : savePlayer,
		initialState
	);
	const errors = state?.errors;

	useEffect(() => {
		if (state?.status === "success") {
			setOpenModal(false);
			alert(`${state?.message}`);
		}

		if (state?.status === "failure") {
			alert(`${state?.message}`);
		}
	}, [state]);
	return (
		<>
			<div className={styles.container} id="modal">
				<div className={styles.header}>
					<span>Ajouter un joueur</span>
				</div>
				<form action={formAction} className={styles.form}>
					<div>
						<label htmlFor="lastname">Nom de famille</label>
						<input
							type="text"
							id="lastname"
							name="lastname"
							defaultValue={player?.lastName}
						/>
						{errors?.lastname && <i>{errors?.lastname[0]}</i>}
					</div>
					<div>
						<label htmlFor="firstname">Prénom *</label>
						<input
							type="text"
							id="firstname"
							name="firstname"
							required
							defaultValue={player?.firstName}
						/>
						{errors?.firstname && <i>{errors?.firstname[0]}</i>}
					</div>
					<div>
						<label htmlFor="username">Pseudo *</label>
						<input
							type="text"
							id="username"
							name="username"
							required
							defaultValue={player?.username}
						/>
						{errors?.username && <i>{errors?.username[0]}</i>}
					</div>
					<div>
						<label htmlFor="picture">Photo de profil *</label>
						<input type="file" id="picture" name="picture" />
						{errors?.picture && <i>{errors?.picture[0]}</i>}
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
						<input
							type="text"
							id="team"
							name="team"
							required
							defaultValue={player?.team}
						/>
						{errors?.team && <i>{errors?.team[0]}</i>}
					</div>
					<div>
						<label htmlFor="audience">Audience *</label>
						<input
							type="number"
							id="audience"
							name="audience"
							defaultValue={player ? player?.audience : 0}
							required
						/>
						{errors?.audience && <i>{errors?.audience[0]}</i>}
					</div>
					<div>
						<label htmlFor="x-url">Lien X</label>
						<input
							type="text"
							id="x-url"
							name="x-url"
							defaultValue={player?.x_url}
						/>
						{errors?.xUrl && <i>{errors?.xUrl[0]}</i>}
					</div>
					<div>
						<label htmlFor="twitch-url">Lien Twitch</label>
						<input
							type="text"
							id="twitch-url"
							name="twitch-url"
							defaultValue={player?.twitch_url}
						/>
						{errors?.twitchUrl && <i>{errors?.twitchUrl[0]}</i>}
					</div>
					<div>
						<label htmlFor="instagram-url">Lien Instagram</label>
						<input
							type="text"
							id="instagram-url"
							name="instagram-url"
							defaultValue={player?.instagram_url}
						/>
						{errors?.instagramUrl && <i>{errors?.instagramUrl[0]}</i>}
					</div>
					<div>
						<label htmlFor="youtube-url">Lien Youtube</label>
						<input
							type="text"
							id="youtube-url"
							name="youtube-url"
							defaultValue={player?.youtube_url}
						/>
						{errors?.youtubeUrl && <i>{errors?.youtubeUrl[0]}</i>}
					</div>
					<div>
						<label htmlFor="tiktok-url">Lien Tiktok</label>
						<input
							type="text"
							id="tiktok-url"
							name="tiktok-url"
							defaultValue={player?.tiktok_url}
						/>
						{errors?.tiktokUrl && <i>{errors?.tiktokUrl[0]}</i>}
					</div>
					<div className={styles.buttons}>
						<button
							className={outfit.className}
							onClick={(e) => {
								e.preventDefault();
								setOpenModal(false);
							}}>
							Annuler
						</button>
						<button
							className={outfit.className}
							disabled={pending}
							data-disabled={pending}>
							{player !== null ? "Modifier" : "Ajouter"}
						</button>
					</div>
					{player !== null && (
						<input
							type="text"
							name="player-id"
							id="player-id"
							defaultValue={player?.id}
							hidden
						/>
					)}
				</form>
			</div>
			<div id="layout" onClick={(e) => setOpenModal(false)}></div>
		</>
	);
}
