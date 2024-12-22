"use client";
import { outfit } from "@/libs/font";
import styles from "@/styles/components/players/player.module.css";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { useTranslation } from "react-i18next";

export default function Player({ elt }) {
	const { t } = useTranslation();
	const pathname = usePathname();

	const isFr = pathname.includes("fr");
	console.log(pathname);
	const isMobileGame = elt.game;

	console.log(isMobileGame);
	return (
		<div>
			<Link href={`/athletes/${elt.id}`}>
				<div className={styles.container}>
					<div className={styles.imgWrapper}>
						<Image
							className={styles.img}
							src={elt.picture}
							width={500}
							height={500}
							quality={100}
							alt={`Photo de ${elt.firstName}`}
						/>
					</div>
					<div className={styles.info}>
						<span className={`${styles.name} ${outfit.className}`}>
							{elt.firstName}
						</span>
						<span className={styles.game}>
							{isFr ? (
								<>
									{t("player")} {elt.game}
								</>
							) : (
								<>
									{elt.game} {t("player")}
								</>
							)}
						</span>
					</div>
				</div>
			</Link>
		</div>
	);
}
