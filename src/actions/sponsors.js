"use server";

import { sponsorsSchema } from "@/libs/zod";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export async function saveSponsor(prevState, formData) {
	try {
		const cookie = await cookies();
		const session = cookie?.get("session");

		const gameData = {
			sponsor: formData?.get("sponsor"),
		};

		const validation = sponsorsSchema.safeParse(gameData);

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

		const res = await fetch(`${process.env.API_URL}/api/sponsors/post`, {
			method: "POST",
			headers: {
				Authorization: `Bearer ${session?.value}`,
			},
			body: data,
		});

		const response = await res.json();

		if (response.success === false) {
			throw new Error(response.message);
		}

		revalidateTag("sponsors");

		return {
			status: "success",
			message: "Sponsor ajouté avec succès",
		};
	} catch (err) {
		console.error("Failed to save sponsor:", err);

		return {
			status: "failure",
			message: err?.message || "Une erreur est survenue",
		};
	}
}

export async function updateSponsor(prevState, formData) {
	try {
		const cookie = await cookies();
		const session = cookie?.get("session");

		const sponsorId = formData?.get("sponsor-id");

		const gameData = {
			sponsor: formData?.get("sponsor"),
		};

		const validation = sponsorsSchema.safeParse(gameData);

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

		const res = await fetch(
			`${process.env.API_URL}/api/sponsors/put/${sponsorId}`,
			{
				method: "PUT",
				headers: {
					Authorization: `Bearer ${session?.value}`,
				},
				body: data,
			}
		);

		const response = await res.json();

		console.log(response);

		revalidateTag("sponsors");

		return {
			status: "success",
			message: "Sponsor modifié avec succès",
		};
	} catch (err) {
		console.error("Failed to update sponsor:", err);

		return {
			status: "failure",
			message: err?.message || "Une erreur est survenue",
		};
	}
}
