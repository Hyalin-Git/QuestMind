"use client";
import styles from "@/styles/layouts/footer.module.css";
import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "react-i18next";

export default function Footer() {
	const { t } = useTranslation();
	return (
		<footer className={styles.container}>
			{/* logo */}
			<div className={styles.logo}>
				<Link href={"/"}>
					<Image
						src={"/quest-mind-logo.svg"}
						width={140}
						height={140}
						alt="QuestMind"
					/>
				</Link>
			</div>
			{/* nav links */}
			<div className={styles.links}>
				<ul>
					<li>
						<Link href={"/services"}>{t("headerServices")}</Link>
					</li>
					<li>
						<Link href={"/athletes"}>{t("headerAthletes")}</Link>
					</li>
					<li>
						<Link href={"/brands"}>{t("headerBrands")}</Link>
					</li>
				</ul>
			</div>
			{/* nav links */}
			<div className={styles.links}>
				<ul>
					<li>
						<Link href={"/about"}>{t("headerAbousUs")}</Link>
					</li>
					<li>
						<Link href={"/contact"}>{t("headerContact")}</Link>
					</li>
				</ul>
			</div>
			<div className={styles.links}>
				<ul>
					<li>
						<Link href={"/conditions"}>{t("headerConditions")}</Link>
					</li>
					<li>
						<Link href={"/terms"}>{t("headerLegal")}</Link>
					</li>
					<li>
						<Link href={"/charts"}>{t("headerChart")}</Link>
					</li>
				</ul>
			</div>
			{/* social links */}
			<div className={styles.socials}>
				<span>{t("followUs")}</span>
				<div>
					<a href="https://x.com/questmindgg" target="_blank" title="X">
						<Image
							src={"/twitter.svg"}
							width={30}
							height={30}
							alt="Logo twitter"
						/>
					</a>
					<a
						href="https://www.linkedin.com/company/questmind"
						target="_blank"
						title="LinkedIn">
						<Image
							src={"/linkedin.svg"}
							width={30}
							height={30}
							alt="Logo linkedIn"
						/>
					</a>
				</div>
			</div>
		</footer>
	);
}
