import { sendMail } from "@/libs/nodemailer";
import { playerContactSchema } from "@/libs/zod";
import { NextResponse } from "next/server";

export async function POST(req) {
	try {
		const state = req.nextUrl.searchParams.get("state");

		if (!state) {
			return NextResponse.json(
				{
					success: false,
					message: "Missing parameters",
				},
				{ status: 400 }
			);
		}

		if (state === "player") {
			const {
				sender,
				firstName,
				lastName,
				nationality,
				country,
				game,
				message,
			} = await req.json();

			const validation = playerContactSchema.safeParse({
				sender,
				firstName,
				lastName,
				nationality,
				country,
				game,
				message,
			});

			if (!validation.success) {
				const { errors } = validation.error;

				return NextResponse.json(
					{
						success: false,
						message: "Invalid request",
						error: errors,
					},
					{ status: 400 }
				);
			}

			await sendMail(
				sender,
				"contact@questmind.gg",
				"Prise de contact d'un joueur",
				`
                <div>
                    <h2>Prise de contact d'un joueur</h2>
                    <div>
                        <strong>Nom :</strong> ${lastName}
                    </div>
                    <div>
                        <strong>Prénom :</strong> ${firstName}
                    </div>
                    <div>
                        <strong>E-mail :</strong> ${sender}
                    </div>
                    <div>
                        <strong>Nationalitié :</strong> ${nationality}
                    </div>
                    <div>
                        <strong>Pays :</strong> ${country}
                    </div>
                      <div>
                        <strong>Jeu :</strong> ${game}
                    </div>
                    </br>
                    <div>
                        <strong>Message :</strong>
                        <pre>${message}</pre>
                    </div>
                </div>
                    `
			);
		}

		if (state === "company") {
			const {
				sender,
				companyName,
				lastName,
				firstName,
				campaignDate,
				budget,
				message,
			} = await req.json();

			if (
				!sender ||
				!companyName ||
				!firstName ||
				!lastName ||
				!campaignDate ||
				!budget ||
				!message
			) {
				return NextResponse.json(
					{
						success: false,
						message: "Missing parameters",
					},
					{ status: 400 }
				);
			}

			await sendMail(
				sender,
				"contact@questmind.gg",
				"Prise de contact d'une entreprise",
				`
                <div>
                    <h2>Prise de contact d'une entreprise</h2>
                    <div>
                        <strong>Nom de l'entreprise :</strong> ${companyName}
                    </div>
                    <div>
                        <strong>Nom :</strong> ${lastName}
                    </div>
                    <div>
                        <strong>Prénom :</strong> ${firstName}
                    </div>
                    <div>
                        <strong>E-mail :</strong> ${sender}
                    </div>
                    <div>
                        <strong>Date de la campagne :</strong> ${campaignDate}
                    </div>
                    <div>
                        <strong>Budget estimé :</strong> ${budget}
                    </div>
                    </br>
                    <div>
                        <strong>Message :</strong>
                        <pre>${message}</pre>
                    </div>
                </div>
                    `
			);
		}

		return NextResponse.json(
			{
				success: true,
				message: "E-mail successfully sent",
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
