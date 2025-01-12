"use server";
import styles from "@/styles/page/athlete.module.css";
import { getPlayer } from "@/api/players";
import { outfit, roboto } from "@/libs/font";
import Image from "next/image";
import Link from "next/link";
import initTranslations from "@/app/i18n";
import Error from "@/app/[locales]/error";

export default async function Athlete({ params }) {
	const { slug, locales } = await params;
	const { t } = await initTranslations(locales, ["common"]);
	const { data, success } = await getPlayer(slug);
	console.log(success);
	const player = data[0];
	const hasX = player?.x_url;
	const hasTiktok = player?.tiktok_url;
	const hasInstagram = player?.instagram_url;
	const hasYoutube = player?.youtube_url;
	const hasTwitch = player?.twitch_url;
	const performances = player?.performances?.split(",");

	function formatNumber(num) {
		if (num >= 1000000) {
			return (num / 1000000).toFixed(1).replace(/\.0$/, "") + "M";
		} else if (num >= 1000) {
			return (num / 1000).toFixed(1).replace(/\.0$/, "") + "k";
		}
		return num.toString();
	}

	if (success === false) {
		<Error />;
	}
	return (
		<main className={styles.main}>
			<div className={styles.background}></div>
			<div>
				{/* player */}
				<div className={styles.player}>
					{/* card */}
					<div>
						<div className={styles.imgWrapper}>
							<Image
								src={player?.picture}
								width={500}
								height={500}
								quality={100}
								alt="player"
							/>
						</div>
						<div className={styles.info}>
							<p>
								{t("audience")} : <span>{formatNumber(player?.audience)}</span>
							</p>
							<ul className={styles.socials}>
								{hasX && (
									<li>
										<a href={player?.x_url} target="_blank">
											<Image
												src={"/twitter.svg"}
												width={30}
												height={30}
												quality={100}
												alt="Twitter"
											/>
										</a>
									</li>
								)}
								{hasTiktok && (
									<li>
										<a href={player?.tiktok_url} target="_blank">
											<Image
												src={"/tiktok.svg"}
												width={30}
												height={30}
												quality={100}
												alt="Tiktok"
											/>
										</a>
									</li>
								)}
								{hasInstagram && (
									<li>
										<a href={player?.instagram_url} target="_blank">
											<Image
												src={"/instagram.svg"}
												width={30}
												height={30}
												quality={100}
												alt="Instagram"
											/>
										</a>
									</li>
								)}
								{hasYoutube && (
									<li>
										<a href={player?.youtube_url} target="_blank">
											<Image
												src={"/youtube.svg"}
												width={30}
												height={30}
												quality={100}
												alt="Youtube"
											/>
										</a>
									</li>
								)}
								{hasTwitch && (
									<li>
										<a href={player?.twitch_url} target="_blank">
											<Image
												src={"/twitch.svg"}
												width={30}
												height={30}
												quality={100}
												alt="Twitch"
											/>
										</a>
									</li>
								)}
							</ul>
						</div>
					</div>
					<div className={styles.right}>
						<div className={styles.names}>
							<span className={`${outfit.className} ${styles.firstname}`}>
								{player.username}
							</span>
							<span className={styles.name}>
								{player.lastname.toUpperCase() + " " + player.firstname}
							</span>
							<p className={`${roboto.className} ${styles.game}`}>
								Professional {player.game} Player
							</p>
						</div>
						<div className={styles.performances}>
							{performances &&
								performances.map((performance, idx) => {
									return (
										<div key={idx} className={styles.performance}>
											{performance}
										</div>
									);
								})}
						</div>
					</div>
				</div>
				{/* contact */}
				<div className={styles.contact}>
					<p dangerouslySetInnerHTML={{ __html: t("getInTouch") }}></p>
					<Link href={"/contact"}>
						<button id="contact" className={roboto.className}>
							{t("btnContact")}
						</button>
					</Link>
				</div>

				{/* slogan */}
				<div className={styles.slogan}>
					<p className={outfit.className}>
						Inspiring <span>Talent</span>. Achieving <span>Excellence</span>.
					</p>
					<p>Turning Gamers into Icons and Passion into Opportunity.</p>
				</div>
				<div className={styles.arrow}>
					<Link href="/athletes">
						<Image src={"/left-arrow.svg"} width={40} height={40} alt="Arrow" />
					</Link>
				</div>
			</div>
		</main>
	);
}
