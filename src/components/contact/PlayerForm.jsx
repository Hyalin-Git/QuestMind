import { sendContactForm } from "@/actions/contact";
import { roboto } from "@/libs/font";
import styles from "@/styles/components/contact/contactForm.module.css";
import { useActionState } from "react";

const initialState = {
	message: "",
};

export default function PlayerForm() {
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
								First Name
							</label>
							<br />
							<input type="text" name="first-name" id="first-name" />
						</div>
						<div>
							<label htmlFor="last-name" className={roboto.className}>
								Last Name
							</label>
							<br />
							<input type="text" name="last-name" id="last-name" required />
						</div>
						<div>
							<label htmlFor="nationality" className={roboto.className}>
								Nationality
							</label>
							<br />
							<input type="text" name="nationality" id="nationality" required />
						</div>
					</div>
					<div className={styles.row}>
						<div>
							<label htmlFor="country" className={roboto.className}>
								Residency Country
							</label>
							<br />
							<input type="text" name="country" id="country" required />
						</div>
						<div>
							<label htmlFor="email" className={roboto.className}>
								Email
							</label>
							<br />
							<input type="email" name="email" id="email" required />
						</div>
						<div>
							<label htmlFor="game" className={roboto.className}>
								Game
							</label>
							<br />
							<input type="text" name="game" id="game" required />
						</div>
					</div>
					<div className={styles.message}>
						<label htmlFor="message" className={roboto.className}>
							Message
						</label>

						<textarea name="message" id="message" required></textarea>
					</div>
				</div>
				<div className={styles.button}>
					<button className={roboto.className} disabled={pending}>
						Submit
					</button>
				</div>
			</form>
		</div>
	);
}
