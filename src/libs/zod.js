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
