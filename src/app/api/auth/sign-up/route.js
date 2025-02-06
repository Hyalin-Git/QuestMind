import { NextResponse } from "next/server";
import pool from "../../config/db";
import { authSchema } from "@/libs/zod";
import bcrypt from "bcrypt";

export async function POST(req) {
	try {
		const { email, password } = await req.json();

		const validation = authSchema.safeParse({ email, password });

		if (!validation.success) {
			const errors = validation.error.flatten().fieldErrors;

			return NextResponse.json(
				{
					success: false,
					message: "Invalid request",
					error: errors,
				},
				{ status: 400 }
			);
		}

		const hashedPassword = await bcrypt.hash(password, 10);

		const connection = await pool.getConnection();

		const [rows] = await connection.execute(
			"INSERT INTO `users` (`email`, `password`) VALUES (?, ?)",
			[email, hashedPassword]
		);

		if (rows.affectedRows <= 0) {
			return NextResponse.json(
				{
					success: false,
					message: "An error occurred while creating the user",
				},
				{ status: 500 }
			);
		}

		connection.release();

		return NextResponse.json(
			{
				success: true,
				message: "User successfully created",
			},
			{ status: 201 }
		);
	} catch (err) {
		return NextResponse.json(
			{
				success: false,
				message: err.message || "An unexpected error occurred",
			},
			{ status: 500 }
		);
	}
}
