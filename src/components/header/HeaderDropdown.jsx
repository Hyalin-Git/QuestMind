"use client";
import styles from "@/styles/components/header/headerDropdown.module.css";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function HeaderDropdown({}) {
	const [isOpen, setIsOpen] = useState(false);
	const { i18n } = useTranslation();
	const currLanguage = i18n.language;
	const pathname = usePathname();
	const router = useRouter();

	// Fonction pour changer la langue tout en préservant l'URL
	const changeLanguage = (lang) => {
		// On obtient la partie de l'URL après la langue, en l'enlevant
		const currentPath = pathname.replace(`/${currLanguage}`, "");
		// On redirige vers la nouvelle langue avec le même chemin
		router.push(`/${lang}${currentPath}`);

		window.scrollTo(0, 0);
	};

	return (
		<div className={styles.container} onClick={(e) => setIsOpen(!isOpen)}>
			<span>
				{currLanguage === "fr" && (
					<>
						<Image
							src={"/fr-flag.svg"}
							width={15}
							height={15}
							alt="Drapeau Français"
						/>
						Français <FontAwesomeIcon icon={faAngleDown} />
					</>
				)}
				{currLanguage === "en" && (
					<>
						<Image
							src={"/en-flag.svg"}
							width={15}
							height={15}
							alt="Drapeau Anglais"
						/>
						English <FontAwesomeIcon icon={faAngleDown} />
					</>
				)}
			</span>
			<div data-open={isOpen} className={styles.languages}>
				<ul>
					<li onClick={() => changeLanguage("fr")}>
						<Image
							src={"/fr-flag.svg"}
							width={15}
							height={15}
							alt="Drapeau France"
						/>
						FR
					</li>
					<li onClick={() => changeLanguage("en")}>
						<Image
							src={"/en-flag.svg"}
							width={15}
							height={15}
							alt="Drapeau France"
						/>
						EN
					</li>
					<li onClick={() => changeLanguage("es")}>
						<Image
							src={"/esp-flag.svg"}
							width={15}
							height={15}
							alt="Drapeau France"
						/>
						ESP
					</li>
				</ul>
			</div>
		</div>
	);
}
