import { outfit } from "@/libs/font";
import styles from "@/styles/components/cards/card.module.css";
import Image from "next/image";

export default function Card({ elt }) {
	const picture = elt.picture.split("public")[1];

	return (
		<div className={styles.container}>
			<div className={styles.imgWrapper}>
				<Image
					className={styles.img}
					src={picture}
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
				<span className={styles.game}>Fortnite Player</span>
			</div>
		</div>
	);
}
