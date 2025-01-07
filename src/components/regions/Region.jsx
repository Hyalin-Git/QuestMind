"use client";
import { outfit } from "@/libs/font";
import styles from "@/styles/components/regions/region.module.css";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
export default function Region({ elt }) {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();
	function setQuery(elt) {
		const params = new URLSearchParams(searchParams.toString());
		params.set("region", elt);

		return params.toString().toLowerCase();
	}
	console.log(searchParams.get("region"), elt.region.toLowerCase());
	console.log(searchParams.get("region") === elt?.region?.toLowerCase());
	return (
		<div
			className={styles.container}
			onClick={(e) => {
				e.preventDefault();
				router.push(pathname + "?" + setQuery(elt?.region));
			}}
			data-active={searchParams.get("region") === elt?.region?.toLowerCase()}>
			<span className={outfit.className}>{elt?.region}</span>
		</div>
	);
}
