import styles from "@/styles/components/auth/sign.module.css";
import { roboto } from "@/libs/font";

export default function SignIn({ setSignIn, setSignUp }) {
  function handleSignUp() {
    setSignIn(false);
    setSignUp(true);
  }

  return (
    <div className={styles.container}>
      <h1>J'ai déjà un compte</h1>
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
          <button className={roboto.className}>Connexion</button>
        </div>
      </form>
      <span onClick={handleSignUp}>
        Créer un compte pour un autre utilisateur
      </span>
    </div>
  );
}
