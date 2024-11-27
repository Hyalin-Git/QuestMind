import pool from "@/app/api/config/db";
import { deleteFile } from "@/libs/handleFiles";
import { NextResponse } from "next/server";

export async function DELETE(req, { params }) {
	try {
		const { id } = await params;

		const connection = await pool.getConnection();

		const [sponsors] = await connection.execute(
			"SELECT * FROM `sponsors` WHERE `sponsors`.`id` = ?",
			[id]
		);

		if (sponsors.length <= 0) {
			return NextResponse.json(
				{
					success: false,
					message: "Impossible to delete a non-existant sponsor",
				},
				{ status: 404 }
			);
		}

		if (sponsors[0].picture) await deleteFile(sponsors[0].picture);

		await connection.execute(
			"DELETE FROM `sponsors` WHERE `sponsors`.`id` = ?",
			[id]
		);

		connection.release();

		return NextResponse.json(
			{
				success: true,
				message: "sponsor successfully deleted",
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
