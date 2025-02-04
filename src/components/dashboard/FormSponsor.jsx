import { saveSponsor, updateSponsor } from "@/actions/sponsors";
import { outfit } from "@/libs/font";
import styles from "@/styles/components/dashboard/formPlayer.module.css";
import { useActionState, useEffect } from "react";

const initialState = {
	status: "pending",
	message: "",
	errors: null,
};

export default function FormSponsor({ sponsor, setOpenModal }) {
	const isEdit = sponsor !== null;
	const [state, formAction, pending] = useActionState(
		isEdit ? updateSponsor : saveSponsor,
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
						<label htmlFor="sponsor">Nom du sponsor</label>
						<input
							type="text"
							id="sponsor"
							name="sponsor"
							defaultValue={sponsor?.sponsor}
							required
						/>
						{errors?.sponsor && <i>{errors?.sponsor[0]}</i>}
					</div>
					<div>
						<label htmlFor="picture">Logo du sponsor</label>
						{isEdit && <input type="file" id="picture" name="picture" />}
						{!isEdit && (
							<input type="file" id="picture" name="picture" required />
						)}
					</div>
					{isEdit && (
						<input
							type="text"
							name="sponsor-id"
							id="sponsor-id"
							defaultValue={sponsor?.id}
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
