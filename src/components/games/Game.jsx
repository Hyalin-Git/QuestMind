import Image from "next/image";
import styles from "@/styles/components/games/game.module.css";
export default async function Game({ elt }) {
	return (
		<div className={styles.container}>
			<Image
				src={elt.picture}
				alt={elt.game}
				width={220}
				height={220}
				quality={100}
			/>
		</div>
	);
}
