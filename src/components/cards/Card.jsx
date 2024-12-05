import { outfit } from "@/libs/font";
import styles from "@/styles/components/cards/card.module.css";
import Image from "next/image";

export default function Card({ elt }) {
	return (
		<div className={styles.container}>
			<div className={styles.imgWrapper}>
				<Image
					className={styles.img}
					src={elt.picture}
					width={500}
					height={500}
					quality={100}
					alt={`Photo de ${elt.firstname}`}
				/>
			</div>
			<div className={styles.info}>
				<span className={`${styles.name} ${outfit.className}`}>
					{elt.firstname}
				</span>
				<span className={styles.game}>Joueur Fortnite</span>
			</div>
		</div>
	);
}
