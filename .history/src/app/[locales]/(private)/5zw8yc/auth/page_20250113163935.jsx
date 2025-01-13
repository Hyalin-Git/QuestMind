"use client";
import styles from "@/styles/page/auth.module.css";
import SignIn from "@/components/auth/SignIn";
import { useState } from "react";
import SignUp from "@/components/auth/SignUp";

export default function Auth() {
  const [signIn, setSignIn] = useState(true);
  const [signUp, setSignUp] = useState(false);

  return (
    <main className={styles.main}>
      <div className={styles.background}></div>
      <div className={styles.content}>
        {signIn && <SignIn setSignIn={setSignIn} setSignUp={setSignUp} />}
        {signUp && <SignUp setSignIn={setSignIn} setSignUp={setSignUp} />}
      </div>
    </main>
  );
}
