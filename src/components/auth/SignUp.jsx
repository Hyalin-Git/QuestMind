import { roboto } from "@/libs/font";
import styles from "@/styles/components/auth/sign.module.css";

export default function SignUp({ setSignIn, setSignUp }) {
	function handleSignIn() {
		setSignUp(false);
		setSignIn(true);
	}

	return (
		<div className={styles.container}>
			<h1>Créer un compte</h1>
			<form action="">
				<div>
					<label htmlFor="email">Adresse e-mail</label>
					<input type="email" name="email" id="email" />
				</div>
				<div>
					<label htmlFor="password">Mot de passe</label>
					<input type="password" name="password" id="password" />
				</div>
				<div>
					<button className={roboto.className}>Créer le compte</button>
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
