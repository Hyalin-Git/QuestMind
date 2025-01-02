import { nationalitiesSchema } from "@/libs/zod";
import pool from "../../config/db";
import { saveFile } from "@/libs/handleFiles";
import { NextResponse } from "next/server";

export async function POST(req) {
	try {
		const formData = await req.formData();
		const nationality = formData.get("nationality");
		const region = formData.get("region");

		const validation = nationalitiesSchema.safeParse({
			region,
			nationality,
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

		const [savedNationality] = await connection.execute(
			"INSERT INTO `nationalities` (`nationality`, `region`) VALUES (?, ?)",
			[nationality, region]
		);

		if (savedNationality.affectedRows <= 0) {
			return NextResponse.json(
				{
					success: false,
					message: "An error occurred while creating a nationality",
				},
				{ status: 500 }
			);
		}

		connection.release();

		return NextResponse.json(
			{
				success: true,
				message: "Nationality successfully created",
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
