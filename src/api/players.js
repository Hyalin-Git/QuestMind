"use server";

export async function getPlayers() {
	try {
		const res = await fetch(`${process.env.API_URL}/api/players/get`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		});

		const data = await res.json();

		return data;
	} catch (err) {
		console.log();
	}
}
