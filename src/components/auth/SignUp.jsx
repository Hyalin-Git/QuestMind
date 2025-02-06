import { signUp } from "@/actions/auth";
import { roboto } from "@/libs/font";
import styles from "@/styles/components/auth/sign.module.css";
import { useActionState, useEffect, useState } from "react";

const initialState = {
	status: "pending",
	message: "",
	errors: null,
};

export default function SignUp({ setSignIn, setSignUp }) {
	const [messageStatus, setMessageStatus] = useState("");
	const [state, formAction, pending] = useActionState(signUp, initialState);

	function handleSignIn() {
		setSignUp(false);
		setSignIn(true);
	}

	useEffect(() => {
		setMessageStatus("");
		if (state?.status === "success") {
			setSignUp(false);
			setSignIn(true);
		}
		if (state?.status === "failure" && !state?.errors) {
			setMessageStatus(state?.message);
		}
	}, [state]);

	console.log("====================================");
	console.log("state", state);
	console.log("====================================");

	return (
		<div className={styles.container}>
			<h1>Créer un compte</h1>
			{messageStatus && (
				<div className={styles.headingError}>
					<i data-status={state?.status}>{messageStatus}</i>
				</div>
			)}
			<form action={formAction}>
				<div>
					<label htmlFor="email">Adresse e-mail</label>
					<input
						type="email"
						name="email"
						id="email"
						required
						autoComplete="email"
					/>
					{state?.errors?.email && <i>{state.errors.email[0]}</i>}
				</div>
				<div>
					<label htmlFor="password">Mot de passe</label>
					<input
						type="password"
						name="password"
						id="password"
						required
						autoComplete="off"
					/>
					{state?.errors?.password && <i>{state.errors.password[0]}</i>}
				</div>
				<div>
					<button
						className={roboto.className}
						data-disabled={pending}
						disabled={pending}>
						Créer le compte
					</button>
				</div>
			</form>
			<p>
				Vous avez déjà un compte ?{" "}
				<span onClick={handleSignIn} className={styles.haveAccount}>
					Se connecter
				</span>
			</p>
		</div>
	);
}
