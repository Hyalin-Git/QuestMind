"use client";
import styles from "@/styles/components/cards/cards.module.css";
import Card from "./Card";
import { useTranslation } from "react-i18next";

export default function Cards({ data }) {
	const { i18n } = useTranslation();
	const currLanguage = i18n.language;
	const leftColumn = data?.slice(0, 2);
	const rightColumn = data?.slice(2, 4);

	return (
		<div className={styles.container} data-lang={currLanguage}>
			<div className={styles.column}>
				{leftColumn.map((elt) => {
					return <Card data={elt} key={elt?.id} />;
				})}
			</div>
			<div className={styles.column}>
				{rightColumn.map((elt) => {
					return <Card data={elt} key={elt?.id} />;
				})}
			</div>
		</div>
	);
}
