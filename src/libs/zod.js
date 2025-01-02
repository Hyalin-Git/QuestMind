import { z } from "zod";
import { userRegex } from "./regex";

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
	lastname: z.string().max(255).optional().or(z.literal("")),
	firstname: z.string().min(1).max(255),
	username: z.string().min(1).max(255),
	picture: z.instanceof(File),
	team: z.string().min(1).max(255),
	genre: z.enum(["H", "F"]),
	audience: z.string(),
	xUrl: z.string().max(255).optional().or(z.literal("")),
	tiktokUrl: z.string().max(255).optional().or(z.literal("")),
	instagramUrl: z.string().max(255).optional().or(z.literal("")),
	youtubeUrl: z.string().max(255).optional().or(z.literal("")),
	twitchUrl: z.string().max(255).optional().or(z.literal("")),
});

export const nationalitiesSchema = z.object({
	region: z.string().min(1).max(255),
	nationality: z.string().min(1).max(255),
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
