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
				cache: "force-cache",
			},
			{
				next: { revalidate: 120 },
			}
		);

		const data = await res.json();

		if (data?.error) {
			throw new Error(data?.message);
		}

		console.log(data);

		return data;
	} catch (err) {
		console.error("Failed to fetch trending players:", err);
	}
}
