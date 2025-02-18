import { savePlayerTrending, updatePlayerTrending } from "@/actions/trending";
import { updateUser } from "@/actions/user";
import { outfit } from "@/libs/font";
import styles from "@/styles/components/dashboard/formPlayer.module.css";
import { useActionState, useEffect } from "react";

const initialState = {
	status: "pending",
	message: "",
	errors: null,
};

export default function FormTrending({
	player,
	players,
	trending,
	setOpenModal,
}) {
	const isEdit = player !== null;
	const [state, formAction, pending] = useActionState(
		isEdit ? updatePlayerTrending : savePlayerTrending,
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
	const pos = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

	console.log(player);

	return (
		<>
			<div id="modal" className={styles.container}>
				<form action={formAction} className={styles.form}>
					{isEdit && (
						<>
							<input
								type="text"
								id="player-id"
								name="player-id"
								defaultValue={player?.player_id}
								hidden
							/>
							<input
								type="text"
								id="trending-id"
								name="trending-id"
								defaultValue={player?.trending_id}
								hidden
							/>
						</>
					)}

					{!isEdit && (
						<div>
							<label htmlFor="player-select">
								Ajouter un joueur en trending
							</label>
							<br />
							<select name="player" id="player-select" required>
								<option value="">-- Choisir un joueur --</option>
								{players
									.filter(
										(player) =>
											!trending?.some(
												(trend) => trend?.username === player?.username
											)
									)
									.map((player) => (
										<option value={player?.id} key={player?.id}>
											{player?.username}
										</option>
									))}
							</select>
						</div>
					)}
					<div>
						<label htmlFor="position-select">Position</label>
						<br />
						<select
							name="position"
							id="position-select"
							defaultValue={player?.position}
							required>
							<option value="">-- Choisir la position --</option>
							{pos.map((position, idx) => (
								<option value={position} key={idx}>
									{position}
								</option>
							))}
						</select>
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
							{isEdit ? "Modifier" : "Ajouter"}
						</button>
					</div>
				</form>
			</div>
			<div id="layout" onClick={(e) => setOpenModal(false)}></div>
		</>
	);
}
