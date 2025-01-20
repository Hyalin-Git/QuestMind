import styles from "@/styles/components/responses/responses.module.css";
import Response from "./Response";

export default function Responses({ data }) {
	return (
		<div className={styles.container}>
			{data.map((elt) => {
				return <Response data={elt} key={elt?.id} />;
			})}
		</div>
	);
}
