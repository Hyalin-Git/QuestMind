"use client";
import ContactForm from "@/components/contact/ContactForm";
import { outfit, roboto } from "@/libs/font";
import styles from "@/styles/page/contact.module.css";
import Link from "next/link";
import { useState } from "react";

export default function Contact({ params }) {
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
					<span>Contact@QuestMind.gg</span>
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
				{route === "player" && <ContactForm />}
				{route === "company" && <ContactForm />}
			</section>
		</main>
	);
}
