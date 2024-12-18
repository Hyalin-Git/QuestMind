import { outfit } from "@/libs/font";
import styles from "@/styles/components/players/player.module.css";
import Image from "next/image";

export default function Player({ elt }) {
	return (
		<div className={styles.container}>
			<div className={styles.imgWrapper}>
				<Image
					className={styles.img}
					src={elt.picture}
					width={500}
					height={500}
					quality={100}
					alt={`Photo de ${elt.firstName}`}
				/>
			</div>
			<div className={styles.info}>
				<span className={`${styles.name} ${outfit.className}`}>
					{elt.firstName}
				</span>
				<span className={styles.game}>Joueur {elt.game}</span>
			</div>
		</div>
	);
}
