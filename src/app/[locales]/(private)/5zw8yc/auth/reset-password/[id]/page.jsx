"use server";
import ResetPasswordForm from "@/components/auth/ResetPasswordForm";
import styles from "@/styles/page/auth.module.css";

export default async function ResetPassword({ params }) {
	const { id } = await params;
	return (
		<main className={styles.main}>
			<div className={styles.background}></div>
			<div className={styles.content}>
				<ResetPasswordForm resetCode={id} />
			</div>
		</main>
	);
}
