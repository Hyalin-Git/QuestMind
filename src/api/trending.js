"use server";
export async function getTrendingPlayers() {
	try {
		const res = await fetch(
			`${process.env.CLIENT_URL}/api/players/trending/get`,
			{
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			}
		);

		// if (!res.ok) {
		// 	throw new Error(`HTTP error! status: ${res.status}`);
		// }

		const data = await res.json();
		return data;
	} catch (err) {
		console.error("Failed to fetch trending players:", err);
	}
}
