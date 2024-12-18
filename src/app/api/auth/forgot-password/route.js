import { NextResponse } from "next/server";
import pool from "../../config/db";
import crypto from "crypto";
import { sendMail } from "@/libs/nodemailer";

export async function POST(req) {
	try {
		const { email } = await req.json();

		if (!email) {
			return NextResponse.json(
				{
					error: true,
					message: "Missing parameters",
				},
				{ status: 400 }
			);
		}

		const connection = await pool.getConnection();

		const [user] = await connection.execute(
			"SELECT * FROM `users` WHERE `users`.`email` = ?",
			[email]
		);

		if (user.length <= 0) {
			return NextResponse.json(
				{
					error: true,
					message: "No account found with the provided email address",
				},
				{ status: 404 }
			);
		}

		const code = crypto.randomBytes(3).toString("hex");

		await sendMail(
			"QuestMind <questmind@gmail.com>",
			email,
			"Rénitialisation du mot de passe",
			`<div>
                <h2>Mot de passe oublié</h2>
                <p>Nous avons reçu une demande de réinitialisation de votre mot de passe pour votre compte associé à cette adresse e-mail.</p>
                <p>Si vous avez effectué cette demande, veuillez copier le code ci-dessous pour réinitialiser votre mot de passe : </p>

                <span style="font-size: 25px; font-weight: bold;">${code}</span>
            
                <p>Si vous n'avez pas demandé cette réinitialisation, veuillez ignorer cet e-mail. Votre compte reste sécurisé, et aucun changement n'a été apporté à votre mot de passe.</p>
            </div>`
		);

		await connection.execute(
			"DELETE FROM `password_code` WHERE `expires_at` < Now()"
		);

		await connection.execute(
			"INSERT INTO `password_code` (`user_id`, `code`, `expires_at`) VALUES (?, ?, NOW() + INTERVAL 15 MINUTE)",
			[user[0].id, code]
		);

		connection.release();

		return NextResponse.json(
			{
				error: false,
				message:
					"The reset code has been successfully sent to the corresponding email address",
			},
			{ status: 200 }
		);
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

export async function PATCH(req) {
	try {
		const { code } = await req.json();

		if (!code) {
			return NextResponse.json(
				{
					error: true,
					message: "Missing parameters",
				},
				{ status: 400 }
			);
		}

		await pool.query("DELETE FROM `password_code` WHERE `expires_at` < Now()");

		const [update] = await pool.query(
			"UPDATE `password_code` SET `verified` = 1 WHERE `password_code`.`code` = ?",
			[code]
		);

		if (update.affectedRows <= 0) {
			return NextResponse.json(
				{
					error: true,
					message: "The given code doesn't exist or has expired",
				},
				{ status: 404 }
			);
		}

		return NextResponse.json(
			{
				error: false,
				message: "The reset code has been successfully verified",
			},
			{ status: 200 }
		);
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
