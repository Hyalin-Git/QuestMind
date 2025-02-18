import { updateUser } from "@/actions/user";
import { outfit } from "@/libs/font";
import styles from "@/styles/components/dashboard/formPlayer.module.css";
import { useActionState, useEffect } from "react";

const initialState = {
	status: "pending",
	message: "",
	errors: null,
};

export default function FormUser({ user, setOpenModal }) {
	const [state, formAction, pending] = useActionState(updateUser, initialState);
	const errors = state?.errors;

	console.log(state);

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
					<input
						type="text"
						id="user-id"
						name="user-id"
						defaultValue={user?.id}
						hidden
					/>
					<div>
						<span>Choisir le rôle de cet utilisateur</span>
						<br />
						<div className={styles.radios}>
							<div className={styles.radio}>
								<label htmlFor="user">Utilisateur</label>
								<input
									type="radio"
									id="user"
									name="role"
									value="user"
									hidden
									defaultChecked={user?.role === "user"}
								/>
							</div>
							<div className={styles.radio}>
								<label htmlFor="admin">Administrateur</label>
								<input
									type="radio"
									id="admin"
									name="role"
									value="admin"
									defaultChecked={user?.role === "admin"}
									hidden
								/>
							</div>
						</div>
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
							Modifier
						</button>
					</div>
				</form>
			</div>
			<div id="layout" onClick={(e) => setOpenModal(false)}></div>
		</>
	);
}
