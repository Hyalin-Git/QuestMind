import { NextResponse } from "next/server";
import pool from "../../config/db";
import bcrypt from "bcrypt";

export async function PATCH(req) {
	try {
		const { code, newPassword } = await req.json();

		if (!code || !newPassword) {
			return NextResponse.json(
				{
					error: true,
					message: "Missing parameters",
				},
				{ status: 400 }
			);
		}

		const connection = await pool.getConnection();

		await connection.execute(
			"DELETE FROM `password_code` WHERE `expires_at` < Now()"
		);

		const [result] = await connection.execute(
			"SELECT * FROM `password_code` WHERE `password_code`.`code` = ?",
			[code]
		);

		if (result.length <= 0) {
			return NextResponse.json(
				{
					error: true,
					message: "The given code doesn't exist or has expired",
				},
				{ status: 404 }
			);
		}

		if (result[0].verified === 0) {
			return NextResponse.json(
				{
					error: true,
					message: "The given code is not verified",
				},
				{ status: 400 }
			);
		}

		const [user] = await connection.execute(
			"SELECT * FROM `users` WHERE `users`.`id` = ?",
			[result[0].user_id]
		);

		const isValid = await bcrypt.compare(newPassword, user[0].password);

		if (isValid) {
			return NextResponse.json(
				{
					error: true,
					message: "New password cannot be the same as the old one",
				},
				{ status: 500 }
			);
		} else {
			const hashedPassword = await bcrypt.hash(newPassword, 10);

			await connection.execute(
				"UPDATE `users` SET `password` = ? WHERE `users`.`id` = ?",
				[hashedPassword, result[0].user_id]
			);

			await connection.execute(
				"DELETE FROM `password_code` WHERE `password_code`.`id` = ?",
				[result[0].id]
			);

			connection.release();

			return NextResponse.json(
				{
					error: false,
					message: "Password successfully updated",
				},
				{ status: 200 }
			);
		}
	} catch (err) {
		return NextResponse.json(
			{
				error: true,
				message: err.message || "An unexpected error has occurred",
			},
			{ status: 500 }
		);
	}
}
