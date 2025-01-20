import { outfit } from "@/libs/font";
import styles from "@/styles/components/cards/card.module.css";

export default function Card({ data }) {
	return (
		<div className={styles.container}>
			<span className={outfit.className}>{data?.title}</span>
			<p>{data?.content}</p>
		</div>
	);
}
