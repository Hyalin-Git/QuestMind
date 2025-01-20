"use server";

import { companyContactSchema, playerContactSchema } from "@/libs/zod";

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

			const validation = playerContactSchema.safeParse(data);

			if (!validation.success) {
				const errors = validation.error.flatten().fieldErrors;

				return {
					status: "failure",
					message: "Le formulaire est invalide",
					errors: errors,
				};
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

			const validation = companyContactSchema.safeParse(data);

			if (!validation.success) {
				const errors = validation.error.flatten().fieldErrors;

				return {
					status: "failure",
					message: "Le formulaire est invalide",
					errors: errors,
				};
			}
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

		if (!response.success) {
			throw new Error(response?.message);
		}

		console.log(response);

		return {
			status: "success",
			message: "E-mail successfully sent",
		};
	} catch (err) {
		if (err?.message === "Invalid request") {
			return {
				status: "failure",
				message: err?.message,
				errors: err?.errors,
			};
		}
		return {
			status: "failure",
			message: err?.message,
		};
	}
}
