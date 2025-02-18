"use client";
import { sendContactForm } from "@/actions/contact";
import { outfit, roboto } from "@/libs/font";
import styles from "@/styles/components/contact/contactForm.module.css";
import { useActionState, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const initialState = {
	status: "pending",
	message: "",
	errors: null,
};

export default function PlayerForm() {
	const [modal, setModal] = useState(false);
	const { t, i18n } = useTranslation();
	const currLanguage = i18n.language;
	const sendContactFormWithState = sendContactForm.bind(null, "player");
	const [state, formAction, pending] = useActionState(
		sendContactFormWithState,
		initialState
	);

	useEffect(() => {
		if (state?.status === "success") {
			setModal(true);
		}
	}, [state]);

	const isFr = currLanguage === "fr";
	const isEn = currLanguage === "en";
	const isEs = currLanguage === "es";

	const errors = state?.errors;

	// Messages d'erreur généralistes
	const firstName = errors?.firstName;
	const firstNameFr = "Prénom invalide";
	const firstNameEn = "Invalid first name";
	const firstNameEs = "Nombre inválido";

	const lastName = errors?.lastName;
	const lastNameFr = "Nom de famille invalide";
	const lastNameEn = "Invalid last name";
	const lastNameEs = "Apellido inválido";

	const nationality = errors?.nationality;
	const nationalityFr = "Nationalité invalide";
	const nationalityEn = "Invalid nationality";
	const nationalityEs = "Nacionalidad inválida";

	const country = errors?.country;
	const countryFr = "Pays invalide";
	const countryEn = "Invalid country";
	const countryEs = "País inválido";

	const email = errors?.email;
	const emailFr = "Email invalide";
	const emailEn = "Invalid email";
	const emailEs = "Correo electrónico inválido";

	const game = errors?.game;
	const gameFr = "Jeu invalide";
	const gameEn = "Invalid game";
	const gameEs = "Juego inválido";

	const pseudo = errors?.pseudo;
	const pseudoFr = "Pseudo invalide";
	const pseudoEn = "Invalid pseudo";
	const pseudoEs = "Pseudo inválido";

	const xUrl = errors?.xUrl;
	const xUrlFr = "URL X invalide";
	const xUrlEn = "Invalid X URL";
	const xUrlEs = "URL X inválida";

	const message = errors?.message;
	const messageFr = "Message invalide";
	const messageEn = "Invalid message";
	const messageEs = "Mensaje inválido";

	console.log(state);

	return (
		<div className={styles.container}>
			<form action={formAction} className={styles.form}>
				<div className={styles.formWrapper}>
					<div className={styles.row}>
						<div>
							<label htmlFor="last-name" className={roboto.className}>
								{t("playerForm.0.label")}
							</label>
							<br />
							<input type="text" name="last-name" id="last-name" required />
							{lastName && (
								<i>
									{(isFr && lastNameFr) ||
										(isEn && lastNameEn) ||
										(isEs && lastNameEs)}
								</i>
							)}
						</div>
						<div>
							<label htmlFor="first-name" className={roboto.className}>
								{t("playerForm.1.label")}
							</label>
							<br />
							<input type="text" name="first-name" id="first-name" required />
							{firstName && (
								<i>
									{(isFr && firstNameFr) ||
										(isEn && firstNameEn) ||
										(isEs && firstNameEs)}
								</i>
							)}
						</div>
						<div>
							<label htmlFor="nationality" className={roboto.className}>
								{t("playerForm.2.label")}
							</label>
							<br />
							<input type="text" name="nationality" id="nationality" required />
							{nationality && (
								<i>
									{(isFr && nationalityFr) ||
										(isEn && nationalityEn) ||
										(isEs && nationalityEs)}
								</i>
							)}
						</div>
					</div>
					<div className={styles.row}>
						<div>
							<label htmlFor="country" className={roboto.className}>
								{t("playerForm.3.label")}
							</label>
							<br />
							<input type="text" name="country" id="country" required />
							{country && (
								<i>
									{(isFr && countryFr) ||
										(isEn && countryEn) ||
										(isEs && countryEs)}
								</i>
							)}
						</div>
						<div>
							<label htmlFor="age" className={roboto.className}>
								{t("playerForm.4.label")}
							</label>
							<br />
							<input type="number" name="age" id="age" required />
							{email && (
								<i>
									{(isFr && emailFr) || (isEn && emailEn) || (isEs && emailEs)}
								</i>
							)}
						</div>
						<div>
							<label htmlFor="email" className={roboto.className}>
								{t("playerForm.5.label")}
							</label>
							<br />
							<input type="email" name="email" id="email" required />
							{email && (
								<i>
									{(isFr && emailFr) || (isEn && emailEn) || (isEs && emailEs)}
								</i>
							)}
						</div>
					</div>
					<div className={styles.row}>
						<div>
							<label htmlFor="game" className={roboto.className}>
								{t("playerForm.6.label")}
							</label>
							<br />
							<input type="text" name="game" id="game" required />
							{game && (
								<i>
									{(isFr && gameFr) || (isEn && gameEn) || (isEs && gameEs)}
								</i>
							)}
						</div>
						<div>
							<label htmlFor="pseudo">{t("playerForm.7.label")}</label>
							<br />
							<input type="text" name="pseudo" id="pseudo" required />
							{pseudo && (
								<i>
									{(isFr && pseudoFr) ||
										(isEn && pseudoEn) ||
										(isEs && pseudoEs)}
								</i>
							)}
						</div>
						<div>
							<label htmlFor="x-url">{t("playerForm.8.label")}</label>
							<br />
							<input type="text" id="x-url" name="x-url" />
							{xUrl && (
								<i>
									{(isFr && xUrlFr) || (isEn && xUrlEn) || (isEs && xUrlEs)}
								</i>
							)}
						</div>
					</div>
					<div className={styles.message}>
						<label htmlFor="message" className={roboto.className}>
							{t("playerForm.9.label")}
						</label>

						<textarea name="message" id="message" required />
						{message && (
							<i>
								{(isFr && messageFr) ||
									(isEn && messageEn) ||
									(isEs && messageEs)}
							</i>
						)}
					</div>
				</div>
				<div className={styles.button}>
					<button className={roboto.className} disabled={pending}>
						{t("submit")}
					</button>
				</div>
			</form>
			{modal && (
				<>
					<div id="modal" className={styles.modal}>
						<span>E-mail reçu !</span>
						<p className={styles.success}>
							Merci pour votre message, nous l'avons bien reçu et vous
							contacterons prochainement.
						</p>
						<button
							className={outfit.className}
							onClick={(e) => setModal(false)}>
							Parfait
						</button>
					</div>
					<div id="layout" onClick={(e) => setModal(false)}></div>
				</>
			)}
		</div>
	);
}
