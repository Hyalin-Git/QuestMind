"use client";
import { resetForgotPassword } from "@/actions/auth";
import styles from "@/styles/components/auth/sign.module.css";
import { useRouter } from "next/navigation";
import { useActionState, useEffect, useState } from "react";

const initialState = {
	status: "pending",
	message: "",
	data: null,
	errors: null,
};

export default function ResetPasswordForm({ resetCode }) {
	const router = useRouter();
	const [statusMessage, setStatusMessage] = useState("");
	const [state, formAction, pending] = useActionState(
		resetForgotPassword,
		initialState
	);

	useEffect(() => {
		setStatusMessage("");
		if (state?.status === "success") {
			setStatusMessage("Le mot de passe a été réinitialisé avec succès");
		}

		if (
			state?.status === "failure" &&
			!state?.errors?.newPassword &&
			!state?.errors?.confirmPassword
		) {
			setStatusMessage("Une erreur inattendue est survenue");
		}
	}, [state]);
	console.log(state);
	return (
		<div className={styles.container}>
			<h2>Réinitialiser le mot de passe</h2>
			{statusMessage && (
				<div className={styles.headingError}>
					<i data-status={state?.status}>{statusMessage}</i>
				</div>
			)}
			<form action={formAction}>
				<input
					type="text"
					name="reset-code"
					id="reset-code"
					defaultValue={resetCode}
					autoComplete="off"
					hidden
				/>
				<div>
					<label htmlFor="new-password">Nouveau mot de passe :</label>
					<input
						type="password"
						id="new-password"
						name="new-password"
						autoComplete="new-password"
						required
					/>
					{state?.errors?.newPassword && (
						<i data-status={state?.status}>{state?.errors?.newPassword}</i>
					)}
				</div>
				<div>
					<label htmlFor="confirm-password">Confirmer le mot de passe :</label>
					<input
						type="password"
						id="confirm-password"
						name="confirm-password"
						autoComplete="new-password"
						required
					/>
					{state?.errors?.confirmPassword && (
						<i data-status={state?.status}>{state?.errors?.confirmPassword}</i>
					)}
				</div>
				{state?.status !== "success" && (
					<button type="submit" data-disabled={pending} disabled={pending}>
						Réinitialiser le mot de passe
					</button>
				)}
			</form>
			{state?.status === "success" && (
				<button
					className={styles.signInBtn}
					onClick={(e) => {
						router.push(`/${process.env.NEXT_PUBLIC_SECRET_URL}/auth`);
					}}>
					Se connecter
				</button>
			)}
		</div>
	);
}
