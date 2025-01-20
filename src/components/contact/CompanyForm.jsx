import { sendContactForm } from "@/actions/contact";
import { roboto } from "@/libs/font";
import styles from "@/styles/components/contact/contactForm.module.css";
import { useActionState } from "react";
import { useTranslation } from "react-i18next";

const initialState = {
	status: "pending",
	message: "",
	errors: null,
};

export default function CompanyForm() {
	const { t, i18n } = useTranslation();
	const currLanguage = i18n.language;
	const sendContactFormWithState = sendContactForm.bind(null, "company");
	const [state, formAction, pending] = useActionState(
		sendContactFormWithState,
		initialState
	);

	const isFr = currLanguage === "fr";
	const isEn = currLanguage === "en";
	const isEs = currLanguage === "es";

	const errors = state?.errors;

	// Messages d'erreur généralistes
	const companyName = errors?.companyName;
	const companyNameFr = "Nom de l'entreprise invalide";
	const companyNameEn = "Invalid company name";
	const companyNameEs = "Nombre de empresa inválido";

	const firstName = errors?.firstName;
	const firstNameFr = "Prénom invalide";
	const firstNameEn = "Invalid first name";
	const firstNameEs = "Nombre inválido";

	const lastName = errors?.lastName;
	const lastNameFr = "Nom de famille invalide";
	const lastNameEn = "Invalid last name";
	const lastNameEs = "Apellido inválido";

	const campaignDate = errors?.campaignDate;
	const campaignDateFr = "Date de campagne invalide";
	const campaignDateEn = "Invalid campaign date";
	const campaignDateEs = "Fecha de campaña inválida";

	const budget = errors?.budget;
	const budgetFr = "Budget invalide";
	const budgetEn = "Invalid budget";
	const budgetEs = "Presupuesto inválido";

	const email = errors?.email;
	const emailFr = "Email invalide";
	const emailEn = "Invalid email";
	const emailEs = "Correo electrónico inválido";

	const message = errors?.message;
	const messageFr = "Message invalide";
	const messageEn = "Invalid message";
	const messageEs = "Mensaje inválido";

	return (
		<div className={styles.container}>
			<form action={formAction} className={styles.form}>
				<div className={styles.formWrapper}>
					<div className={styles.row}>
						<div>
							<label htmlFor="company-name" className={roboto.className}>
								{t("companyForm.0.label")}
							</label>
							<br />
							<input
								type="text"
								name="company-name"
								id="company-name"
								required
							/>
							{companyName && (
								<i>
									{(isFr && companyNameFr) ||
										(isEn && companyNameEn) ||
										(isEs && companyNameEs)}
								</i>
							)}
						</div>
						<div>
							<label htmlFor="first-name" className={roboto.className}>
								{t("companyForm.1.label")}
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
							<label htmlFor="last-name" className={roboto.className}>
								{t("companyForm.2.label")}
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
					</div>
					<div className={styles.row}>
						<div>
							<label htmlFor="campaign-date" className={roboto.className}>
								{t("companyForm.3.label")}
							</label>
							<br />
							<input
								type="text"
								name="campaign-date"
								id="campaign-date"
								required
							/>
							{campaignDate && (
								<i>
									{(isFr && campaignDateFr) ||
										(isEn && campaignDateEn) ||
										(isEs && campaignDateEs)}
								</i>
							)}
						</div>
						<div>
							<label htmlFor="budget" className={roboto.className}>
								{t("companyForm.4.label")}
							</label>
							<br />
							<input type="text" name="budget" id="budget" required />
							{budget && (
								<i>
									{(isFr && budgetFr) ||
										(isEn && budgetEn) ||
										(isEs && budgetEs)}
								</i>
							)}
						</div>
						<div>
							<label htmlFor="email" className={roboto.className}>
								{t("companyForm.5.label")}
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
					<div className={styles.message}>
						<label htmlFor="message" className={roboto.className}>
							{t("companyForm.6.label")}
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
		</div>
	);
}
