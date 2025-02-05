"use client";
import styles from "@/styles/page/auth.module.css";
import SignIn from "@/components/auth/SignIn";
import { useState } from "react";
import SignUp from "@/components/auth/SignUp";
import ForgotPassword from "@/components/auth/ForgotPassword";

export default function Auth() {
	const [signIn, setSignIn] = useState(true);
	const [signUp, setSignUp] = useState(false);
	const [forgotPassword, setForgotPassword] = useState(false);

	return (
		<main className={styles.main}>
			<div className={styles.background}></div>
			<div className={styles.content}>
				{signIn && (
					<SignIn
						setSignIn={setSignIn}
						setSignUp={setSignUp}
						setForgotPassword={setForgotPassword}
					/>
				)}
				{signUp && <SignUp setSignIn={setSignIn} setSignUp={setSignUp} />}
				{forgotPassword && (
					<ForgotPassword
						setForgotPassword={setForgotPassword}
						setSignIn={setSignIn}
					/>
				)}
			</div>
		</main>
	);
}
