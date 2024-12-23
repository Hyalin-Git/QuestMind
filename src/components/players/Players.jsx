"use client";
import styles from "@/styles/components/players/players.module.css";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Image from "next/image";
import Player from "./Player";

export default function Players({ data }) {
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
			breakpoint: { max: 1200, min: 464 },
			items: 2,
		},
		mobile: {
			breakpoint: { max: 520, min: 0 },
			items: 1,
		},
	};
	const CustomLeftArrow = ({ onClick, ...rest }) => {
		const {
			onMove,
			carouselState: { currentSlide, deviceType },
		} = rest;
		return (
			<div
				onClick={() => onClick()}
				style={{
					position: "absolute",
					left: "50px",
					cursor: "pointer",
				}}>
				<Image
					src={"/left-arrow.svg"}
					width={40}
					height={40}
					alt="Flèche directionnelle"
				/>
			</div>
		);
	};

	const CustomRightArrow = ({ onClick, ...rest }) => {
		const {
			onMove,
			carouselState: { currentSlide, deviceType },
		} = rest;
		return (
			<div
				onClick={() => onClick()}
				style={{
					position: "absolute",
					right: "50px",
					cursor: "pointer",
				}}>
				<Image
					src={"/left-arrow.svg"}
					width={40}
					height={40}
					alt="Flèche directionnelle"
					style={{ rotate: "-180deg" }}
				/>
			</div>
		);
	};
	return (
		<div className={styles.container}>
			<Carousel
				responsive={responsive}
				containerClass="carousel-container"
				additionalTransfrom={0}
				autoPlay
				autoPlaySpeed={3000}
				infinite // Boucle infinie
				slidesToSlide={3}
				itemClass="carousel-item"
				customLeftArrow={<CustomLeftArrow />}
				customRightArrow={<CustomRightArrow />}
				customTransition="all 1s"
				transitionDuration={1000}
				removeArrowOnDeviceType={["tablet", "mobile"]}>
				{data?.map((elt) => {
					return <Player elt={elt} key={elt.id} />;
				})}
			</Carousel>
		</div>
	);
}

// export const CustomLeftArrow = ({ onClick, ...rest }) => {
// 	const {
// 		onMove,
// 		carouselState: { currentSlide, deviceType },
// 	} = rest;
// 	// onMove means if dragging or swiping in progress.

// 	return <button onClick={() => onClick()}>yeah</button>;
// };
