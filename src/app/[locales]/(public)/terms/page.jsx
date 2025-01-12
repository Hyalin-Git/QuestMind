"use client";
import styles from "@/styles/page/terms-and-conditions.module.css";
import { useTranslation } from "react-i18next";

export default function Terms() {
	const { t } = useTranslation();
	return (
		<main className={styles.main}>
			<div className={styles.background}></div>
			<div className={styles.container}>
				<h1>{t("termsHeader")}</h1>
				<div className={styles.terms}>
					<h2>{t("terms.0.title")}</h2>
					<p dangerouslySetInnerHTML={{ __html: t("terms.0.textOne") }}></p>
					<p dangerouslySetInnerHTML={{ __html: t("terms.0.textTwo") }}></p>
					<p dangerouslySetInnerHTML={{ __html: t("terms.0.textThree") }}></p>
					<p dangerouslySetInnerHTML={{ __html: t("terms.0.textFour") }}></p>
					<p dangerouslySetInnerHTML={{ __html: t("terms.0.textFive") }}></p>
				</div>
				<div className={styles.terms}>
					<h2>{t("terms.1.title")}</h2>
					<p dangerouslySetInnerHTML={{ __html: t("terms.1.textOne") }}></p>
					<p dangerouslySetInnerHTML={{ __html: t("terms.1.textTwo") }}></p>
				</div>
				<div className={styles.terms}>
					<h2>{t("terms.2.title")}</h2>
					<p dangerouslySetInnerHTML={{ __html: t("terms.2.textOne") }}></p>
					<span>{t("terms.2.spanOne")}</span>
					<ul>
						<li>{t("terms.2.liOne")}</li>
						<li>{t("terms.2.liTwo")}</li>
						<li>{t("terms.2.liThree")}</li>
					</ul>
					<span>{t("terms.2.spanTwo")}</span>
					<p> {t("terms.2.textTwo")}</p>
					<span>{t("terms.2.spanThree")}</span>
					<p>{t("terms.2.textThree")}</p>
					<span>{t("terms.2.spanFour")}</span>
					<p>{t("terms.2.textFour")}</p>
					<ul>
						<li>{t("terms.2.liFour")}</li>
						<li>{t("terms.2.liFive")}</li>
						<li>{t("terms.2.liSix")}</li>
					</ul>
					<p dangerouslySetInnerHTML={{ __html: t("terms.2.textFive") }}></p>
				</div>
				<div className={styles.terms}>
					<h2>{t("terms.3.title")}</h2>
					<p>{t("terms.3.textOne")}</p>
				</div>
				<div className={styles.terms}>
					<h2>{t("terms.4.title")}</h2>
					<p>{t("terms.4.textOne")}</p>
				</div>
				<div className={styles.terms}>
					<h2>{t("terms.5.title")}</h2>
					<p>{t("terms.5.textOne")}</p>
				</div>
			</div>
		</main>
	);
}
