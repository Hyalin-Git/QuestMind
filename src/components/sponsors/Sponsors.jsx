"use client";
import styles from "@/styles/components/sponsors/sponsors.module.css";
import Image from "next/image";
import Sponsor from "./sponsor";

import { useTranslation } from "react-i18next";

export default function Sponsors({ data, background }) {
	const sponsors = data?.data;
	const { t } = useTranslation();

	return (
		<div className={styles.container}>
			<div className={styles.heading}>
				<p>
					{t("trustStart")} <span>{t("trustSpan")}</span> {t("trustEnd")}:
				</p>
			</div>
			<div className={styles.content} data-background={background}>
				{sponsors?.map((sponsor) => {
					return <Sponsor sponsor={sponsor} key={sponsor?.id} />;
				})}
			</div>
		</div>
	);
}
