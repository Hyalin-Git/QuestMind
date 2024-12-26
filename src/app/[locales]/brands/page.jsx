"use server";
import styles from "@/styles/page/brands.module.css";
import { getSponsors } from "@/api/sponsors";
import Sponsors from "@/components/sponsors/Sponsors";
import Cards from "@/components/cards/Cards";
import Responses from "@/components/responses/Responses";
import { outfit, roboto } from "@/libs/font";
import initTranslations from "@/app/i18n";

export default async function Brands({ params }) {
	const { locales } = await params;
	const { t } = await initTranslations(locales, ["common"]);
	const sponsors = await getSponsors();

	const Cardsdata = [
		{
			id: 1,
			title: t("brandsCards.0.title"),
			content: t("brandsCards.0.content"),
		},

		{
			id: 2,
			title: t("brandsCards.1.title"),
			content: t("brandsCards.1.content"),
		},
		{
			id: 3,
			title: t("brandsCards.2.title"),
			content: t("brandsCards.2.content"),
		},
		{
			id: 4,
			title: t("brandsCards.3.title"),
			content: t("brandsCards.3.content"),
		},
	];

	const responsesData = [
		{
			id: 1,
			content: t("brandsResponses.0.content"),
		},
		{
			id: 2,
			content: t("brandsResponses.1.content"),
		},
		{
			id: 3,
			content: t("brandsResponses.2.content"),
		},
		{
			id: 4,
			content: t("brandsResponses.3.content"),
		},
		{
			id: 5,
			content: t("brandsResponses.4.content"),
		},
	];

	return (
		<main className={styles.main}>
			<div className={styles.background}></div>
			<div className={styles.container}>
				<div className={styles.heading}>
					<p>{t("brandsTitle")}</p>
				</div>

				<Cards data={Cardsdata} />

				<div className={styles.question}>
					<p dangerouslySetInnerHTML={{ __html: t("question") }}></p>
				</div>

				<Responses data={responsesData} />
				<div className={styles.text}>
					<p dangerouslySetInnerHTML={{ __html: t("brandsFooterText") }}></p>
				</div>
				<Sponsors data={sponsors} background={false} />
				<div className={styles.button}>
					<button id="contact" className={roboto.className}>
						{t("btnContact")}
					</button>
				</div>
				<div className={styles.slogan}>
					<p className={outfit.className}>
						Inspiring <span>Talent</span>. Achieving <span>Excellence</span>.
					</p>
					<p>Turning Gamers into Icons and Passion into Opportunity.</p>
				</div>
			</div>
		</main>
	);
}
