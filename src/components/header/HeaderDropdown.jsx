"use client";
import styles from "@/styles/components/header/headerDropdown.module.css";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { useState } from "react";

export default function HeaderDropdown({}) {
	const [isOpen, setIsOpen] = useState(false);
	const activeLanguage = "French";
	return (
		<div className={styles.container} onClick={(e) => setIsOpen(!isOpen)}>
			<span>
				<Image
					src={"/fr-flag.svg"}
					width={15}
					height={15}
					alt="Drapeau France"
				/>
				{activeLanguage} <FontAwesomeIcon icon={faAngleDown} />
			</span>
			<div data-open={isOpen} className={styles.languages}>
				<ul>
					<li>
						<Image
							src={"/fr-flag.svg"}
							width={15}
							height={15}
							alt="Drapeau France"
						/>
						FR
					</li>
					<li>
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
