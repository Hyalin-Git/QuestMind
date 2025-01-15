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

			return {
				status: "failure",
				message: "Veuillez vérifier le formulaire",
				errors: errors,
			};
		}

		if (formData.get("picture")?.name === "undefined") {
			return {
				status: "failure",
				message: "Veuillez vérifier le formulaire",
				errors: {
					picture: ["Photo de profil requis"],
				},
			};
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

export async function updatePlayer(prevState, formData) {
	try {
		const cookie = await cookies();
		const session = cookie?.get("session");

		const playerId = formData.get("player-id");

		const playerData = {
			lastname: formData.get("lastname") || "",
			firstname: formData.get("firstname") || "",
			username: formData.get("username") || "",
			team: formData.get("team") || "",
			audience: formData.get("audience") || "",
			xUrl: formData.get("x-url") || "",
			twitchUrl: formData.get("twitch-url") || "",
			instagramUrl: formData.get("instagram-url") || "",
			youtubeUrl: formData.get("youtube-url") || "",
			tiktokUrl: formData.get("tiktok-url") || "",
		};

		// Ajouter "picture" uniquement si elle n'est pas vide
		const picture = formData.get("picture");
		if (picture) {
			playerData.picture = picture; // Ajoute le champ "picture" seulement s'il n'est pas vide
		}

		const validation = playerSchema.safeParse(playerData);

		if (!validation.success) {
			const errors = validation.error.flatten().fieldErrors;

			return {
				status: "failure",
				message: "Veuillez vérifier le formulaire",
				errors: errors,
			};
		}

		const data = new FormData();

		Object.entries(playerData).forEach(([key, value]) => {
			data.append(key, value);
		});

		const playerRes = await fetch(
			`${process.env.API_URL}/api/players/put/${playerId}`,
			{
				method: "PUT",
				headers: {
					Authorization: `Bearer ${session?.value}`,
				},
				body: data,
			}
		);

		const playerResponse = await playerRes.json();

		if (!playerResponse.success) throw new Error(playerResponse?.message);

		if (formData.get("game")) {
			const rawData = {
				playerId: playerId,
				gameId: formData?.get("game"),
			};

			const res = await fetch(`${process.env.API_URL}/api/players/games/put`, {
				method: "PUT",
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
				playerId: playerId,
				nationalityId: formData?.get("region"),
			};

			const res = await fetch(
				`${process.env.API_URL}/api/players/nationalities/put`,
				{
					method: "PUT",
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
			message: "Joueur modifié avec succès",
		};
	} catch (err) {
		console.error("Failed to save player:", err);

		return {
			status: "failure",
			message: err?.message || "Une erreur est survenue",
		};
	}
}
