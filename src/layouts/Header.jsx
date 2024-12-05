import Image from "next/image";
import styles from "@/styles/layouts/header.module.css";
import HeaderDropdown from "@/components/header/HeaderDropdown";

export default function Header() {
	return (
		<div>
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
							<li>Nos athlètes </li>
							<li>Pour les marques</li>
							<li>&Agrave; propos de nous</li>
							<li>Contact</li>
						</ul>
						<HeaderDropdown />
					</div>
					{/* langague dropdown */}
				</nav>
			</header>
		</div>
	);
}
