import { sendMail } from "@/libs/nodemailer";
import { companyContactSchema, playerContactSchema } from "@/libs/zod";
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
			const body = await req.json();

			const validation = playerContactSchema.safeParse(body);

			if (!validation.success) {
				const errors = validation.error.flatten().fieldErrors;

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
                        <strong>Nom :</strong> ${body?.lastName}
                    </div>
                    <div>
                        <strong>Prénom :</strong> ${body?.firstName}
                    </div>
                    <div>
                        <strong>E-mail :</strong> ${body?.sender}
                    </div>
                    <div>
                        <strong>Nationalitié :</strong> ${body?.nationality}
                    </div>
                    <div>
                        <strong>Pays :</strong> ${body?.country}
                    </div>
                      <div>
                        <strong>Jeu :</strong> ${body?.game}
                    </div>
                    </br>
                    <div>
                        <strong>Message :</strong>
                        <pre>${body?.message}</pre>
                    </div>
                </div>
                    `
			);
		}

		if (state === "company") {
			const body = await req.json();

			const validation = companyContactSchema.safeParse(body);

			if (!validation.success) {
				const errors = validation.error.flatten().fieldErrors;

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
				"Prise de contact d'une entreprise",
				`
                <div>
                    <h2>Prise de contact d'une entreprise</h2>
                    <div>
                        <strong>Nom de l'entreprise :</strong> ${body?.companyName}
                    </div>
                    <div>
                        <strong>Nom :</strong> ${body?.lastName}
                    </div>
                    <div>
                        <strong>Prénom :</strong> ${body?.firstName}
                    </div>
                    <div>
                        <strong>E-mail :</strong> ${body?.sender}
                    </div>
                    <div>
                        <strong>Date de la campagne :</strong> ${body?.campaignDate}
                    </div>
                    <div>
                        <strong>Budget estimé :</strong> ${body?.budget}
                    </div>
                    </br>
                    <div>
                        <strong>Message :</strong>
                        <pre>${body?.message}</pre>
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
