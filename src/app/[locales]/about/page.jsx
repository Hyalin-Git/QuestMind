"use server";
import styles from "@/styles/page/about.module.css";
import { outfit } from "@/libs/font";
import Image from "next/image";
import initTranslations from "@/app/i18n";

export default async function About({ params }) {
	const { locales } = await params;
	const { t } = await initTranslations(locales, ["common"]);
	const cards = [
		{
			id: 1,
			title: t("aboutCards.0.title"),
			content: t("aboutCards.0.content"),
			icon: t("aboutCards.0.icon"),
			alt: t("aboutCards.0.alt"),
		},
		{
			id: 2,
			title: t("aboutCards.1.title"),
			content: t("aboutCards.1.content"),
			icon: t("aboutCards.1.icon"),
			alt: t("aboutCards.1.alt"),
		},
		{
			id: 3,
			title: t("aboutCards.2.title"),
			content: t("aboutCards.2.content"),
			icon: t("aboutCards.2.icon"),
			alt: t("aboutCards.2.alt"),
		},
		{
			id: 4,
			title: t("aboutCards.3.title"),
			content: t("aboutCards.3.content"),
			icon: t("aboutCards.3.icon"),
			alt: t("aboutCards.3.alt"),
		},
	];
	return (
		<main className={styles.main}>
			<div className={styles.background}></div>
			<div className={styles.container}>
				<div className={styles.slogan}>
					<div>
						<p className={outfit.className}>
							Inspiring <span>Talent</span>. Achieving <span>Excellence</span>.
						</p>
						<p>Turning Gamers into Icons and Passion into Opportunity.</p>
					</div>
				</div>
				<section aria-label="about-section">
					<div className={styles.heading}>
						<div className={styles.title}>
							<Image
								src={"/star.svg"}
								width={30}
								height={30}
								alt="Icone étoile"
							/>
							<h1 className={outfit.className}>{t("aboutUs")}</h1>
						</div>
						<p dangerouslySetInnerHTML={{ __html: t("aboutText") }}></p>
					</div>
					<div className={styles.cards}>
						{cards.map((card) => {
							return (
								<article key={card.id} className={styles.card}>
									<div className={styles.iconWrapper}>
										<Image
											src={card.icon}
											width={90}
											height={90}
											alt={card.alt}
										/>
									</div>
									<div className={styles.content}>
										<h2>{card.title}</h2>
										<p>{card.content}</p>
									</div>
								</article>
							);
						})}
					</div>
				</section>
				<section className={styles.question}>
					<h3>{t("aboutQuestion")}</h3>
					<div>
						<p>{t("aboutResponse")}</p>
					</div>
				</section>
				<div className={styles.buttonWrapper}>
					<button id="contact">{t("btnContact")}</button>
				</div>
			</div>
		</main>
	);
}
