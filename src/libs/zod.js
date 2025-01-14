import { z } from "zod";
import { playerRegex, userRegex } from "./regex";

export const authSchema = z.object({
	email: z.string().min(4).regex(userRegex.email, {
		message: "Invalid email address",
	}),
	password: z.string().min(8).regex(userRegex.password, {
		message:
			"Password must be at least 8 characters long, include an uppercase letter, a lowercase letter, a number, and a special character (e.g., #?!@$%^&*-)",
	}),
});

export const playerSchema = z.object({
	lastname: z
		.string()
		.regex(
			playerRegex.name,
			"Le nom ne peut contenir que des lettres, des espaces, des tirets et des apostrophes"
		)
		.max(255)
		.or(z.literal(""))
		.optional(),
	firstname: z
		.string()
		.min(1, "Le prénom doit contenir au moins un caractère")
		.max(255)
		.regex(
			playerRegex.name,
			"Le prénom ne peut contenir que des lettres, des espaces, des tirets et des apostrophes"
		),
	username: z
		.string()
		.min(1, "Le pseudo doit contenir au moins un caractère")
		.max(255)
		.regex(
			playerRegex.username,
			"Le nom d'utilisateur ne peut contenir que des lettres, des chiffres, des underscores et des tirets"
		),
	picture: z.instanceof(File),
	team: z
		.string()
		.min(1, "Le nom de l'équipe doit contenir au moins un caractère")
		.max(255),
	audience: z.string(),
	xUrl: z
		.string()
		.regex(playerRegex.xUrl, "URL X invalide")
		.max(255)
		.or(z.literal(""))
		.optional(),
	tiktokUrl: z
		.string()
		.regex(playerRegex.tiktokUrl, "URL TikTok invalide")
		.max(255)
		.or(z.literal(""))
		.optional(),
	instagramUrl: z
		.string()
		.regex(playerRegex.instagramUrl, "URL Instagram invalide")
		.max(255)
		.or(z.literal(""))
		.optional(),
	youtubeUrl: z
		.string()
		.regex(playerRegex.youtubeUrl, "URL YouTube invalide")
		.max(255)
		.or(z.literal(""))
		.optional(),
	twitchUrl: z
		.string()
		.regex(playerRegex.twitchUrl, "URL Twitch invalide")
		.max(255)
		.or(z.literal(""))
		.optional(),
});

export const nationalitiesSchema = z.object({
	region: z.string().min(1).max(255),
});

export const gameSchema = z.object({
	game: z.string().min(1).max(255),
	isMobile: z.enum(["0", "1"]),
});

export const teamSchema = z.object({
	team: z.string().min(1).max(255),
	picture: z.instanceof(File),
});

export const sponsorsSchema = z.object({
	sponsor: z.string().min(1).max(255),
	picture: z.instanceof(File),
});

export const playerContactSchema = z.object({
	sender: z.string().min(4).regex(userRegex.email, {
		message: "Invalid email address",
	}),
	firstName: z.string().min(1).max(255),
	lastName: z.string().min(1).max(255),
	nationality: z.string().min(1).max(255),
	country: z.string().min(1).max(255),
	game: z.string().min(1).max(255),
	message: z.string().min(1).max(1500),
});
