"use server";

export async function getGames() {
	try {
		const res = await fetch(`${process.env.API_URL}/api/games/get`, {
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
