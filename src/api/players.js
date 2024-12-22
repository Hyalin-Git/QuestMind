"use server";

export async function getPlayers(game, region) {
	try {
		const queries = [
			game ? `game=${game}` : "",
			region ? `region=${region}` : "",
		]
			.filter(Boolean)
			.join("&");

		const res = await fetch(
			`${process.env.API_URL}/api/players/get${queries ? `?${queries}` : ""}`,
			{
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			}
		);

		const data = await res.json();

		return data;
	} catch (err) {
		console.log();
	}
}

export async function getPlayer(playerId) {
	try {
		const res = await fetch(
			`${process.env.API_URL}/api/players/get/${playerId}`,
			{
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			}
		);

		const data = await res.json();

		return data;
	} catch (err) {
		console.log();
	}
}
