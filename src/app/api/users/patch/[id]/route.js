import pool from "@/app/api/config/db";
import { NextResponse } from "next/server";

export async function PATCH(req, { params }) {
	try {
		const { id } = await params;
		const { role } = await req.json();

		if (role !== "admin" && role !== "user") {
			return NextResponse.json(
				{
					success: false,
					message: "Invalid request",
				},
				{ status: 400 }
			);
		}

		const connection = await pool.getConnection();

		const [updatedUser] = await connection.execute(
			"UPDATE `users` SET `role` = ? WHERE `users`.`id` = ?",
			[role, id]
		);

		if (updatedUser.affectedRows <= 0) {
			return NextResponse.json(
				{
					success: false,
					message: "Impossible to update a non-existant user",
				},
				{ status: 404 }
			);
		}

		connection.release();

		return NextResponse.json(
			{
				success: true,
				message: "User successfully updated",
			},
			{ status: 200 }
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
