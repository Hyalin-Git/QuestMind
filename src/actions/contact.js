"use server";

import { playerContactSchema } from "@/libs/zod";

export async function sendContactForm(state, prevState, formData) {
	try {
		let data;

		if (state === "player") {
			data = {
				sender: formData.get("email"),
				firstName: formData.get("first-name"),
				lastName: formData.get("last-name"),
				nationality: formData.get("nationality"),
				country: formData.get("country"),
				game: formData.get("game"),
				message: formData.get("message"),
			};

			const validation = playerContactSchema.safeParse({ ...data });

			if (!validation.success) {
				const error = validation.error.flatten().fieldErrors;

				console.log(error);
                
				return;
			}
		}

		if (state === "company") {
			data = {
				sender: formData.get("email"),
				companyName: formData.get("company-name"),
				firstName: formData.get("first-name"),
				lastName: formData.get("last-name"),
				campaignDate: formData.get("campaign-date"),
				budget: formData.get("budget"),
				message: formData.get("message"),
			};
		}

		const res = await fetch(
			`${process.env.API_URL}/api/contact/post?state=${state}`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data),
			}
		);

		const response = await res.json();

		console.log(response);

		return {
			message: "E-mail envoyé avec succès",
		};
	} catch (err) {
		console.log(err);
	}
}
