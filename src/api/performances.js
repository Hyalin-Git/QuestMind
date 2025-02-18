"use server";

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export async function getPlayersPerformances() {
	try {
		const cookie = await cookies();
		const session = cookie.get("session");

		const res = await fetch(
			`${process.env.API_URL}/api/players/performance/get`,
			{
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${session?.value}`,
				},
			},
			{ next: { tags: ["performances"], revalidate: 120 } }
		);

		const data = await res.json();

		if (!data.success) {
			throw new Error(data?.message || "Une erreur est survenue");
		}

		return data;
	} catch (err) {
		console.log(err?.message);

		return {
			success: false,
			message: err?.message || "Une erreur est survenue",
		};
	}
}

export async function deletePlayerPerformance(id) {
	try {
		const cookie = await cookies();
		const session = cookie.get("session");

		const res = await fetch(
			`${process.env.API_URL}/api/players/performance/delete/${id}`,
			{
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${session?.value}`,
				},
			}
		);

		const data = await res.json();

		if (!data.success) {
			throw new Error(data?.message || "Une erreur est survenue");
		}

		revalidateTag("performances");

		return data;
	} catch (err) {
		console.log(err?.message);

		return {
			success: false,
			message: err?.message || "Une erreur est survenue",
		};
	}
}
