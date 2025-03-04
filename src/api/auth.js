"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function getSession() {
	try {
		const cookie = await cookies();
		const session = cookie.get("session")?.value;

		if (!session) throw new Error("No session found");

		const res = await fetch(`${process.env.API_URL}/api/auth/get-session`, {
			method: "GET",
			credentials: "include",
			headers: {
				Authorization: `Bearer ${session}`,
			},
		});

		const data = await res.json();

		console.log("session", data);

		return data;
	} catch (err) {
		console.log(err);
		logout();
		return {
			success: false,
			message:
				err.message ||
				"An unexpected error occurred while fetching the session",
		};
	}
}

export async function logout() {
	const cookie = await cookies();

	cookie.delete("session");
	cookie.delete("rtk");

	redirect("/5zw8yc/auth");
}
