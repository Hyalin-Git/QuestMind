import { authSchema } from "@/libs/zod";
import pool from "../../config/db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function POST(req) {
	try {
		const { email, password } = await req.json();

		const validation = authSchema.safeParse({ email, password });

		if (!validation.success) {
			const { errors } = validation.error;

			return NextResponse.json(
				{
					success: false,
					message: "Invalid request",
					error: errors,
				},
				{ status: 400 }
			);
		}

		const connection = await pool.getConnection();

		const [user] = await connection.execute(
			"SELECT * FROM `users` WHERE `users`.`email` = ?",
			[email]
		);

		if (user.length <= 0) {
			return NextResponse.json(
				{
					success: false,
					message: "No user found with the provided e-mail",
				},
				{ status: 404 }
			);
		}

		const passwordMatch = await bcrypt.compare(password, user[0].password);

		if (!passwordMatch) {
			return NextResponse.json(
				{
					success: false,
					message: "Incorrect password",
				},
				{ status: 400 }
			);
		}

		const accessToken = jwt.sign(
			{
				userId: user[0].id,
				role: user[0].role,
			},
			process.env.JWT_SECRET,
			{ expiresIn: "1d" }
		);

		connection.release();

		return NextResponse.json(
			{
				success: true,
				userId: user[0].id,
				role: user[0].role,
				accessToken: accessToken,
			},
			{ status: 200 }
		);
	} catch (err) {
		return NextResponse.json(
			{
				success: false,
				message: err || "An unexpected error occurred",
			},
			{ status: 500 }
		);
	}
}
