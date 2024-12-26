"use client";
import styles from "@/styles/components/regions/regions.module.css";
import { outfit } from "@/libs/font";
import Region from "./Region";
import { usePathname, useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";

export default function Regions({ data }) {
	const { t } = useTranslation();
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
				{t("region")}
			</strong>
			<div className={styles.wrapper}>
				{data.map((elt) => {
					return <Region elt={elt} key={elt.id} />;
				})}
			</div>
		</div>
	);
}
