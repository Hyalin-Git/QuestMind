import { NextResponse } from "next/server";
import pool from "../../config/db";
import crypto from "crypto";
import { sendMail } from "@/libs/nodemailer";
import { userRegex } from "@/libs/regex";
import bcrypt from "bcrypt";

export async function POST(req) {
	try {
		const { email } = await req.json();

		if (!email) {
			return NextResponse.json(
				{
					success: false,
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
					success: false,
					message: "No user found with the provided email address",
				},
				{ status: 404 }
			);
		}

		const resetCode = crypto.randomBytes(15).toString("hex");
		const resetLink = `${process.env.CLIENT_URL}/5zw8yc/auth/reset-password/${resetCode}`;

		await connection.execute(
			"DELETE FROM `password_code` WHERE `expires_at` < Now()"
		);

		await connection.execute(
			"INSERT INTO `password_code` (`user_id`, `reset_code`, `expires_at`) VALUES (?, ?, NOW() + INTERVAL 15 MINUTE)",
			[user[0]?.id, resetCode]
		);

		await sendMail(
			"QuestMind <questmind@gmail.com>",
			email,
			"Rénitialisation du mot de passe",
			`<div>
				<h2>Mot de passe oublié</h2>
				<p>Nous avons reçu une demande de réinitialisation de votre mot de passe pour votre compte associé à cette adresse e-mail.</p>
				<p>Si vous avez effectué cette demande, veuillez cliquer sur le bouton ci-dessous pour réinitialiser votre mot de passe :</p>
				<a href="${resetLink}" style="display: inline-block; padding: 10px 20px; font-size: 16px; color: #fff; background-color: #007bff; text-decoration: none; border-radius: 5px;">Réinitialiser le mot de passe</a>
				<p>Si vous n'avez pas demandé cette réinitialisation, veuillez ignorer cet e-mail. Votre compte reste sécurisé, et aucun changement n'a été apporté à votre mot de passe.</p>
			</div>`
		);

		connection.release();

		return NextResponse.json(
			{
				success: true,
				message:
					"An email has been sent to the provided address with instructions to reset your password",
			},
			{ status: 200 }
		);
	} catch (err) {
		return NextResponse.json(
			{
				success: false,
				message: err.message || "An unexpected error has occurred",
			},
			{ status: 500 }
		);
	}
}

export async function PATCH(req) {
	try {
		const { resetCode, newPassword, confirmPassword } = await req.json();

		if (!resetCode || !newPassword || !confirmPassword) {
			return NextResponse.json(
				{
					success: false,
					message: "Missing parameters",
				},
				{ status: 400 }
			);
		}

		if (newPassword !== confirmPassword) {
			return NextResponse.json(
				{
					success: false,
					message: "Passwords do not match",
				},
				{ status: 400 }
			);
		}

		if (!userRegex.password.test(newPassword)) {
			return NextResponse.json(
				{
					success: false,
					message:
						"Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character",
				},
				{ status: 400 }
			);
		}

		const connection = await pool.getConnection();

		await connection.execute(
			"DELETE FROM `password_code` WHERE `expires_at` < Now()"
		);

		const [passwordCode] = await connection.execute(
			"SELECT * FROM `password_code` WHERE `password_code`.`reset_code` = ?",
			[resetCode]
		);

		if (passwordCode.length <= 0) {
			return NextResponse.json(
				{
					success: false,
					message: "The reset code is invalid or has expired",
				},
				{ status: 404 }
			);
		}

		const [user] = await connection.execute(
			"SELECT * FROM `users` WHERE `users`.`id` = ?",
			[passwordCode[0]?.user_id]
		);

		if (user.length <= 0) {
			return NextResponse.json(
				{
					success: false,
					message: "No user found with the provided reset code",
				},
				{ status: 404 }
			);
		}

		const match = await bcrypt.compare(newPassword, user[0].password);

		if (match) {
			return NextResponse.json(
				{
					success: false,
					message: "The new password cannot be the same as the old password",
				},
				{ status: 400 }
			);
		}

		const hashedPassword = await bcrypt.hash(newPassword, 10);

		await connection.execute(
			"UPDATE `users` SET `password` = ? WHERE `users`.`id` = ?",
			[hashedPassword, user[0].id]
		);

		await connection.execute(
			"DELETE FROM `password_code` WHERE `password_code`.`reset_code` = ?",
			[resetCode]
		);

		connection.release();

		return NextResponse.json(
			{
				success: true,
				message: "Your password has been successfully reset",
			},
			{ status: 200 }
		);
	} catch (err) {
		return NextResponse.json(
			{
				success: false,
				message: err.message || "An unexpected error has occurred",
			},
			{ status: 500 }
		);
	}
}
