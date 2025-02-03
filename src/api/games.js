"use server";

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export async function getGames() {
	try {
		const res = await fetch(
			`${process.env.API_URL}/api/games/get`,
			{
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			},
			{ next: { tags: ["games"], revalidate: 120 } }
		);

		const data = await res.json();

		return data;
	} catch (err) {
		console.log(err);
	}
}

export async function deleteGame(gameId) {
	try {
		const cookie = await cookies();
		const session = cookie?.get("session");

		if (!gameId) {
			throw new Error("Paramètre manquant");
		}

		const res = await fetch(
			`${process.env.API_URL}/api/games/delete/${gameId}`,
			{
				method: "DELETE",
				headers: {
					Authorization: `Bearer ${session?.value}`,
				},
			}
		);

		const response = await res.json();

		if (!response.success) {
			throw new Error(response?.message);
		}

		revalidateTag("games");

		return response;
	} catch (err) {
		console.error("Failed to delete player:", err);
	}
}
