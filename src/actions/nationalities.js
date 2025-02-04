"use server";

import { nationalitiesSchema } from "@/libs/zod";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export async function saveNationalitiy(prevState, formData) {
	try {
		const cookie = await cookies();
		const session = cookie?.get("session");

		const regionData = {
			region: formData?.get("region"),
		};

		const validation = nationalitiesSchema.safeParse(regionData);

		if (!validation.success) {
			const errors = validation.error.flatten().fieldErrors;
			console.log(errors);
			return {
				status: "failure",
				message: "Veuillez vérifier le formulaire",
				errors: errors,
			};
		}

		const res = await fetch(`${process.env.API_URL}/api/nationalities/post`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${session?.value}`,
			},
			body: JSON.stringify(regionData),
		});

		const response = await res.json();

		console.log(response);

		revalidateTag("nationalities");

		return {
			status: "success",
			message: "Région ajouté avec succès",
		};
	} catch (err) {
		console.error("Failed to save region:", err);

		return {
			status: "failure",
			message: err?.message || "Une erreur est survenue",
		};
	}
}

export async function updateNationalitiy(prevState, formData) {
	try {
		const cookie = await cookies();
		const session = cookie?.get("session");

		const regionId = formData?.get("region-id");

		const regionData = {
			region: formData?.get("region"),
		};

		const validation = nationalitiesSchema.safeParse(regionData);

		if (!validation.success) {
			const errors = validation.error.flatten().fieldErrors;

			return {
				status: "failure",
				message: "Veuillez vérifier le formulaire",
				errors: errors,
			};
		}

		const res = await fetch(
			`${process.env.API_URL}/api/nationalities/put/${regionId}`,
			{
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${session?.value}`,
				},
				body: JSON.stringify(regionData),
			}
		);

		const response = await res.json();

		console.log(response);

		revalidateTag("nationalities");

		return {
			status: "success",
			message: "Région modifié avec succès",
		};
	} catch (err) {
		console.error("Failed to update region:", err);

		return {
			status: "failure",
			message: err?.message || "Une erreur est survenue",
		};
	}
}
