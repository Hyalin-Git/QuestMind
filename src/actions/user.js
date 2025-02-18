"use server";

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export async function updateUser(prevState, formData) {
	try {
		const cookie = await cookies();
		const session = cookie.get("session");

		const userId = formData.get("user-id");

		const role = formData.get("role");

		const res = await fetch(
			`${process.env.API_URL}/api/users/patch/${userId}`,
			{
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${session?.value}`,
				},
				body: JSON.stringify({ role }),
			}
		);

		const data = await res.json();

		if (!data?.success) {
			throw new Error(
				data?.message || "An error occurred while updating the user."
			);
		}

		revalidateTag("users");
		return {
			status: "success",
			message: "Utilisateur mis à jour avec succès",
		};
	} catch (err) {
		console.error(err.message || "An error occurred while updating the user.");

		return {
			status: "failure",
			message: err.message || "An error occurred while updating the user.",
		};
	}
}
