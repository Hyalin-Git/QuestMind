"use client";
import styles from "@/styles/components/cards/cards.module.css";
import Card from "./Card";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

export default function Cards({ data }) {
	const responsive = {
		superLargeDesktop: {
			// the naming can be any, depends on you.
			breakpoint: { max: 4000, min: 3000 },
			items: 5,
		},
		desktop: {
			breakpoint: { max: 3000, min: 1024 },
			items: 3,
		},
		tablet: {
			breakpoint: { max: 1024, min: 464 },
			items: 2,
		},
		mobile: {
			breakpoint: { max: 464, min: 0 },
			items: 1,
		},
	};

	return (
		<div className={styles.container}>
			<Carousel
				responsive={responsive}
				containerClass="carousel-container"
				autoPlay={true} // Active l'autoplay
				autoPlaySpeed={3000} // Défile toutes les 3 secondes
				infinite={true} // Boucle infinie
				slidesToSlide={3}
				itemClass="carousel-item"
				partialVisible={false}>
				{data?.map((elt) => {
					return <Card elt={elt} key={elt.id} />;
				})}
			</Carousel>
		</div>
	);
}
