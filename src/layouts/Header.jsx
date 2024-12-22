"use client";
import Image from "next/image";
import styles from "@/styles/layouts/header.module.css";
import HeaderDropdown from "@/components/header/HeaderDropdown";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslation } from "react-i18next";

export default function Header() {
	const pathname = usePathname();
	const { t } = useTranslation();
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
								<li data-active={pathname === "/services"}>
									{t("headerServices")}
								</li>
							</Link>
							<Link href={"/athletes"}>
								<li data-active={pathname === "/athletes"}>
									{t("headerAthletes")}
								</li>
							</Link>
							<Link href={"/brands"}>
								<li data-active={pathname === "/brands"}>
									{t("headerBrands")}
								</li>
							</Link>
							{/* <li>&Agrave; propos de nous</li> */}
							<Link href={"/about"}>
								<li data-active={pathname === "/about"}>
									{t("headerAbousUs")}
								</li>
							</Link>
							<Link href={"/contact"}>
								<li data-active={pathname === "/contact"}>
									{t("headerContact")}
								</li>
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
