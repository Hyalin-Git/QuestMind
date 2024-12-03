"use client";
import styles from "@/styles/components/fakeLoading.module.css";
import Image from "next/image";

export default function FakeLoading() {
	return (
		<div className={styles.container}>
			{/* <div className={styles.background}></div> */}
		
			<div className={styles.loader}></div>
			
		</div>
	);
}
