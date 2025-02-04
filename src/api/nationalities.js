"use server";

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export async function getNationalities() {
	try {
		const res = await fetch(
			`${process.env.API_URL}/api/nationalities/get`,
			{
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			},
			{ next: { tags: ["nationalities"], revalidate: 120 } }
		);

		const data = await res.json();

		return data;
	} catch (err) {
		console.log(err.message || "An unexpected error occurred");
	}
}

export async function deleteNationality(nationalityId) {
	try {
		const cookie = await cookies();
		const session = cookie?.get("session");

		if (!nationalityId) {
			throw new Error("Paramètre manquant");
		}

		const res = await fetch(
			`${process.env.API_URL}/api/nationalities/delete/${nationalityId}`,
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

		revalidateTag("nationalities");

		return response;
	} catch (err) {
		console.error("Failed to delete player:", err);
	}
}
