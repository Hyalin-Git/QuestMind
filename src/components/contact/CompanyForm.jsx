import { sendContactForm } from "@/actions/contact";
import { roboto } from "@/libs/font";
import styles from "@/styles/components/contact/contactForm.module.css";
import { useActionState } from "react";

const initialState = {
	message: "",
};

export default function CompanyForm() {
	const sendContactFormWithState = sendContactForm.bind(null, "company");
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
							<label htmlFor="company-name" className={roboto.className}>
								Company’s Name
							</label>
							<br />
							<input
								type="text"
								name="company-name"
								id="company-name"
								required
							/>
						</div>
						<div>
							<label htmlFor="first-name" className={roboto.className}>
								First Name
							</label>
							<br />
							<input type="text" name="first-name" id="first-name" required />
						</div>
						<div>
							<label htmlFor="last-name" className={roboto.className}>
								Last Name
							</label>
							<br />
							<input type="text" name="last-name" id="last-name" required />
						</div>
					</div>
					<div className={styles.row}>
						<div>
							<label htmlFor="campaign-date" className={roboto.className}>
								Campaign’s Date
							</label>
							<br />
							<input
								type="text"
								name="campaign-date"
								id="campaign-date"
								required
							/>
						</div>
						<div>
							<label htmlFor="budget" className={roboto.className}>
								Budget
							</label>
							<br />
							<input type="text" name="budget" id="budget" required />
						</div>
						<div>
							<label htmlFor="email" className={roboto.className}>
								Email
							</label>
							<br />
							<input type="email" name="email" id="email" required />
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
