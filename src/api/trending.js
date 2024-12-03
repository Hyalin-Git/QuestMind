"use server";
export async function getTrendingPlayers() {
	try {
		const res = await fetch(
			`${process.env.CLIENT_URL}/api/players/trending/get`,
			{
				method: "GET",
			}
		);
		const data = await res.json();
		console.log(data);
	} catch (err) {}
}
