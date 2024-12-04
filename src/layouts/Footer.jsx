import styles from "@/styles/layouts/footer.module.css";
import Image from "next/image";

export default async function Footer() {
	return (
		<footer className={styles.container}>
			{/* logo */}
			<div>
				<Image
					src={"/quest-mind-logo.svg"}
					width={140}
					height={140}
					alt="QuestMind"
				/>
			</div>
			{/* nav links */}
			<div>
				<ul>
					<li>Nos services</li>
					<li>Nos athlètes</li>
					<li>Pour les marques</li>
				</ul>
			</div>
			{/* nav links */}
			<div>
				<ul>
					<li>&Agrave; propos de nous</li>
					<li>Contact</li>
				</ul>
			</div>
			{/* social links */}
			<div></div>
		</footer>
	);
}
