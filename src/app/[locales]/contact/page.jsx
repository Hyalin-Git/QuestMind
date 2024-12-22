"use client";
import CompanyForm from "@/components/contact/CompanyForm";
import PlayerForm from "@/components/contact/PlayerForm";
import { outfit, roboto } from "@/libs/font";
import styles from "@/styles/page/contact.module.css";
import { useState } from "react";

export default function Contact() {
	const [route, setRoute] = useState("");

	return (
		<main className={styles.main}>
			<div className={styles.background}></div>
			<section className={styles.container}>
				<div className={styles.heading}>
					<h1 className={outfit.className}>Contact Us</h1>
					<p>
						Email us or complete the form to join our talents in their journey.
						You can use it to reach out for other inquires as well.
					</p>
				</div>
				<address className={styles.mail}>
					<span>contact@questmind.gg</span>
				</address>
				{!route && (
					<div className={styles.buttons}>
						<button
							className={roboto.className}
							onClick={(e) => setRoute("player")}>
							Player
						</button>
						<button
							className={roboto.className}
							onClick={(e) => setRoute("company")}>
							Company
						</button>
					</div>
				)}
				{route === "player" && <PlayerForm />}
				{route === "company" && <CompanyForm />}
			</section>
		</main>
	);
}
