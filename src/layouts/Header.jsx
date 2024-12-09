"use client";
import Image from "next/image";
import styles from "@/styles/layouts/header.module.css";
import HeaderDropdown from "@/components/header/HeaderDropdown";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
	const pathname = usePathname();
	return (
		<div>
			<header className={styles.container}>
				<nav className={styles.nav}>
					{/* logo */}
					<div className={styles.logo}>
						<Link href={"/"}>
							<Image
								src={"/quest-mind-logo.svg"}
								width={140}
								height={140}
								alt="QuestMind"
								priority
							/>
						</Link>
					</div>
					{/* Page list */}
					<div className={styles.list}>
						<ul className={styles.navList}>
							<Link href={"/services"}>
								<li data-active={pathname === "/services"}>Nos services</li>
							</Link>
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
