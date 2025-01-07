"use server";
import initTranslations from "@/app/i18n";
import Service from "@/components/service/Service";
import { outfit, roboto } from "@/libs/font";
import styles from "@/styles/page/services.module.css";
import Link from "next/link";

export default async function Services({ params }) {
	const { locales } = await params;
	const { t } = await initTranslations(locales, ["common"]);
	const services = [
		{
			id: 1,
			title: t("cards.0.title"),
			content: t("cards.0.content"),
			subContent: t("cards.0.subContent"),
			icon: "/career.svg",
			sideImage: "",
		},
		{
			id: 2,
			title: t("cards.1.title"),
			content: t("cards.1.content"),
			icon: "/sponsorships.svg",
			sideImage: "/message.svg",
		},
		{
			id: 3,
			title: t("cards.2.title"),
			content: t("cards.2.content"),
			icon: "/marketing.svg",
			sideImage: "/play.svg",
		},
		{
			id: 4,
			title: t("cards.3.title"),
			content: t("cards.3.content"),
			icon: "/auction.svg",
			sideImage: "",
		},
	];
	return (
		<main className={styles.container}>
			<div className={styles.background}></div>
			<div className={styles.heading}>
				<p>{t("serviceTitle")}</p>
			</div>
			<div className={styles.content}>
				{services.map((service) => {
					return (
						<Service
							title={service.title}
							content={service.content}
							subContent={service.subContent}
							icon={service.icon}
							sideImage={service.sideImage}
							key={service.id}
						/>
					);
				})}
			</div>
			<div className={styles.contact}>
				<Link href={"/contact"}>
					<button id="contact" className={roboto.className}>
						{t("btnContact")}
					</button>
				</Link>
			</div>
			<div className={styles.slogan}>
				<p className={outfit.className}>
					Inspiring <span>Talent</span>. Achieving <span>Excellence</span>.
				</p>
				<p>Turning Gamers into Icons and Passion into Opportunity.</p>
			</div>
		</main>
	);
}
