import pool from "@/app/api/config/db";
import { NextResponse } from "next/server";

export async function DELETE(req, { params }) {
	try {
		const { id } = await params;

		const connection = await pool.getConnection();

		const [nationality] = await connection.execute(
			"SELECT * FROM `nationalities` WHERE `nationalities`.`id` = ?",
			[id]
		);

		if (nationality.length <= 0) {
			return NextResponse.json(
				{
					success: false,
					message: "Impossible to delete a non-existant nationality",
				},
				{ status: 404 }
			);
		}

		await connection.execute(
			"DELETE FROM `nationalities` WHERE `nationalities`.`id` = ?",
			[id]
		);

		connection.release();

		return NextResponse.json(
			{
				success: true,
				message: "Nationality successfully deleted",
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
