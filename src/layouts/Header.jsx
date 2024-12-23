"use client";
import Image from "next/image";
import styles from "@/styles/layouts/header.module.css";
import HeaderDropdown from "@/components/header/HeaderDropdown";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faCross, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

export default function Header() {
	const [isBurgerOpen, setIsBurgerOpen] = useState(false);
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
								<li data-active={pathname.includes("/services")}>
									{t("headerServices")}
								</li>
							</Link>
							<Link href={"/athletes"}>
								<li data-active={pathname.includes("/athletes")}>
									{t("headerAthletes")}
								</li>
							</Link>
							<Link href={"/brands"}>
								<li data-active={pathname.includes("/brands")}>
									{t("headerBrands")}
								</li>
							</Link>
							{/* <li>&Agrave; propos de nous</li> */}
							<Link href={"/about"}>
								<li data-active={pathname.includes("/about")}>
									{t("headerAbousUs")}
								</li>
							</Link>
							<Link href={"/contact"}>
								<li data-active={pathname.includes("/contact")}>
									{t("headerContact")}
								</li>
							</Link>
						</ul>
						<HeaderDropdown />
					</div>
					<div className={styles.burger}>
						<>
							{isBurgerOpen ? (
								<FontAwesomeIcon
									icon={faXmark}
									onClick={(e) => setIsBurgerOpen(false)}
								/>
							) : (
								<FontAwesomeIcon
									icon={faBars}
									onClick={(e) => setIsBurgerOpen(true)}
								/>
							)}
							{isBurgerOpen && (
								<div className={styles.burgerList}>
									<ul className={styles.navList}>
										<Link href={"/"} onClick={(e) => setIsBurgerOpen(false)}>
											<li
												data-active={
													pathname === "/fr" ||
													pathname === "/es" ||
													pathname === "/"
												}>
												Accueil
											</li>
										</Link>
										<Link
											href={"/services"}
											onClick={(e) => setIsBurgerOpen(false)}>
											<li data-active={pathname.includes("/services")}>
												{t("headerServices")}
											</li>
										</Link>
										<Link
											href={"/athletes"}
											onClick={(e) => setIsBurgerOpen(false)}>
											<li data-active={pathname.includes("/athletes")}>
												{t("headerAthletes")}
											</li>
										</Link>
										<Link
											href={"/brands"}
											onClick={(e) => setIsBurgerOpen(false)}>
											<li data-active={pathname.includes("/brands")}>
												{t("headerBrands")}
											</li>
										</Link>
										{/* <li>&Agrave; propos de nous</li> */}
										<Link
											href={"/about"}
											onClick={(e) => setIsBurgerOpen(false)}>
											<li data-active={pathname.includes("/about")}>
												{t("headerAbousUs")}
											</li>
										</Link>
										<Link
											href={"/contact"}
											onClick={(e) => setIsBurgerOpen(false)}>
											<li data-active={pathname.includes("/contact")}>
												{t("headerContact")}
											</li>
										</Link>
									</ul>
								</div>
							)}
						</>
					</div>
					{/* langague dropdown */}
				</nav>
			</header>
		</div>
	);
}
