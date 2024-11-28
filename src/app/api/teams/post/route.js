import { teamSchema } from "@/libs/zod";
import pool from "../../config/db";
import { saveFile } from "@/libs/handleFiles";
import { NextResponse } from "next/server";

export async function POST(req) {
	try {
		const formData = await req.formData();
		const team = formData.get("team");
		const picture = formData.get("picture");

		const validation = teamSchema.safeParse({
			team,
			picture,
		});

		if (!validation.success) {
			const { errors } = validation.error;

			return NextResponse.json(
				{
					success: false,
					message: "Invalid request",
					errors: errors,
				},
				{ status: 400 }
			);
		}

		const connection = await pool.getConnection();

		const [savedTeam] = await connection.execute(
			"INSERT INTO `teams` (`team`, `picture`) VALUES (?, ?)",
			[team, null]
		);

		if (savedTeam.affectedRows <= 0) {
			return NextResponse.json(
				{
					success: false,
					message: "An error occurred while creating a team",
				},
				{ status: 500 }
			);
		}

		const savedPicture = picture
			? await saveFile(picture, team.toLowerCase(), "teams")
			: null;

		await connection.execute(
			"UPDATE `teams` SET `picture` = ? WHERE `teams`.`id` = ?",
			[savedPicture, savedTeam.insertId]
		);

		connection.release();

		return NextResponse.json(
			{
				success: true,
				message: "Team successfully created",
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
