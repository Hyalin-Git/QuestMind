"use client";
import styles from "@/styles/page/terms-and-conditions.module.css";
import { useTranslation } from "react-i18next";

export default function Charts() {
	const { t } = useTranslation();

	return (
		<main className={styles.main}>
			<div className={styles.background}></div>
			<div className={styles.container}>
				<h1>{t("chartHeader")}</h1>
				<div className={styles.terms}>
					<h2
						style={{
							textTransform: "uppercase",
						}}>
						{t("chartPreamble")}
					</h2>
					<p dangerouslySetInnerHTML={{ __html: t("chartPreambleText") }}></p>
				</div>
				<div className={styles.terms}>
					<h2>{t("terms.0.title")}</h2>
					<p dangerouslySetInnerHTML={{ __html: t("chart.0.textOne") }}></p>
				</div>
				<div className={styles.terms}>
					<h2>{t("chart.1.title")}</h2>
					<p dangerouslySetInnerHTML={{ __html: t("chart.1.textOne") }}></p>
					<p dangerouslySetInnerHTML={{ __html: t("chart.1.textTwo") }}></p>
					<p dangerouslySetInnerHTML={{ __html: t("chart.1.textThree") }}></p>
				</div>
				<div className={styles.terms}>
					<h2>{t("chart.2.title")}</h2>
					<p dangerouslySetInnerHTML={{ __html: t("chart.2.textOne") }}></p>
					<p dangerouslySetInnerHTML={{ __html: t("chart.2.textTwo") }}></p>
					<p dangerouslySetInnerHTML={{ __html: t("chart.2.textThree") }}></p>
				</div>
				<div className={styles.terms}>
					<h2>{t("chart.3.title")}</h2>
					<p dangerouslySetInnerHTML={{ __html: t("chart.3.textOne") }}></p>
					<p dangerouslySetInnerHTML={{ __html: t("chart.3.textTwo") }}></p>
				</div>
				<div className={styles.terms}>
					<h2>{t("chart.4.title")}</h2>
					<p dangerouslySetInnerHTML={{ __html: t("chart.4.textOne") }}></p>
					<p dangerouslySetInnerHTML={{ __html: t("chart.4.textTwo") }}></p>
				</div>
				<div className={styles.terms}>
					<h2>{t("chart.5.title")}</h2>
					<p dangerouslySetInnerHTML={{ __html: t("chart.5.textOne") }}></p>
					<p dangerouslySetInnerHTML={{ __html: t("chart.5.textTwo") }}></p>
					<p dangerouslySetInnerHTML={{ __html: t("chart.5.textThree") }}></p>
				</div>
				<div className={styles.terms}>
					<h2>{t("chart.6.title")}</h2>
					<p dangerouslySetInnerHTML={{ __html: t("chart.6.textOne") }}></p>
					<p dangerouslySetInnerHTML={{ __html: t("chart.6.textTwo") }}></p>
					<p dangerouslySetInnerHTML={{ __html: t("chart.6.textThree") }}></p>
				</div>
				<div className={styles.terms}>
					<h2>{t("chart.7.title")}</h2>
					<p dangerouslySetInnerHTML={{ __html: t("chart.7.textOne") }}></p>
				</div>
				<div className={styles.terms}>
					<h2>{t("chart.8.title")}</h2>
					<p dangerouslySetInnerHTML={{ __html: t("chart.8.textOne") }}></p>
				</div>
			</div>
		</main>
	);
}
