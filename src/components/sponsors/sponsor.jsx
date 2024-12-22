import styles from "@/styles/components/sponsors/sponsor.module.css";
import Image from "next/image";

export default function Sponsor({ sponsor }) {
	return (
		<div className={styles.container}>
			<Image
				className={styles.sponsorImage}
				src={sponsor.picture}
				width={80}
				height={80}
				alt={`Sponsor de ${sponsor.sponsor}`}
			/>
		</div>
	);
}
