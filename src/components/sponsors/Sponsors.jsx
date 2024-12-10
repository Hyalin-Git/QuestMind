import styles from "@/styles/components/sponsors/sponsors.module.css";
import Image from "next/image";
import Sponsor from "./sponsor";

export default async function Sponsors({ data, background }) {
	const sponsors = data?.data;

	return (
		<div className={styles.container}>
			<div className={styles.heading}>
				<p>
					They <span>trust</span> us:
				</p>
			</div>
			<div className={styles.content} data-background={background}>
				{sponsors?.map((sponsor) => {
					return <Sponsor sponsor={sponsor} key={sponsor?.id} />;
				})}
			</div>
		</div>
	);
}
