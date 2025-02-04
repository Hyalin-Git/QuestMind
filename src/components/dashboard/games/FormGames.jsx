import { saveGame, updateGame } from "@/actions/games";
import { outfit } from "@/libs/font";
import styles from "@/styles/components/dashboard/formPlayer.module.css";
import { useActionState, useEffect } from "react";

const initialState = {
	status: "pending",
	message: "",
	errors: null,
};

export default function FormGames({ game, setOpenModal }) {
	const isEdit = game !== null;
	const [state, formAction, pending] = useActionState(
		isEdit ? updateGame : saveGame,
		initialState
	);
	const errors = state?.errors;

	console.log(errors);

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
					<div>
						<label htmlFor="game">Nom du jeu</label>
						<input
							type="text"
							id="game"
							name="game"
							defaultValue={game?.game}
							required
						/>
						{errors?.game && <i>{errors?.game[0]}</i>}
					</div>
					<div>
						<label htmlFor="picture">Photo du jeu</label>
						<input type="file" id="picture" name="picture" />
					</div>
					<div>
						<span>C'est un jeu mobile ?</span>
						<br />
						<div className={styles.radios}>
							<div className={styles.radio}>
								<label htmlFor="yes">Oui</label>
								<input
									type="radio"
									id="yes"
									name="is-mobile"
									value="1"
									hidden
									defaultChecked={game?.is_mobile === 1}
								/>
							</div>
							<div className={styles.radio}>
								<label htmlFor="no">Non</label>
								<input
									type="radio"
									id="no"
									name="is-mobile"
									value="0"
									defaultChecked={game?.is_mobile === 0}
									hidden
								/>
							</div>
						</div>
						{errors?.isMobile && <i>{errors?.isMobile[0]}</i>}
						{isEdit && (
							<input
								type="text"
								name="game-id"
								id="game-id"
								defaultValue={game?.id}
								hidden
							/>
						)}
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
