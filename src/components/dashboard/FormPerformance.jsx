import { updateNationalitiy } from "@/actions/nationalities";
import {
	savePlayerPerformance,
	updatePlayerPerformance,
} from "@/actions/performances";
import { outfit } from "@/libs/font";
import styles from "@/styles/components/dashboard/formPlayer.module.css";
import { useActionState, useEffect } from "react";

const initialState = {
	status: "pending",
	message: "",
	errors: null,
};

export default function FormPerformance({
	performance,
	players,
	setOpenModal,
}) {
	const isEdit = performance !== null;
	const [state, formAction, pending] = useActionState(
		isEdit ? updatePlayerPerformance : savePlayerPerformance,
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
			<div id="modal" className={styles.container}>
				<form action={formAction} className={styles.form}>
					{isEdit && (
						<input
							type="text"
							name="performance-id"
							id="performance-id"
							value={performance?.id}
							hidden
						/>
					)}
					{!isEdit && (
						<div>
							<label htmlFor="player-select">
								Ajouter la performance à un joueur
							</label>
							<br />
							<select name="player" id="player-select" required>
								<option value="">-- Choisir un joueur --</option>
								{players.map((player) => (
									<option value={player?.id} key={player?.id}>
										{player?.username}
									</option>
								))}
							</select>
						</div>
					)}
					<div>
						<label htmlFor="performance">Performance</label>
						<input
							type="text"
							id="performance"
							name="performance"
							defaultValue={performance?.performance}
							required
						/>
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
