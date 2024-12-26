"use client";
import CompanyForm from "@/components/contact/CompanyForm";
import PlayerForm from "@/components/contact/PlayerForm";
import { outfit, roboto } from "@/libs/font";
import styles from "@/styles/page/contact.module.css";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function Contact() {
	const { t } = useTranslation();
	const [route, setRoute] = useState("");

	return (
		<main className={styles.main}>
			<div className={styles.background}></div>
			<section className={styles.container}>
				<div className={styles.heading}>
					<h1 className={outfit.className}>{t("btnContact")}</h1>
					<p>{t("contactText")}</p>
				</div>
				<address className={styles.mail}>
					<span>contact@questmind.gg</span>
				</address>
				{!route && (
					<div className={styles.buttons}>
						<button
							className={roboto.className}
							onClick={(e) => setRoute("player")}>
							{t("player")}
						</button>
						<button
							className={roboto.className}
							onClick={(e) => setRoute("company")}>
							{t("company")}
						</button>
					</div>
				)}
				{route === "player" && <PlayerForm />}
				{route === "company" && <CompanyForm />}
			</section>
		</main>
	);
}
