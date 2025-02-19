"use client";
import styles from "@/styles/components/dashboard/table.module.css";
import { montserrat } from "@/libs/font";
import { faPenToSquare, faXmark } from "@fortawesome/free-solid-svg-icons";
import { deletePlayer } from "@/api/players";
import { useState } from "react";
import FormPlayer from "./FormPlayer";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import FormGames from "./games/FormGames";
import { deleteGame } from "@/api/games";
import FormSponsor from "./FormSponsor";
import { deleteSponsor } from "@/api/sponsors";
import FormRegion from "./FormRegion";
import { deleteNationality } from "@/api/nationalities";
import { deleteUser } from "@/api/users";
import FormUser from "./FormUser";
import { deleteTrendingPlayer } from "@/api/trending";
import FormTrending from "./FormTrending";
import FormPerformance from "./FormPerformance";
import { deletePlayerPerformance } from "@/api/performances";

export default function Table({
	data,
	players,
	games,
	nationalities,
	section,
	theads,
	btnText,
	type,
}) {
	const [openModal, setOpenModal] = useState(false);
	const [selectedForm, setSelectedForm] = useState(null);

	const handleEdit = (data) => {
		setSelectedForm(data);
		setOpenModal(true);
	};

	const handleOpenModal = () => {
		setOpenModal(true);

		setSelectedForm(null);
	};

	const handleCloseModal = () => {
		setOpenModal(false);

		setSelectedForm(null);
	};

	async function handleDelete(data) {
		let text = "";

		if (type === "player") {
			text = "Voulez-vous vraimment supprimer ce joueur ?";
		}

		if (type === "game") {
			text = "Voulez-vous vraimment supprimer ce jeu ?";
		}

		if (type === "sponsor") {
			text = "Voulez-vous vraimment supprimer ce sponsor ?";
		}

		if (type === "region") {
			text = "Voulez-vous vraimment supprimer cette région ?";
		}

		if (type === "users") {
			text = "Voulez-vous vraimment supprimer cet utilisateur ?";
		}

		if (type === "trending") {
			text = "Voulez-vous vraimment supprimer ce joueur en trending ?";
		}

		if (type === "performance") {
			text = "Voulez-vous vraimment supprimer cette performance ?";
		}

		const isConfirmed = window.confirm(text);

		if (isConfirmed) {
			if (type === "player") {
				const res = await deletePlayer(data);

				if (res?.success) {
					return alert("Joueur supprimé avec succès");
				} else {
					return alert(res.message || "Impossible de supprimer ce joueur");
				}
			}
			if (type === "game") {
				const res = await deleteGame(data);

				if (res?.success) {
					return alert("Jeu supprimé avec succès");
				} else {
					return alert(res.message || "Impossible de supprimer ce jeu");
				}
			}
			if (type === "sponsor") {
				const res = await deleteSponsor(data);

				if (res?.success) {
					return alert("Sponsor supprimé avec succès");
				} else {
					return alert(res.message || "Impossible de supprimer ce jeu");
				}
			}
			if (type === "region") {
				const res = await deleteNationality(data);

				if (res?.success) {
					return alert("Région supprimé avec succès");
				} else {
					return alert(res.message || "Impossible de supprimer cette région");
				}
			}

			if (type === "users") {
				const res = await deleteUser(data);

				if (res?.success) {
					return alert("Utilisateur supprimé avec succès");
				} else {
					return alert(
						res.message || "Impossible de supprimer cet utilisateur"
					);
				}
			}

			if (type === "trending") {
				const res = await deleteTrendingPlayer(data);

				if (res?.success) {
					return alert("Joueur en trending supprimé avec succès");
				} else {
					return alert(
						res.message || "Impossible de supprimer ce joueur en trending"
					);
				}
			}

			if (type === "performance") {
				const res = await deletePlayerPerformance(data);

				if (res?.success) {
					return alert("Performance supprimée avec succès");
				} else {
					return alert(
						res.message || "Impossible de supprimer cette performance"
					);
				}
			}
		}

		return;
	}

	return (
		<section className={`${montserrat.className} ${styles.container}`}>
			{section && <h2>{section}</h2>}

			<div className={styles.btn}>
				{type === "users" ? (
					<Link href={`/${process.env.NEXT_PUBLIC_SECRET_URL}/auth`}>
						<button className={montserrat.className}>{btnText}</button>
					</Link>
				) : (
					<button className={montserrat.className} onClick={handleOpenModal}>
						{btnText}
					</button>
				)}
			</div>
			<div className={styles.tableContainer}>
				<table>
					<thead>
						<tr>
							{theads.map((th, idx) => {
								return (
									<th scope="col" key={idx}>
										{th}
									</th>
								);
							})}
						</tr>
					</thead>
					{type === "player" && (
						<PlayerList
							data={data}
							handleEdit={handleEdit}
							handleDelete={handleDelete}
						/>
					)}
					{type === "game" && (
						<GameList
							data={data}
							handleEdit={handleEdit}
							handleDelete={handleDelete}
						/>
					)}
					{type === "sponsor" && (
						<SponsorsList
							data={data}
							handleEdit={handleEdit}
							handleDelete={handleDelete}
						/>
					)}
					{type === "region" && (
						<RegionList
							data={data}
							handleEdit={handleEdit}
							handleDelete={handleDelete}
						/>
					)}
					{type === "users" && (
						<UsersList
							data={data}
							handleEdit={handleEdit}
							handleDelete={handleDelete}
						/>
					)}
					{type === "trending" && (
						<TrendingList
							data={data}
							handleEdit={handleEdit}
							handleDelete={handleDelete}
						/>
					)}
					{type === "performance" && (
						<PerformanceList
							data={data}
							handleEdit={handleEdit}
							handleDelete={handleDelete}
						/>
					)}
				</table>
			</div>
			{openModal && (
				<>
					{type === "player" && (
						<FormPlayer
							setOpenModal={handleCloseModal}
							player={selectedForm}
							games={games}
							nationalities={nationalities}
						/>
					)}
					{type === "game" && (
						<FormGames game={selectedForm} setOpenModal={setOpenModal} />
					)}
					{type === "sponsor" && (
						<FormSponsor sponsor={selectedForm} setOpenModal={setOpenModal} />
					)}
					{type === "region" && (
						<FormRegion region={selectedForm} setOpenModal={setOpenModal} />
					)}
					{type === "users" && (
						<FormUser user={selectedForm} setOpenModal={setOpenModal} />
					)}
					{type === "trending" && (
						<FormTrending
							player={selectedForm}
							players={players}
							trending={data}
							setOpenModal={setOpenModal}
						/>
					)}
					{type === "performance" && (
						<FormPerformance
							performance={selectedForm}
							players={players}
							setOpenModal={setOpenModal}
						/>
					)}
				</>
			)}
		</section>
	);
}

export function PlayerList({ data, handleEdit, handleDelete }) {
	return (
		<tbody>
			{data?.length > 0 &&
				data?.map((player) => {
					const hasTwitter = player?.x_url;
					const hasTwitch = player?.twitch_url;
					const hasInstagram = player?.instagram_url;
					const hasYoutube = player?.youtube_url;
					const hasTiktok = player?.tiktok_url;
					const hasLeaguepedia = player?.leaguepedia_url;
					const hasLolpro = player?.lolpro_url;
					const hasLiquipedia = player?.liquipedia_url;
					const hasVlr = player?.vlr_url;
					const hasHltv = player?.hltv_url;

					const createdAt = player?.created_at?.split("T")[0];
					const updatedAt = player?.updated_at?.split("T")[0];

					return (
						<tr key={player?.id}>
							<th scope="row">{player?.firstName}</th>
							<th>{player?.lastName}</th>
							<th>{player?.username}</th>
							<th>
								<Image
									src={player?.picture}
									width={50}
									height={50}
									quality={100}
									alt={`Photo de ${player?.username}`}
									style={{
										position: "relative",
										top: "1.5px",
										objectFit: "contain",
										borderRadius: "4px",
									}}
								/>
							</th>
							<th>{player?.region}</th>
							<th>{player?.game}</th>
							<th>{player?.team}</th>
							<th>
								{hasTwitter && (
									<Link href={hasTwitter}>
										<Image
											src={"/twitter.svg"}
											width={20}
											height={20}
											alt="Twitter"
											className={styles.logo}
										/>
									</Link>
								)}
								{hasTwitch && (
									<Link href={hasTwitch}>
										<Image
											src={"/twitch.svg"}
											width={20}
											height={20}
											alt="Twitch"
											className={styles.logo}
										/>
									</Link>
								)}
								{hasInstagram && (
									<Link href={hasInstagram}>
										<Image
											src={"/instagram.svg"}
											width={20}
											height={20}
											alt="Instagram"
											className={styles.logo}
										/>
									</Link>
								)}
								{hasYoutube && (
									<Link href={hasYoutube}>
										<Image
											src={"/youtube.svg"}
											width={20}
											height={20}
											alt="Youtube"
											className={styles.logo}
										/>
									</Link>
								)}
								{hasTiktok && (
									<Link href={hasTiktok}>
										<Image
											src={"/tiktok.svg"}
											width={20}
											height={20}
											alt="Tiktok"
											className={styles.logo}
										/>
									</Link>
								)}
								{hasLeaguepedia && (
									<Link href={hasLeaguepedia}>
										<Image
											src={"/leaguepedia.svg"}
											width={20}
											height={20}
											quality={100}
											alt="Leaguepedia"
										/>
									</Link>
								)}
								{hasLolpro && (
									<Link href={hasLolpro}>
										<Image
											src={"/lolpro.png"}
											width={20}
											height={20}
											alt="Lolpro"
											className={styles.logo}
										/>
									</Link>
								)}
								{hasLiquipedia && (
									<Link href={hasLiquipedia}>
										<Image
											src={"/liquipedia.svg"}
											width={20}
											height={20}
											alt="Liquipedia"
										/>
									</Link>
								)}
								{hasVlr && (
									<Link href={hasVlr}>
										<Image src={"/vlr.png"} width={20} height={20} alt="Vlr" />
									</Link>
								)}
								{hasHltv && (
									<Link href={hasHltv}>
										<Image
											src={"/hltv.png"}
											width={20}
											height={20}
											alt="Hltv"
										/>
									</Link>
								)}
							</th>
							<th>{player?.audience}</th>
							<th>{createdAt}</th>
							<th>{updatedAt}</th>
							<th>
								<FontAwesomeIcon
									icon={faPenToSquare}
									onClick={() => handleEdit(player)}
								/>
								<FontAwesomeIcon
									icon={faXmark}
									onClick={() => handleDelete(player?.id)}
								/>
							</th>
						</tr>
					);
				})}
		</tbody>
	);
}

export function GameList({ data, handleEdit, handleDelete }) {
	return (
		<tbody>
			{data?.length > 0 &&
				data?.map((game) => {
					const createdAt = game?.created_at?.split("T")[0];
					const updatedAt = game?.updated_at?.split("T")[0];
					return (
						<tr key={game?.id}>
							<th scope="row">{game?.game}</th>
							<th>
								{game?.picture && (
									<Image
										src={game?.picture}
										width={50}
										height={50}
										quality={100}
										alt={`Photo de ${game?.game}`}
										className={styles.logo}
										style={{
											position: "relative",
											top: "1.5px",
											objectFit: "contain",
										}}
									/>
								)}
							</th>
							<th>{game?.is_mobile ? "Oui" : "Non"}</th>
							<th>{createdAt}</th>
							<th>{updatedAt}</th>
							<th>
								<FontAwesomeIcon
									icon={faPenToSquare}
									onClick={() => handleEdit(game)}
								/>
								<FontAwesomeIcon
									icon={faXmark}
									onClick={() => handleDelete(game?.id)}
								/>
							</th>
						</tr>
					);
				})}
		</tbody>
	);
}

export function SponsorsList({ data, handleEdit, handleDelete }) {
	return (
		<tbody>
			{data?.length > 0 &&
				data?.map((sponsor) => {
					const createdAt = sponsor?.created_at?.split("T")[0];
					const updatedAt = sponsor?.updated_at?.split("T")[0];
					return (
						<tr key={sponsor?.id}>
							<th scope="row">{sponsor?.sponsor}</th>
							<th>
								{sponsor?.picture && (
									<Image
										src={sponsor?.picture}
										width={80}
										height={80}
										quality={100}
										alt={`Photo de ${sponsor?.sponsor}`}
										className={styles.logo}
										style={{
											position: "relative",
											top: "1.5px",
											objectFit: "contain",
										}}
									/>
								)}
							</th>
							<th>{createdAt}</th>
							<th>{updatedAt}</th>
							<th>
								<FontAwesomeIcon
									icon={faPenToSquare}
									onClick={() => handleEdit(sponsor)}
								/>
								<FontAwesomeIcon
									icon={faXmark}
									onClick={() => handleDelete(sponsor?.id)}
								/>
							</th>
						</tr>
					);
				})}
		</tbody>
	);
}

export function RegionList({ data, handleEdit, handleDelete }) {
	return (
		<tbody>
			{data?.length > 0 &&
				data?.map((region) => {
					const createdAt = region?.created_at?.split("T")[0];
					const updatedAt = region?.updated_at?.split("T")[0];
					return (
						<tr key={region?.id}>
							<th scope="row">{region?.region}</th>
							<th>{createdAt}</th>
							<th>{updatedAt}</th>
							<th>
								<FontAwesomeIcon
									icon={faPenToSquare}
									onClick={() => handleEdit(region)}
								/>
								<FontAwesomeIcon
									icon={faXmark}
									onClick={() => handleDelete(region?.id)}
								/>
							</th>
						</tr>
					);
				})}
		</tbody>
	);
}

export function UsersList({ data, handleEdit, handleDelete }) {
	return (
		<tbody>
			{data?.length > 0 &&
				data?.map((user) => {
					const createdAt = user?.created_at?.split("T")[0];
					const updatedAt = user?.updated_at?.split("T")[0];
					return (
						<tr key={user?.id}>
							<th scope="row">{user?.email}</th>
							<th>{user?.role}</th>
							<th>{createdAt}</th>
							<th>{updatedAt}</th>
							<th>
								<FontAwesomeIcon
									icon={faPenToSquare}
									onClick={() => handleEdit(user)}
								/>
								<FontAwesomeIcon
									icon={faXmark}
									onClick={() => handleDelete(user?.id)}
								/>
							</th>
						</tr>
					);
				})}
		</tbody>
	);
}

export function PerformanceList({ data, handleEdit, handleDelete }) {
	return (
		<tbody>
			{data?.length > 0 &&
				data?.map((elt) => {
					return (
						<tr key={elt?.id}>
							<th scope="row">{elt?.username}</th>
							<th>
								{elt?.picture && (
									<Image
										src={elt?.picture}
										width={50}
										height={50}
										quality={100}
										alt={`Photo de ${elt?.username}`}
										style={{
											position: "relative",
											top: "1.5px",
											objectFit: "contain",
										}}
									/>
								)}
							</th>
							<th>{elt?.performance}</th>
							<th>
								<FontAwesomeIcon
									icon={faPenToSquare}
									onClick={() => handleEdit(elt)}
								/>
								<FontAwesomeIcon
									icon={faXmark}
									onClick={() => handleDelete(elt?.id)}
								/>
							</th>
						</tr>
					);
				})}
		</tbody>
	);
}

export function TrendingList({ data, handleEdit, handleDelete }) {
	return (
		<tbody>
			{data?.length > 0 &&
				data?.map((player) => {
					return (
						<tr key={player?.player_id}>
							<th scope="row">{player?.username}</th>
							<th>
								{player?.picture && (
									<Image
										src={player?.picture}
										width={50}
										height={50}
										quality={100}
										alt={`Photo de ${player?.username}`}
										style={{
											position: "relative",
											top: "1.5px",
											objectFit: "contain",
										}}
									/>
								)}
							</th>
							<th>{player?.position}</th>
							<th>
								<FontAwesomeIcon
									icon={faPenToSquare}
									onClick={() => handleEdit(player)}
								/>
								<FontAwesomeIcon
									icon={faXmark}
									onClick={() => handleDelete(player?.trending_id)}
								/>
							</th>
						</tr>
					);
				})}
		</tbody>
	);
}
