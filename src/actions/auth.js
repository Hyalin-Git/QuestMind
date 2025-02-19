"use server";

import { userRegex } from "@/libs/regex";
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

		console.log("====================================");
		console.log(data);
		console.log("====================================");

		if (data?.role === "user") {
			return {
				status: "failure",
				message: "Seul un administrateur peut se connecter",
			};
		}

		const cookie = await cookies();

		cookie.set("session", data?.accessToken, {
			secure: true,
			httpOnly: true,
			sameSite: "lax",
			expires: Date.now() + 30 * 60 * 1000, // expires in 30m
		});

		cookie.set("rtk", data?.refreshToken, {
			secure: true,
			httpOnly: true,
			sameSite: "lax",
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

export async function signUp(prevState, formData) {
	try {
		const cookie = await cookies();
		const session = cookie.get("session");

		const email = formData.get("email");
		const password = formData.get("password");

		const validation = authSchema.safeParse({ email, password });

		if (!validation.success) {
			const errors = validation.error.flatten().fieldErrors;

			if (errors) {
				return {
					status: "failure",
					message: "Veuillez remplir tous les champs",
					errors: errors,
				};
			}
		}

		const res = await fetch(`${process.env.API_URL}/api/auth/sign-up`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${session?.value}`,
			},
			body: JSON.stringify({ email, password }),
		});

		if (res.status === 403) {
			return {
				status: "failure",
				message: "Seul un administrateur peut créer un compte",
			};
		}

		const data = await res.json();

		if (!data?.success && data?.message?.includes(email)) {
			return {
				status: "failure",
				message: "Un compte existe déjà avec cette adresse e-mail",
				errors: { email: ["Un compte existe déjà avec cette adresse e-mail"] },
			};
		}

		if (!data?.success) throw new Error(data?.message);

		return {
			status: "success",
			message: "Votre compte a été créé avec succès",
		};
	} catch (err) {
		console.error("Failed to sign up:", err);

		return {
			status: "failure",
			message: "Une erreur inattendue est survenue",
		};
	}
}
export async function sendResetCode(prevState, formData) {
	try {
		const email = formData.get("email");

		if (!email || !userRegex.email.test(email)) {
			return {
				status: "failure",
				message: "Veuillez entrer une adresse e-mail valide",
				errors: { email: "Veuillez entrer une adresse e-mail valide" },
			};
		}

		const res = await fetch(`${process.env.API_URL}/api/auth/forgot-password`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ email }),
		});

		if (res.status === 404) {
			return {
				status: "failure",
				message: "Aucun compte n'a été trouvé avec cette adresse e-mail",
				errors: {
					email: "Aucun compte n'a été trouvé avec cette adresse e-mail",
				},
			};
		}

		const response = await res.json();

		if (!response?.success) throw new Error(response?.message);

		return {
			status: "success",
			message:
				"Un e-mail de réinitialisation a été envoyé à l'adresse indiquée",
		};
	} catch (err) {
		console.error("Failed to send reset code:", err);

		return {
			status: "failure",
			message: "Une erreur inattendue est survenue",
		};
	}
}

export async function resetForgotPassword(prevState, formData) {
	try {
		const resetCode = formData.get("reset-code");
		const newPassword = formData.get("new-password");
		const confirmPassword = formData.get("confirm-password");

		if (!newPassword) {
			return {
				status: "failure",
				message: "Veuillez remplir tous les champs",
				errors: { newPassword: "Veuillez saisir un mot de passe" },
			};
		}

		if (!confirmPassword) {
			return {
				status: "failure",
				message: "Veuillez remplir tous les champs",
				errors: { newPassword: "Veuillez confirmer votre mot de passe" },
			};
		}

		if (newPassword !== confirmPassword) {
			return {
				status: "failure",
				message: "Les mots de passe ne correspondent pas",
				errors: { newPassword: "Les mots de passe ne correspondent pas" },
			};
		}

		if (!userRegex.password.test(newPassword)) {
			return {
				status: "failure",
				message:
					"Le mot de passe doit contenir au moins 8 caractères, une lettre majuscule, une lettre minuscule, un chiffre et un caractère spécial",
				errors: {
					newPassword:
						"Le mot de passe doit contenir au moins 8 caractères, une lettre majuscule, une lettre minuscule, un chiffre et un caractère spécial",
				},
			};
		}

		const res = await fetch(`${process.env.API_URL}/api/auth/forgot-password`, {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ resetCode, newPassword, confirmPassword }),
		});

		const response = await res.json();

		if (
			!response?.success &&
			response?.message ===
				"The new password cannot be the same as the old password"
		) {
			return {
				status: "failure",
				message:
					"Le nouveau mot de passe ne peut pas être le même que l'ancien",
				errors: {
					newPassword:
						"Le nouveau mot de passe ne peut pas être le même que l'ancien",
				},
			};
		}

		if (!response?.success) throw new Error(response?.message);

		return {
			status: "success",
			message: "Le mot de passe a été réinitialisé avec succès",
		};
	} catch (err) {
		console.log("Failed to reset password:", err);

		return {
			status: "failure",
			message: "Une erreur inattendue est survenue",
		};
	}
}
