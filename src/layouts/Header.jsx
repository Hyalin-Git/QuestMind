import Image from "next/image";
import styles from "@/styles/layouts/header.module.css";
import HeaderDropdown from "@/components/header/HeaderDropdown";

export default function Header() {
	return (
		<header className={styles.container}>
			<nav className={styles.nav}>
				{/* logo */}
				<div className={styles.logo}>
					<Image
						src={"/quest-mind-logo.svg"}
						width={140}
						height={140}
						alt="QuestMind"
						priority
					/>
				</div>
				{/* Page list */}
				<div className={styles.list}>
					<ul className={styles.navList}>
						<li>Nos services</li>
						<li>Nos joueurs</li>
						<li>Nos sponsors</li>
						<li>&Agrave; propos de nous</li>
						<li>Nous contacter</li>
					</ul>
					<HeaderDropdown />
				</div>
				{/* langague dropdown */}
			</nav>
		</header>
	);
}
