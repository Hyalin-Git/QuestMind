import Game from "./Game";
import styles from "@/styles/components/games/games.module.css";
export default async function Games({ data }) {
	return (
		<div className={styles.container}>
			{data.map((elt) => {
				return <Game elt={elt} key={elt.id} />;
			})}
		</div>
	);
}
