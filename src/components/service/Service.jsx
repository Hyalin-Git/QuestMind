import { outfit } from "@/libs/font";
import styles from "@/styles/components/service/service.module.css";
import Image from "next/image";

export default function Service({
	title,
	content,
	subContent,
	icon,
	sideImage,
}) {
	return (
		<section className={styles.container}>
			<div className={styles.left}>
				<div className={styles.logo}>
					<Image src={icon} width={70} height={70} alt="Section icon" />
				</div>
				<div className={styles.content}>
					<h2 className={outfit.className}>{title}</h2>
					<p dangerouslySetInnerHTML={{ __html: content }}></p>
					{subContent && (
						<>
							<br />
							<p>{subContent}</p>
						</>
					)}
				</div>
			</div>
			{sideImage && (
				<div className={styles.right}>
					<Image src={sideImage} width={300} height={300} alt="Section image" />
				</div>
			)}
		</section>
	);
}
