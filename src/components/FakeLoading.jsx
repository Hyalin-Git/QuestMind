"use client";
import styles from "@/styles/components/fakeLoading.module.css";
import { useEffect, useRef } from "react";

export default function FakeLoading() {
	const containerRef = useRef(null);
	useEffect(() => {
		const html = document.querySelector("html");
		const container = containerRef.current;

		if (container) {
			const handleAnimationEnd = (e) => {
				if (e.animationName === "fakeLoading-module__vi42DG__slidesOut") {
					html.style.overflow = "auto";
					container.style.display = "none";
				}
			};

			// Ajouter l'event listener pour détecter la fin de l'animation
			container.addEventListener("animationend", handleAnimationEnd);

			// Nettoyer l'event listener à la suppression du composant
			return () => {
				container.removeEventListener("animationend", handleAnimationEnd);
			};
		}
	}, []);
	return (
		<div className={styles.container} ref={containerRef}>
			<div className={styles.background}></div>
			<div className={styles.loader}></div>
		</div>
	);
}
