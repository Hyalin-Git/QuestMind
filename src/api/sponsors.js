"use server";

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export async function getSponsors() {
	try {
		const res = await fetch(
			`${process.env.API_URL}/api/sponsors/get`,
			{
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			},
			{ next: { tags: ["sponsors"], revalidate: 120 } }
		);

		if (!res.ok) {
			throw new Error("Une erreur est survenue");
		}

		const data = await res.json();

		return data;
	} catch (err) {
		console.log(err.message || "An unexpected error occurred");
	}
}

export async function deleteSponsor(sponsorId) {
	try {
		const cookie = await cookies();
		const session = cookie?.get("session");

		if (!sponsorId) {
			throw new Error("Paramètre manquant");
		}

		const res = await fetch(
			`${process.env.API_URL}/api/sponsors/delete/${sponsorId}`,
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

		revalidateTag("sponsors");

		return response;
	} catch (err) {
		console.error("Failed to delete sponsor:", err);
	}
}
