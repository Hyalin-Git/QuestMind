"use server";
import styles from "@/styles/page/brands.module.css";
import { getSponsors } from "@/api/sponsors";
import Sponsors from "@/components/sponsors/Sponsors";
import Cards from "@/components/cards/Cards";
import Responses from "@/components/responses/Responses";
import { outfit, roboto } from "@/libs/font";

export default async function Brands() {
	const sponsors = await getSponsors();
	const Cardsdata = [
		{
			id: 1,
			title: "Player Sponsorship",
			content:
				"Associate your brand with top-level players, using levers that boost your visibility and the authenticity of your partnership.",
		},

		{
			id: 2,
			title: "Collaborations and Sponsored Content",
			content:
				"Create captivating campaigns via videos, streams or publications, integrating your products into the world of top-level professional gamers.",
		},
		{
			id: 3,
			title: "Brand engagement during events",
			content:
				"Benefit from optimum visibility at esport events, with your brand promoted by our athletes and the ability to offer immersive experiences to participants.",
		},
		{
			id: 4,
			title: "Co-Branding and Limited Editions",
			content:
				"Launch co-branded or exclusive products with our talent to create a visual and memorable impact.",
		},
	];

	const responsesData = [
		{
			id: 1,
			content: `Over <strong>6 years</strong> expertise in the esport industry`,
		},
		{
			id: 2,
			content: "Targeted and engaged audience, ideal for authentic campaigns",
		},
		{
			id: 3,
			content:
				"Maximum visibility thanks to our network of athletes at competitions and events.",
		},
		{
			id: 4,
			content: "Tailor-made partnerships to meet your specific needs",
		},
		{
			id: 5,
			content: "Constant innovation to stay ahead of the trends",
		},
	];
	return (
		<main className={styles.main}>
			<div className={styles.background}></div>
			<div className={styles.container}>
				<div className={styles.heading}>
					<p>
						At QuestMind, we create strategic partnerships between brands and
						our esport athletes to maximise impact and engagement. Esports offer
						a unique opportunity to unite a young and loyal audience. We use our
						expertise to help you develop tailor-made activations and effective
						sponsorship campaigns. Our Partnership Solutions :
					</p>
				</div>

				<Cards data={Cardsdata} />

				<div className={styles.question}>
					<p>
						Why choose <span>QuestMind</span>?
					</p>
				</div>

				<Responses data={responsesData} />
				<div className={styles.text}>
					<p>
						Esports is a powerful strategic lever for your brand.{" "}
						<span>QuestMind</span> is your partner to create strong and lasting
						partnerships in this world. Contact us today to explore your
						collaboration opportunities.
					</p>
				</div>
				<Sponsors data={sponsors} background={false} />
				<div className={styles.button}>
					<button id="contact" className={roboto.className}>
						Contact us
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
