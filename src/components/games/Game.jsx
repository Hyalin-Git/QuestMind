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
		params.delete("is_mobile");

		return params.toString().toLowerCase();
	}

	function setQueryMobile(elt) {
		const params = new URLSearchParams(searchParams.toString());
		params.set("is_mobile", elt);
		params.delete("game");

		return params.toString().toLowerCase();
	}

	return (
		<>
			{/* Afficher les jeux non mobiles (is_mobile === 0) */}
			{elt?.picture && elt?.is_mobile === 0 && (
				<div
					className={styles.container}
					onClick={(e) => {
						e.preventDefault();
						router.push(pathname + "?" + setQuery(elt?.game));
					}}
					data-active={searchParams.get("game") === elt?.game.toLowerCase()}>
					<Image
						src={elt?.picture}
						alt={elt?.game}
						width={220}
						height={220}
						quality={100}
					/>
				</div>
			)}

			{/* Afficher une seule image pour les jeux mobiles (is_mobile === 1) */}
			{elt?.picture && elt?.is_mobile === 1 && (
				<div
					className={styles.container}
					onClick={(e) => {
						e.preventDefault();
						router.push(pathname + "?" + setQueryMobile(elt?.is_mobile));
					}}
					data-active={searchParams.get("is_mobile") ? true : false}>
					<Image
						src={elt?.picture}
						alt={elt?.game}
						width={220}
						height={220}
						quality={100}
					/>
				</div>
			)}
		</>
	);
}
