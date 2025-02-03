"use server";

import { gameSchema } from "@/libs/zod";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export async function saveGame(prevState, formData) {
	try {
		const cookie = await cookies();
		const session = cookie?.get("session");

		const gameData = {
			game: formData?.get("game"),
			isMobile: formData?.get("is-mobile"),
		};

		const validation = gameSchema.safeParse(gameData);

		if (!validation.success) {
			const errors = validation.error.flatten().fieldErrors;
			console.log(errors);
			return {
				status: "failure",
				message: "Veuillez vérifier le formulaire",
				errors: errors,
			};
		}

		const picture = formData.get("picture")?.name !== "undefined";

		if (picture) {
			gameData.picture = formData.get("picture"); // Ajoute le champ "picture" seulement s'il n'est pas vide
		}

		const data = new FormData();

		Object.entries(gameData).forEach(([key, value]) => {
			data.append(key, value);
		});

		console.log(data);

		const res = await fetch(`${process.env.API_URL}/api/games/post`, {
			method: "POST",
			headers: {
				Authorization: `Bearer ${session?.value}`,
			},
			body: data,
		});

		const response = await res.json();

		// console.log(response);

		revalidateTag("games");

		return {
			status: "success",
			message: "Jeu ajouté avec succès",
		};
	} catch (err) {
		console.error("Failed to save game:", err);

		return {
			status: "failure",
			message: err?.message || "Une erreur est survenue",
		};
	}
}

export async function updateGame(prevState, formData) {
	try {
		const cookie = await cookies();
		const session = cookie?.get("session");

		const gameId = formData?.get("game-id");

		const gameData = {
			game: formData?.get("game"),
			isMobile: formData?.get("is-mobile"),
		};

		const validation = gameSchema.safeParse(gameData);

		if (!validation.success) {
			const errors = validation.error.flatten().fieldErrors;

			return {
				status: "failure",
				message: "Veuillez vérifier le formulaire",
				errors: errors,
			};
		}

		const picture = formData.get("picture")?.name !== "undefined";

		if (picture) {
			gameData.picture = formData.get("picture"); // Ajoute le champ "picture" seulement s'il n'est pas vide
		}

		const data = new FormData();

		Object.entries(gameData).forEach(([key, value]) => {
			data.append(key, value);
		});

		const res = await fetch(`${process.env.API_URL}/api/games/put/${gameId}`, {
			method: "PUT",
			headers: {
				Authorization: `Bearer ${session?.value}`,
			},
			body: data,
		});

		const response = await res.json();

		console.log(response);

		revalidateTag("games");

		return {
			status: "success",
			message: "Jeu modifié avec succès",
		};
	} catch (err) {
		console.error("Failed to update game:", err);

		return {
			status: "failure",
			message: err?.message || "Une erreur est survenue",
		};
	}
}
