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
								<li data-active={pathname === "/services"}>Our services</li>
							</Link>
							<li>Our athletes</li>
							<Link href={"/brands"}>
								<li data-active={pathname === "/brands"}>For Brands</li>
							</Link>
							{/* <li>&Agrave; propos de nous</li> */}
							<Link href={"/about"}>
								<li data-active={pathname === "/about"}>About Us</li>
							</Link>
							<Link href={"/contact"}>
								<li data-active={pathname === "/contact"}>Contact Us</li>
							</Link>
						</ul>
						<HeaderDropdown />
					</div>
					{/* langague dropdown */}
				</nav>
			</header>
		</div>
	);
}
