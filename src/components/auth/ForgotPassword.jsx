import { sendResetCode } from "@/actions/auth";
import styles from "@/styles/components/auth/sign.module.css";
import { useActionState, useEffect, useState } from "react";
import { set } from "zod";
const initialState = {
	status: "pending",
	message: "",
	data: null,
	errors: null,
};
export default function ForgotPassword({ setForgotPassword, setSignIn }) {
	const [statusMessage, setStatusMessage] = useState("");
	const [state, formAction, pending] = useActionState(
		sendResetCode,
		initialState
	);

	useEffect(() => {
		setStatusMessage("");
		if (state?.status === "success") {
			setStatusMessage("Un e-mail de réinitialisation a été envoyé");
		}

		if (state?.status === "failure" && !state?.errors?.email) {
			setStatusMessage("Une erreur inattendue est survenue");
		}
	}, [state]);
	return (
		<div className={styles.container}>
			<h1>Mot de passe oublié</h1>
			{statusMessage && (
				<div className={styles.headingError}>
					<i data-status={state?.status}>{statusMessage}</i>
				</div>
			)}
			<form action={formAction}>
				<div>
					<label htmlFor="email">Adresse e-mail</label>
					<input type="email" name="email" id="email" />
					{state?.errors?.email && <i>{state?.errors?.email}</i>}
				</div>
				<div>
					<button data-disabled={pending} disabled={pending}>
						Envoyer un e-mail de réinitialisation
					</button>
				</div>
			</form>
			<p>
				Vous vous souvenez de votre mot de passe ?
				<br />
				<span
					className={styles.haveAccount}
					onClick={(e) => {
						setForgotPassword(false);
						setSignIn(true);
					}}>
					Se connecter
				</span>
			</p>
		</div>
	);
}
