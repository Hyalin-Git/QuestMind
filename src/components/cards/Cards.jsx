"use server";
import styles from "@/styles/components/cards/cards.module.css";
import Card from "./Card";

export default async function Cards({ data }) {
	return (
		<div className={styles.container}>
			{data?.map((elt) => {
				return <Card elt={elt} key={elt.id} />;
			})}
		</div>
	);
}
