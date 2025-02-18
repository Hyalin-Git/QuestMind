"use server";

import { cookies } from "next/headers";

export async function getUsers() {
	try {
		const cookie = await cookies();
		const session = cookie.get("session");

		const res = await fetch(
			`${process.env.API_URL}/api/users/get`,
			{
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${session?.value}`,
				},
			},
			{ next: { tags: ["users"], revalidate: 120 } }
		);

		const data = await res.json();

		if (!data?.success) {
			throw new Error(
				data?.message || "An error occurred while deleting the user."
			);
		}

		return data;
	} catch (err) {
		console.error(err.message || "An error occurred while fetching users.");
	}
}

export async function deleteUser(userId) {
	try {
		const cookie = await cookies();
		const session = cookie.get("session");

		const res = await fetch(
			`${process.env.API_URL}/api/users/delete/${userId}`,
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
			throw new Error(
				data?.message || "An error occurred while deleting the user."
			);
		}

		return data;
	} catch (err) {
		console.log(err.message || "An error occurred while deleting the user.");
	}
}
