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
					<li
						onClick={(e) => {
							router.push("/fr" + pathname);
						}}>
						<Image
							src={"/fr-flag.svg"}
							width={15}
							height={15}
							alt="Drapeau France"
						/>
						FR
					</li>
					<li
						onClick={(e) => {
							router.push("/en" + pathname);
						}}>
						<Image
							src={"/en-flag.svg"}
							width={15}
							height={15}
							alt="Drapeau France"
						/>
						EN
					</li>
					<li>
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
