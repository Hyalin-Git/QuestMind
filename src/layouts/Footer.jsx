"use client";
import styles from "@/styles/layouts/footer.module.css";
import Image from "next/image";
import { useTranslation } from "react-i18next";

export default function Footer() {
	const { t } = useTranslation();
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
					<li>{t("headerServices")}</li>
					<li>{t("headerAthletes")}</li>
					<li>{t("headerBrands")}</li>
				</ul>
			</div>
			{/* nav links */}
			<div className={styles.links}>
				<ul>
					<li>{t("headerAbousUs")}</li>
					<li>{t("headerContact")}</li>
				</ul>
			</div>
			{/* social links */}
			<div className={styles.socials}>
				<span>{t("followUs")}</span>
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
