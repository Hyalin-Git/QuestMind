"use client"; // Error boundaries must be Client Components
import styles from "@/styles/page/error.module.css";
import { roboto } from "@/libs/font";
import Link from "next/link";
import { useEffect } from "react";

export default function Error({ error, reset }) {
	useEffect(() => {
		// Log the error to an error reporting service
		console.error(error);
	}, [error]);

	return (
		<div className={styles.container}>
		<div className={styles.background}></div>
			<div>
				<div>
					<h2>Une erreur est survenu</h2>
				</div>
				<div>
					<Link href={"/"}>
						<button id="contact" className={roboto.className}>
							Accueil
						</button>
					</Link>
				</div>
			</div>
		</div>
	);
}
