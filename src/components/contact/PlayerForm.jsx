import { sendContactForm } from "@/actions/contact";
import { roboto } from "@/libs/font";
import styles from "@/styles/components/contact/contactForm.module.css";
import { useActionState } from "react";
import { useTranslation } from "react-i18next";

const initialState = {
	message: "",
};

export default function PlayerForm() {
	const { t } = useTranslation();
	const sendContactFormWithState = sendContactForm.bind(null, "player");
	const [state, formAction, pending] = useActionState(
		sendContactFormWithState,
		initialState
	);

	return (
		<div className={styles.container}>
			<form action={formAction} className={styles.form}>
				<div className={styles.formWrapper}>
					<div className={styles.row}>
						<div>
							<label htmlFor="first-name" className={roboto.className}>
								{t("playerForm.0.label")}
							</label>
							<br />
							<input type="text" name="first-name" id="first-name" />
						</div>
						<div>
							<label htmlFor="last-name" className={roboto.className}>
								{t("playerForm.1.label")}
							</label>
							<br />
							<input type="text" name="last-name" id="last-name" required />
						</div>
						<div>
							<label htmlFor="nationality" className={roboto.className}>
								{t("playerForm.2.label")}
							</label>
							<br />
							<input type="text" name="nationality" id="nationality" required />
						</div>
					</div>
					<div className={styles.row}>
						<div>
							<label htmlFor="country" className={roboto.className}>
								{t("playerForm.3.label")}
							</label>
							<br />
							<input type="text" name="country" id="country" required />
						</div>
						<div>
							<label htmlFor="email" className={roboto.className}>
								{t("playerForm.4.label")}
							</label>
							<br />
							<input type="email" name="email" id="email" required />
						</div>
						<div>
							<label htmlFor="game" className={roboto.className}>
								{t("playerForm.5.label")}
							</label>
							<br />
							<input type="text" name="game" id="game" required />
						</div>
					</div>
					<div className={styles.message}>
						<label htmlFor="message" className={roboto.className}>
							{t("playerForm.6.label")}
						</label>

						<textarea name="message" id="message" required></textarea>
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
