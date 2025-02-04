import { saveNationalitiy, updateNationalitiy } from "@/actions/nationalities";
import { outfit } from "@/libs/font";
import styles from "@/styles/components/dashboard/formPlayer.module.css";
import { useActionState, useEffect } from "react";

const initialState = {
	status: "pending",
	message: "",
	errors: null,
};

export default function FormRegion({ region, setOpenModal }) {
	const isEdit = region !== null;
	const [state, formAction, pending] = useActionState(
		isEdit ? updateNationalitiy : saveNationalitiy,
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
						<label htmlFor="region">Région</label>
						<input
							type="text"
							id="region"
							name="region"
							defaultValue={region?.region}
							required
						/>
						{errors?.region && <i>{errors?.region[0]}</i>}
					</div>

					{isEdit && (
						<input
							type="text"
							name="region-id"
							id="region-id"
							defaultValue={region?.id}
							hidden
						/>
					)}

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
