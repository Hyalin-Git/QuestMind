import { NextResponse } from "next/server";
import pool from "../../config/db";
import { sponsorsSchema } from "@/libs/zod";
import { uploadFile } from "@/helpers/cloudinary";

export async function POST(req) {
	try {
		const formData = await req.formData();
		const sponsor = formData.get("sponsor");
		const picture = formData.get("picture");

		const validation = sponsorsSchema.safeParse({ sponsor, picture });

		if (!validation.success) {
			const errors = validation.error.flatten().fieldErrors;

			return NextResponse.json(
				{
					success: false,
					message: "Invalid request",
					errors: errors,
				},
				{ status: 400 }
			);
		}

		if (!picture) {
			return NextResponse.json(
				{
					success: false,
					message: "Une photo est requise",
				},
				{ status: 400 }
			);
		}

		// convert image to base64
		const base64 = await picture?.arrayBuffer();
		const buffer = Buffer.from(base64);

		const res = await uploadFile(buffer);

		const connection = await pool.getConnection();

		const [savedSponsor] = await connection.execute(
			"INSERT INTO `sponsors` (`sponsor`, `picture`) VALUES (?, ?)",
			[sponsor, res?.secure_url]
		);

		if (savedSponsor.affectedRows <= 0) {
			return NextResponse.json(
				{
					success: false,
					message: "An error occurred while creating a sponsor",
				},
				{ status: 500 }
			);
		}

		connection.release();

		return NextResponse.json(
			{
				success: true,
				message: "Sponsor successfully created",
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
