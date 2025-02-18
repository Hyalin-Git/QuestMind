"use server";

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export async function getTrendingPlayers() {
	try {
		const res = await fetch(
			`${process.env.CLIENT_URL}/api/players/trending/get`,
			{
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			},
			{
				next: { tag: ["trending"] },
			}
		);

		const data = await res.json();

		if (data?.error) {
			throw new Error(data?.message);
		}

		return data;
	} catch (err) {
		console.error("Failed to fetch trending players:", err);
	}
}

export async function deleteTrendingPlayer(id) {
	try {
		const cookie = await cookies();
		const session = cookie.get("session");
		const res = await fetch(
			`${process.env.CLIENT_URL}/api/players/trending/delete/${id}`,
			{
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${session?.value}`,
				},
			}
		);

		const data = await res.json();

		if (!data?.success) {
			throw new Error(data?.message);
		}

		revalidateTag("trending");

		return data;
	} catch (err) {
		console.error("Failed to delete trending player:", err);
	}
}
