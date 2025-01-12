"use client";
import styles from "@/styles/components/sponsors/sponsors.module.css";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function Sponsors({ data, background }) {
	const [isMobile, setIsMobile] = useState(false);
	const sponsors = data?.data || [];
	const { t } = useTranslation();

	// Vérifier la taille de l'écran
	useEffect(() => {
		const checkScreenSize = () => {
			setIsMobile(window.innerWidth <= 1180);
		};

		checkScreenSize();
		window.addEventListener("resize", checkScreenSize);

		return () => {
			window.removeEventListener("resize", checkScreenSize);
		};
	}, []);

	return (
		<div className={styles.container}>
			<div className={styles.heading}>
				<p dangerouslySetInnerHTML={{ __html: t("trust") }}></p>
			</div>
			{isMobile && (
				<div className={styles["sponsors-mobile"]} data-background={background}>
					<div className={styles["sponsors-slide"]}>
						{sponsors.map((sponsor, idx) => (
							<Image
								width={150}
								height={80}
								src={sponsor?.picture}
								alt={sponsor?.sponsor}
								key={idx}
								quality={100}
							/>
						))}
					</div>
					<div className={styles["sponsors-slide"]}>
						{sponsors.map((sponsor, idx) => (
							<Image
								width={150}
								height={80}
								src={sponsor?.picture}
								alt={sponsor?.sponsor}
								key={idx}
								quality={100}
							/>
						))}
					</div>
				</div>
			)}
			{!isMobile && (
				<div className={styles.sponsors} data-background={background}>
					{sponsors.map((sponsor, idx) => (
						<Image
							width={150}
							height={80}
							src={sponsor?.picture}
							alt={sponsor?.sponsor}
							key={idx}
							quality={100}
						/>
					))}
				</div>
			)}
		</div>
	);
}
