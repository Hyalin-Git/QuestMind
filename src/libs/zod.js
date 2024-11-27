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
	lastname: z.string().min(1).max(255),
	firstname: z.string().min(1).max(255),
	username: z.string().min(1).max(255),
	picture: z.instanceof(File),
	genre: z.enum(["H", "F"]),
	audience: z.string(),
});

export const nationalitiesSchema = z.object({
	nationality: z.string().min(1).max(255),
	picture: z.instanceof(File),
});

export const gameSchema = z.object({
	game: z.string().min(1).max(255),
	isMobile: z.enum(["0", "1"]),
});

export const sponsorsSchema = z.object({
	sponsor: z.string().min(1).max(255),
	picture: z.instanceof(File),
});
