"use server";

import { authSchema } from "@/libs/zod";
import { cookies } from "next/headers";

export async function signIn(prevState, formData) {
	try {
		const email = formData.get("email");
		const password = formData.get("password");

		const validation = authSchema.safeParse({ email, password });

		if (!validation.success) {
			const errors = validation.error.flatten().fieldErrors;
			console.log(password);

			if (errors?.email || errors?.password) {
				return {
					status: "failure",
					message: "Identifiants incorrects, veuillez réessayer.",
					errors: true,
				};
			}
		}

		const rawData = {
			email: email,
			password: password,
		};

		const res = await fetch(`${process.env.API_URL}/api/auth/sign-in`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(rawData),
		});

		const data = await res.json();

		if (!data?.success) throw new Error(data?.message);

		const cookie = await cookies();

		cookie.set("session", data?.accessToken, {
			secure: true,
			httpOnly: true,
			sameSite: "strict",
			expires: Date.now() + 30 * 60 * 1000, // expires in 30m
		});

		cookie.set("rtk", data?.refreshToken, {
			secure: true,
			httpOnly: true,
			sameSite: "strict",
			expires: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 14 jours en millisecondes
		});

		return {
			status: "success",
		};
	} catch (err) {
		console.error("Failed to sign in:", err);

		const emailErr = err?.message === "No user found with the provided e-mail";
		const passErr = err?.message === "Incorrect password";

		if (emailErr || passErr) {
			return {
				status: "failure",
				message: "Identifiants incorrects, veuillez réessayer.",
			};
		}

		return {
			status: "failure",
			message: "Une erreur inattendue est survenue",
		};
	}
}
