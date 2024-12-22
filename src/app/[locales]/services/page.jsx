import Service from "@/components/service/Service";
import { outfit, roboto } from "@/libs/font";
import styles from "@/styles/page/services.module.css";

export default function Services() {
	const services = [
		{
			id: 1,
			title: "Career Management",
			content: `We believe that every athlete deserves tailored support, comprehensive career management and a strategic vision for the future. 
            Our mission is to offer them the best opportunities to ensure their long-term success. 
            At Questmind, we offer a personalised service aimed at defining a career plan that embodies each individual's unique ambitions and potential.`,
			subContent: `We also take care of finding the right team for our players, taking into account their goals, willingness and compatibility. 
            We negotiate with teams to ensure beneficial agreements tailored to each athlete's aspirations.`,
			icon: "/career.svg",
			sideImage: "",
		},
		{
			id: 2,
			title: "Sponsorships",
			content: `Sponsorship offers athletes a valuable opportunity to expand their network, raise their profile and generate additional income. 
            By collaborating with brands and companies, athletes can not only benefit from financial support, but also reinforce their image as influencers in their field. 
            This gives them access to exclusive resources, the opportunity to take part in high-profile events and diversify their sources of income while remaining focused on their performance. 
            A well-chosen partnership can have a significant impact on a player's long-term career.`,
			icon: "/sponsorships.svg",
			sideImage: "/message.svg",
		},
		{
			id: 3,
			title: "Marketing",
			content: `In esports, visibility is an essential lever for success! We work closely with each player to build a brand image that is powerful, 
            authentic and aligned with their personality. Our aim is to create an identity that resonates with the public, inspires trust with partners, 
            and strengthens the commitment of fans. With a targeted communications strategy, 
            we help each athlete stand out in a fast-growing sector and maximise their impact on the national and international stage!`,
			icon: "/marketing.svg",
			sideImage: "/play.svg",
		},
		{
			id: 4,
			title: "Administrative & legal support",
			content: `Esport is a field that requires mastery of the administrative and legal aspects, which are often complex and constantly evolving. 
            Our team provides rigorous support for each player, taking charge of the in-depth examination, validation and authenticity of all contracts, 
            thus guaranteeing solid and transparent agreements. 
            We also offer sound financial advice and manage disputes and negotiations to protect the best interests of our athletes. 
            This approach allows each player to concentrate fully on their performance, in complete confidence, while we ensure that every aspect of their career is built on a sound, stable and secure foundation.`,
			subContent: "",
			icon: "/auction.svg",
			sideImage: "",
		},
	];
	return (
		<main className={styles.container}>
			<div className={styles.background}></div>
			<div className={styles.heading}>
				<p>
					At Questmind, we put our expertise at the service of our athletes by
					helping them build a solid career, develop an authentic brand image
					and create exceptional partnerships. With over six years' experience,
					we have developed a comprehensive, tailor-made approach designed to
					propel each player to the pinnacle of his or her career.
				</p>
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
		</main>
	);
}
