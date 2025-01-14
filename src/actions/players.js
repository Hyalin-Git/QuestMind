"use server";

import { playerSchema } from "@/libs/zod";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export async function savePlayer(prevState, formData) {
	try {
		const cookie = await cookies();
		const session = cookie?.get("session");

		const playerData = {
			lastname: formData.get("lastname") || "",
			firstname: formData.get("firstname") || "",
			username: formData.get("username") || "",
			picture: formData.get("picture"), // Ceci devrait être un File
			team: formData.get("team") || "",
			audience: formData.get("audience") || "",
			xUrl: formData.get("x-url") || "",
			twitchUrl: formData.get("twitch-url") || "",
			instagramUrl: formData.get("instagram-url") || "",
			youtubeUrl: formData.get("youtube-url") || "",
			tiktokUrl: formData.get("tiktok-url") || "",
		};

		const validation = playerSchema.safeParse(playerData);

		if (!validation.success) {
			const errors = validation.error.flatten().fieldErrors;

			if (errors.lastname) throw new Error(errors.lastname);
			if (errors.firstname) throw new Error(errors.firstname);
			if (errors.username) throw new Error(errors.username);
			if (errors.team) throw new Error(errors.team);
			if (errors.xUrl) throw new Error(errors.xUrl);
			if (errors.twitchUrl) throw new Error(errors.twitchUrl);
			if (errors.instagramUrl) throw new Error(errors.instagramUrl);
			if (errors.youtubeUrl) throw new Error(errors.youtubeUrl);
			if (errors.tiktokUrl) throw new Error(errors.tiktokUrl);
		}

		if (formData.get("picture")?.name === "undefined") {
			throw new Error("Photo de profil requis");
		}

		const data = new FormData();

		Object.entries(playerData).forEach(([key, value]) => {
			data.append(key, value);
		});

		const playerRes = await fetch(`${process.env.API_URL}/api/players/post`, {
			method: "POST",
			headers: {
				Authorization: `Bearer ${session?.value}`,
			},
			body: data,
		});

		const playerResponse = await playerRes.json();

		if (!playerResponse.success) throw new Error(playerResponse?.message);

		if (formData.get("game")) {
			const rawData = {
				playerId: playerResponse?.insertId,
				gameId: formData?.get("game"),
			};

			const res = await fetch(`${process.env.API_URL}/api/players/games/post`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${session?.value}`,
				},
				body: JSON.stringify(rawData),
			});

			const response = await res.json();

			if (!response.success) throw new Error(response?.message);
		}

		if (formData.get("region")) {
			const rawData = {
				playerId: playerResponse?.insertId,
				nationalityId: formData?.get("region"),
			};

			const res = await fetch(
				`${process.env.API_URL}/api/players/nationalities/post`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${session?.value}`,
					},
					body: JSON.stringify(rawData),
				}
			);

			const response = await res.json();

			if (!response.success) throw new Error(response?.message);
		}

		revalidateTag("players");

		return {
			status: "success",
			message: "Joueur ajouté avec succès",
		};
	} catch (err) {
		console.error("Failed to save player:", err);

		return {
			status: "failure",
			message: err?.message || "Une erreur est survenue",
		};
	}
}
