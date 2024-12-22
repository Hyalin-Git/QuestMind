"use client";
import Image from "next/image";
import styles from "@/styles/components/games/game.module.css";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function Game({ elt }) {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();
	function setQuery(elt) {
		const params = new URLSearchParams(searchParams.toString());
		params.set("game", elt);

		return params.toString().toLowerCase();
	}
	return (
		<div
			className={styles.container}
			onClick={(e) => {
				e.preventDefault();
				router.push(pathname + "?" + setQuery(elt.game));
			}}>
			<Image
				src={elt.picture}
				alt={elt.game}
				width={220}
				height={220}
				quality={100}
			/>
		</div>
	);
}
