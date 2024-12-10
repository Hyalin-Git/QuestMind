import styles from "@/styles/components/cards/cards.module.css";
import Card from "./Card";

export default function Cards({ data }) {
	const leftColumn = data.slice(0, 2);
	const rightColumn = data.slice(2, 4);

	return (
		<div className={styles.container}>
			<div className={styles.column}>
				{leftColumn.map((elt) => {
					return <Card data={elt} key={elt.id} />;
				})}
			</div>
			<div className={styles.column}>
				{rightColumn.map((elt) => {
					return <Card data={elt} key={elt.id} />;
				})}
			</div>
			{/* {data.map((elt) => {
				return <Card data={elt} key={elt.id} />;
			})} */}
		</div>
	);
}
