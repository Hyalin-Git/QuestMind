"use server";

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export async function savePlayerPerformance(prevState, formData) {
	try {
		const cookie = await cookies();
		const session = cookie.get("session");

		const playerId = formData.get("player");
		const performance = formData.get("performance");

		const res = await fetch(
			`${process.env.API_URL}/api/players/performance/post`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${session?.value}`,
				},
				body: JSON.stringify({ playerId: playerId, performance: performance }),
			}
		);

		const data = await res.json();

		if (!data.success) {
			throw new Error(data?.message || "Une erreur est survenue");
		}

		revalidateTag("performances");

		return {
			status: "success",
			message: data?.message || "Performance ajoutée avec succès",
		};
	} catch (err) {
		console.log(err?.message || "Une erreur est survenue");
		return {
			status: "failure",
			message: err?.message || "Une erreur est survenue",
		};
	}
}

export async function updatePlayerPerformance(prevState, formData) {
	try {
		const cookie = await cookies();
		const session = cookie.get("session");

		const id = formData.get("performance-id");
		const performance = formData.get("performance");

		const res = await fetch(
			`${process.env.API_URL}/api/players/performance/put/${id}`,
			{
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${session?.value}`,
				},
				body: JSON.stringify({ performance: performance }),
			}
		);

		const data = await res.json();

		if (!data.success) {
			throw new Error(data?.message || "Une erreur est survenue");
		}

		revalidateTag("performances");

		return {
			status: "success",
			message: data?.message || "Performance modifié avec succès",
		};
	} catch (err) {
		console.log(err?.message || "Une erreur est survenue");
		return {
			status: "failure",
			message: err?.message || "Une erreur est survenue",
		};
	}
}
