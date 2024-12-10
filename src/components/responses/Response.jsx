import styles from "@/styles/components/responses/reponse.module.css";

export default function Response({ data }) {
	return (
		<div className={styles.container}>
			<p dangerouslySetInnerHTML={{ __html: data.content }}></p>
		</div>
	);
}
