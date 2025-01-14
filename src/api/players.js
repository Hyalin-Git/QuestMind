"use server";

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export async function getPlayers(game, isMobile, region) {
	try {
		const queries = [
			game ? `game=${game}` : "",
			isMobile ? `is_mobile=${isMobile}` : "",
			region ? `region=${region}` : "",
		]
			.filter(Boolean)
			.join("&");

		const res = await fetch(
			`${process.env.API_URL}/api/players/get${queries ? `?${queries}` : ""}`,
			{
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			},
			{ next: { tags: ["players"] } }
		);

		const data = await res.json();

		return data;
	} catch (err) {
		console.log();
	}
}

export async function getPlayer(playerId) {
	try {
		const res = await fetch(
			`${process.env.API_URL}/api/players/get/${playerId}`,
			{
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			}
		);

		const data = await res.json();

		console.log(data);

		return data;
	} catch (err) {
		console.log();
	}
}

export async function deletePlayer(playerId) {
	try {
		const cookie = await cookies();
		const session = cookie?.get("session");

		if (!playerId) {
			throw new Error("Paramètre manquant");
		}

		const res = await fetch(
			`${process.env.API_URL}/api/players/delete/${playerId}`,
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

		revalidateTag("players");

		return response;
	} catch (err) {
		console.error("Failed to delete player:", err);

		return err;
	}
}
