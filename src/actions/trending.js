"use server";

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export async function savePlayerTrending(prevState, formData) {
	try {
		const cookie = await cookies();
		const session = cookie.get("session");

		if (
			!formData.get("player") ||
			!formData.get("position") ||
			formData.get("position") > 12
		) {
			return {
				status: "failure",
				message: "Requête invalide",
			};
		}

		const rawData = {
			playerId: formData.get("player"),
			position: formData.get("position"),
		};

		const res = await fetch(
			`${process.env.CLIENT_URL}/api/players/trending/post`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${session?.value}`,
				},
				body: JSON.stringify(rawData),
			}
		);

		const data = await res.json();

		if (!data?.success) {
			throw new Error(data?.message);
		}

		revalidateTag("trending");

		return {
			status: "success",
			message: "Player saved to trending",
		};
	} catch (err) {
		console.error("Failed to save player to trending:", err);

		return {
			status: "failure",
			message: "Failed to save player to trending",
		};
	}
}

export async function updatePlayerTrending(prevState, formData) {
	try {
		const cookie = await cookies();
		const session = cookie.get("session");

		const trendingId = formData.get("trending-id");
		const playerId = formData.get("player-id");
		const position = formData.get("position");

		if (!trendingId || !playerId || !position || position > 12) {
			return {
				status: "failure",
				message: "Requête invalide",
			};
		}

		const rawData = {
			playerId: formData.get("player-id"),
			position: formData.get("position"),
		};

		const res = await fetch(
			`${process.env.CLIENT_URL}/api/players/trending/put/${trendingId}`,
			{
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${session?.value}`,
				},
				body: JSON.stringify(rawData),
			}
		);

		const data = await res.json();

		if (!data?.success) {
			throw new Error(data?.message);
		}

		revalidateTag("trending");

		return {
			status: "success",
			message: "Player updated to trending",
		};
	} catch (err) {
		console.error("Failed to update player to trending:", err);

		return {
			status: "failure",
			message: "Failed to update player to trending",
		};
	}
}
