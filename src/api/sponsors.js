"use server";

export async function getSponsors() {
	try {
		const res = await fetch(`${process.env.API_URL}/api/sponsors/get`);
		const data = await res.json();

		return data;
	} catch (err) {
		console.log(err.message || "An unexpected error occurred");
	}
}
