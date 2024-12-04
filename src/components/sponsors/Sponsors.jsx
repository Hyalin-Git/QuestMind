import styles from "@/styles/components/sponsors/sponsors.module.css";
import Image from "next/image";
import Sponsor from "./sponsor";

export default async function Sponsors({ data }) {
	const sponsors = data?.data;

	return (
		<div className={styles.container}>
			<div className={styles.heading}>
				<p>
					Ils ont <span>confiance</span> en nous:
				</p>
			</div>
			<div className={styles.content}>
				{sponsors?.map((sponsor) => {
					return <Sponsor sponsor={sponsor} key={sponsor?.id} />;
				})}
			</div>
		</div>
	);
}
