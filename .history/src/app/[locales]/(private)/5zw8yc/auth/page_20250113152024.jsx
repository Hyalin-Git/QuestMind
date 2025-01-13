"use client";
import styles from "@/styles/page/auth.module.css";
import SignIn from "@/components/auth/SignIn";
import Image from "next/image";
import { useState } from "react";

export default function Auth() {
  const [signIn, setSignIn] = useState(true);
  const [signUp, setSignUp] = useState(false);
  return (
    <main>
      {/* Form */}
      <div className={styles.form}>
        {signIn && <SignIn setSignIn={setSignIn} setSignUp={setSignUp} />}
        {signUp && <SignIn setSignIn={setSignIn} setSignUp={setSignUp} />}
      </div>
      {/* Background */}
      <div className={styles.background}></div>
    </main>
  );
}
