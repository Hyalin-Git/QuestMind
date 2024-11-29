import { sendMail } from "@/libs/nodemailer";
import { NextResponse } from "next/server";
import pool from "../../config/db";
import bcrypt from "bcrypt";
import crypto from "crypto";

export async function POST(req) {
	try {
		const { email, password, newEmail } = await req.json();

		if (!email || !password || !newEmail) {
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

		const isValid = await bcrypt.compare(password, user[0].password);

		if (!isValid) {
			return NextResponse.json(
				{
					error: true,
					message: "Incorrect password",
				},
				{ status: 404 }
			);
		}

		const token = crypto.randomBytes(16).toString("hex");

		await connection.execute(
			"DELETE FROM `email_tokens` WHERE `expires_at` < Now()"
		);

		await connection.execute(
			"INSERT INTO `email_tokens` (`user_id`, `new_email`, `token`, `expires_at`) VALUES (?, ?, ?, NOW() + INTERVAL 15 MINUTE)",
			[user[0].id, newEmail, token]
		);

		// Send token to the new e-mail adress
		await sendMail(
			newEmail,
			"Changement d'adresse mail",
			`<div>
                <h2>Changement d'adresse mail</h2>
                <p>Vous avez récemment demandé à changer votre adresse e-mail.</p>
                <p>Veuillez confirmer ce changement en cliquant sur le lien de confirmation ci-dessous :</p>
            
                <span>${process.env.CLIENT_URL}/email/verification/${token}</span>
            
                <p>Ce lien de confirmation est unique pour votre compte et ne sera valide que pour une durée limitée, veuillez le cliquer dès que possible pour compléter le processus de changement d'adresse e-mail.</p>
                <p>Si vous n'avez pas initié ce changement ou si vous pensez qu'il s'agit d'une erreur, veuillez ignorer cet e-mail et votre adresse e-mail actuelle restera inchangée.</p>
            </div>`
		);

		// Send an email to the current email adress of the user
		await sendMail(
			user[0].email,
			"Changement d'adresse mail",
			`<h1>Changement d'adresse mail</h1><br /><p>Vous venez de faire une demande pour changer d'adresse mail est-ce bien vous ? Si oui ignorer ce message, si non contactez le support</p>`
		);

		connection.release();

		return NextResponse.json(
			{
				error: false,
				message:
					"A verification e-mail has been sent to your new e-mail address",
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
		const { token } = await req.json();

		if (!token) {
			return NextResponse.json(
				{
					error: true,
					message: "Missing parameters",
				},
				{ status: 400 }
			);
		}

		await pool.query("DELETE FROM `email_tokens` WHERE `expires_at` < Now()");

		const [result] = await pool.query(
			"SELECT * FROM `email_tokens` WHERE `email_tokens`.`token` = ?",
			[token]
		);

		if (result.length <= 0) {
			return NextResponse.json(
				{
					error: true,
					message: "The given token doesn't exist or has expired",
				},
				{ status: 404 }
			);
		}

		const [user] = await pool.query(
			"UPDATE `users` SET `email` = ? WHERE `users`.`id` = ?",
			[result[0].new_email, result[0].user_id]
		);

		if (user.affectedRows <= 0) {
			return NextResponse.json(
				{
					error: true,
					message: "Impossible to update a non-existent user",
				},
				{ status: 404 }
			);
		}

		await pool.query(
			"DELETE FROM `email_tokens` WHERE `email_tokens`.`id` = ?",
			[result[0].id]
		);

		return NextResponse.json(
			{
				error: false,
				message: "E-mail adress successfully updated",
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
