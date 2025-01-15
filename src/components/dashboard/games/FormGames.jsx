export default function FormGames() {
	return (
		<div>
			<form action="">
				<div>
					<label htmlFor="game">Nom du jeu</label>
					<input type="text" id="game" name="game" />
				</div>
				<div>
					<label htmlFor="picture">Photo du jeu</label>
					<input type="file" id="picture" name="picture" />
				</div>
				<div>
					<span>C'est un jeu mobile ?</span>
					<br />
					<label htmlFor="yes">Oui</label>
					<input type="radio" id="yes" name="is-mobile" value="1" />
					<label htmlFor="no">Non</label>
					<input type="radio" id="no" name="is-mobile" value="0" />
				</div>
				<div>
					<button>Annuler</button>
					<button>Ajouter</button>
				</div>
			</form>
		</div>
	);
}
