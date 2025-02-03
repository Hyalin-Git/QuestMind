"use server";

export async function getSponsors() {
	try {
		const res = await fetch(
			`${process.env.API_URL}/api/sponsors/get`,
			{
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			},
			{
				next: { revalidate: 120 },
			}
		);

		if (!res.ok) {
			throw new Error("Une erreur est survenue");
		}

		const data = await res.json();

		return data;
	} catch (err) {
		console.log(err.message || "An unexpected error occurred");
	}
}
