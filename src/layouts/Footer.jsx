import styles from "@/styles/layouts/footer.module.css";
import Image from "next/image";

export default async function Footer() {
	return (
		<footer className={styles.container}>
			{/* logo */}
			<div className={styles.logo}>
				<Image
					src={"/quest-mind-logo.svg"}
					width={140}
					height={140}
					alt="QuestMind"
				/>
			</div>
			{/* nav links */}
			<div className={styles.links}>
				<ul>
					<li>Nos services</li>
					<li>Nos athlètes</li>
					<li>Pour les marques</li>
				</ul>
			</div>
			{/* nav links */}
			<div className={styles.links}>
				<ul>
					<li>&Agrave; propos de nous</li>
					<li>Contact</li>
				</ul>
			</div>
			{/* social links */}
			<div className={styles.socials}>
				<span>Follow us</span>
				<div>
					<Image
						src={"/twitter.svg"}
						width={30}
						height={30}
						alt="Logo twitter"
					/>
					<Image
						src={"/linkedin.svg"}
						width={30}
						height={30}
						alt="Logo linkedIn"
					/>
				</div>
			</div>
		</footer>
	);
}
