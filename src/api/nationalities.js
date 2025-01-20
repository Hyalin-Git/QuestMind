"use server";

export async function getNationalities() {
	try {
		const res = await fetch(`${process.env.API_URL}/api/nationalities/get`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		});

		const data = await res.json();

		return data;
	} catch (err) {
		console.log(err.message || "An unexpected error occurred");
	}
}
