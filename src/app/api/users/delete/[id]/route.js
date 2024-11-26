import pool from "@/app/api/config/db";
import { NextResponse } from "next/server";

export async function DELETE(req, { params }) {
	try {
		const { id } = await params;

		const connection = await pool.getConnection();

		const [deletedUser] = await connection.execute(
			"DELETE FROM `users` WHERE `users`.`id` = ?",
			[id]
		);

		if (deletedUser.affectedRows <= 0) {
			return NextResponse.json(
				{
					success: false,
					message: "Impossible to delete a non-existant user",
				},
				{ status: 404 }
			);
		}

		connection.release();

		return NextResponse.json(
			{
				success: true,
				message: "User successfully deleted",
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
