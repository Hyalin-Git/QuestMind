"use client";
import { outfit } from "@/libs/font";
import Game from "./Game";
import styles from "@/styles/components/games/games.module.css";
import { usePathname, useRouter } from "next/navigation";

export default function Games({ data }) {
	const router = useRouter();
	const pathname = usePathname();

	return (
		<div className={styles.container}>
			<strong
				className={outfit.className}
				onClick={(e) => {
					e.preventDefault();
					router.push(pathname);
				}}>
				Game
			</strong>
			<div className={styles.wrapper}>
				{data.map((elt) => {
					return <Game elt={elt} key={elt.id} />;
				})}
			</div>
		</div>
	);
}
