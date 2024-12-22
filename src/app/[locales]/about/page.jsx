import styles from "@/styles/page/about.module.css";
import { outfit } from "@/libs/font";
import Image from "next/image";

export default function About() {
	const cards = [
		{
			id: 1,
			title: "Passion",
			content: "More than a job, esports is our calling",
			icon: "/cupid-target.svg",
			alt: "Icône cible cupidon",
		},
		{
			id: 2,
			title: "Excellence",
			content: "We strive for quality at every stage of our players’ journeys",
			icon: "/graduation.svg",
			alt: "Icône diplôme",
		},
		{
			id: 3,
			title: "Commitment",
			content: "Our talents deserve complete, uncompromising support",
			icon: "/handshake.svg",
			alt: "Icône poigner de main",
		},
		{
			id: 4,
			title: "Integrity",
			content: "Every decision is driven by transparency and respect",
			icon: "/balance.svg",
			alt: "Icône d'une balance",
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
							<h1 className={outfit.className}>About us</h1>
						</div>
						<p>
							<strong>QuestMind</strong> was founded from a shared passion for
							esports, strengthened over time by years of experience and a
							robust network within the industry. We understand the demands of
							competitive gaming and the unique challenges players face. Our
							team comprises experts who live and breathe esports, dedicated to
							helping each player build a successful and sustainable career.
						</p>
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
					<h3>Why QuestMind?</h3>
					<div>
						<p>
							At QuestMind, we are more than an agency — we are a trusted
							partner invested in our players’ success. Our expertise allows us
							to anticipate market needs and position our talents for the best
							opportunities. With QuestMind, turn your passion into success and
							join an agency that shares your ambitions.
						</p>
					</div>
				</section>
				<div className={styles.buttonWrapper}>
					<button id="contact">Contact us</button>
				</div>
			</div>
		</main>
	);
}
