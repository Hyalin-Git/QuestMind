export default function SignUp({ setSignIn, setSignUp }) {
  function handleSignIn() {
    setSignUp(false);
  }
  return (
    <div>
      <h1>Créer un compte pour utilisateur</h1>
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
          <button className={roboto.className}>Créer</button>
        </div>
      </form>
      <p>
        Vous avez déjà un compte ? <span>se connecter</span>
      </p>
    </div>
  );
}
