"use client";
import styles from "@/styles/components/auth/sign.module.css";
import { roboto } from "@/libs/font";
import { useActionState, useEffect } from "react";
import { signIn } from "@/actions/auth";
import { useRouter } from "next/navigation";

const initialState = {
	status: "pending",
	message: "",
	errors: null,
};

export default function SignIn({ setSignIn, setSignUp }) {
	const router = useRouter();
	const [state, formAction, pending] = useActionState(signIn, initialState);

	const error = state?.status === "failure";

	function handleSignUp() {
		setSignIn(false);
		setSignUp(true);
	}

	useEffect(() => {
		if (state?.status === "success") {
			router.push(`/${process.env.NEXT_PUBLIC_SECRET_URL}/dashboard/players`);
		}
	}, [state]);

	return (
		<div className={styles.container}>
			<h1>J'ai déjà un compte</h1>
			<form action={formAction}>
				{error && (
					<div className={styles.errorMessage}>
						<i>{state?.message}</i>
					</div>
				)}
				<div>
					<label htmlFor="email">Adresse e-mail</label>
					<input type="email" name="email" id="email" />
				</div>
				<div>
					<label htmlFor="password">Mot de passe</label>
					<input type="password" name="password" id="password" />
				</div>
				<div>
					<button
						className={roboto.className}
						disabled={pending}
						data-disabled={pending}>
						Connexion
					</button>
				</div>
			</form>
			<span onClick={handleSignUp}>
				Créer un compte pour un autre utilisateur
			</span>
		</div>
	);
}
