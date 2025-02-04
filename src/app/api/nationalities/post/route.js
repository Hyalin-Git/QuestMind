import { nationalitiesSchema } from "@/libs/zod";
import pool from "../../config/db";
import { NextResponse } from "next/server";

export async function POST(req) {
	try {
		const { region } = await req.json();

		const validation = nationalitiesSchema.safeParse({
			region,
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
			"INSERT INTO `nationalities` (`region`) VALUES (?)",
			[region]
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
