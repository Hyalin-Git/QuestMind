import { z } from "zod";
import { playerRegex, userRegex } from "./regex";

export const authSchema = z.object({
	email: z.string().min(4, "Adresse mail invalide").regex(userRegex.email, {
		message: "Adresse email invalide",
	}),
	password: z
		.string()
		.min(
			8,
			"Le mot de passe doit contenir au moins 8 caractères, inclure une lettre majuscule, une lettre minuscule, un chiffre et un caractère spécial (par exemple, #?!@$%^&*-)"
		)
		.regex(userRegex.password, {
			message:
				"Le mot de passe doit contenir au moins 8 caractères, inclure une lettre majuscule, une lettre minuscule, un chiffre et un caractère spécial (par exemple, #?!@$%^&*-)",
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
		.regex(playerRegex.url, "URL X invalide")
		.max(255)
		.or(z.literal(""))
		.optional(),
	tiktokUrl: z
		.string()
		.regex(playerRegex.url, "URL TikTok invalide")
		.max(255)
		.or(z.literal(""))
		.optional(),
	instagramUrl: z
		.string()
		.regex(playerRegex.url, "URL Instagram invalide")
		.max(255)
		.or(z.literal(""))
		.optional(),
	youtubeUrl: z
		.string()
		.regex(playerRegex.url, "URL YouTube invalide")
		.max(255)
		.or(z.literal(""))
		.optional(),
	twitchUrl: z
		.string()
		.regex(playerRegex.url, "URL Twitch invalide")
		.max(255)
		.or(z.literal(""))
		.optional(),
	lolproUrl: z
		.string()
		.regex(playerRegex.url, "URL LolPro invalide")
		.max(255)
		.or(z.literal(""))
		.optional(),
	leaguepediaUrl: z
		.string()
		.regex(playerRegex.url, "URL Leaguepedia invalide")
		.max(255)
		.or(z.literal(""))
		.optional(),
	vlrUrl: z
		.string()
		.regex(playerRegex.url, "URL VLR invalide")
		.max(255)
		.or(z.literal(""))
		.optional(),
	liquipediaUrl: z
		.string()
		.regex(playerRegex.url, "URL Liquipedia invalide")
		.max(255)
		.or(z.literal(""))
		.optional(),
	hltvUrl: z
		.string()
		.regex(playerRegex.url, "URL HLTV invalide")
		.max(255)
		.or(z.literal(""))
		.optional(),
});

export const nationalitiesSchema = z.object({
	region: z.string().min(1).max(255),
});

export const gameSchema = z.object({
	game: z.string().min(1, "Le nom du jeu est obligatoire").max(255),
	isMobile: z.enum(["0", "1"], {
		errorMap: (issue, ctx) => ({ message: "Veuillez faire un choix" }),
	}),
});

export const sponsorsSchema = z.object({
	sponsor: z.string().min(1, "Le nom du sponsor est obligatoire").max(255),
});

export const playerContactSchema = z.object({
	sender: z.string().regex(userRegex.email, {
		message: "Veuillez entrer une adresse email valide.",
	}),
	firstName: z
		.string()
		.min(1, "Le prénom est obligatoire.")
		.max(255, "Le prénom ne peut pas dépasser 255 caractères."),
	lastName: z
		.string()
		.min(1, "Le nom de famille est obligatoire.")
		.max(255, "Le nom de famille ne peut pas dépasser 255 caractères."),
	nationality: z
		.string()
		.min(1, "La nationalité est obligatoire.")
		.max(255, "La nationalité ne peut pas dépasser 255 caractères."),
	country: z
		.string()
		.min(1, "Le pays est obligatoire.")
		.max(255, "Le pays ne peut pas dépasser 255 caractères."),
	game: z
		.string()
		.min(1, "Le nom du jeu est obligatoire.")
		.max(255, "Le nom du jeu ne peut pas dépasser 255 caractères."),
	pseudo: z
		.string()
		.min(1, "Le pseudo est obligatoire.")
		.max(255, "Le pseudo ne peut pas dépasser 255 caractères."),
	message: z
		.string()
		.min(1, "Le message est obligatoire.")
		.max(5000, "Le message ne peut pas dépasser 5000 caractères."),
});

export const companyContactSchema = z.object({
	sender: z.string().min(4).regex(userRegex.email, {
		message: "Veuillez entrer une adresse email valide.",
	}),
	firstName: z
		.string()
		.min(1, "Le prénom est obligatoire.")
		.max(255, "Le prénom ne peut pas dépasser 255 caractères."),
	lastName: z
		.string()
		.min(1, "Le nom de famille est obligatoire.")
		.max(255, "Le nom de famille ne peut pas dépasser 255 caractères."),
	companyName: z
		.string()
		.min(1, "Le nom de l'entreprise est obligatoire.")
		.max(255, "Le nom de l'entreprise ne peut pas dépasser 255 caractères."),
	campaignDate: z
		.string()
		.max(255, "La date ne peut pas dépasser 255 caractères.")
		.or(z.literal(""))
		.optional(),
	budget: z.string().max(255, "Le budget ne peut pas dépasser 255 caractères."),
	message: z
		.string()
		.min(1, "Le message est obligatoire.")
		.max(5000, "Le message ne peut pas dépasser 5000 caractères."),
});
