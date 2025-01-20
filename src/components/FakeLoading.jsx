"use client";
import styles from "@/styles/components/fakeLoading.module.css";
import { useState } from "react";

export default function FakeLoading() {
	const [active, setActive] = useState(true);

	return (
		<>
			{active && (
				<div
					className={styles.container}
					id="fake-loading"
					onAnimationEnd={() => {
						setTimeout(() => setActive(false), 1400);
					}}>
					<div className={styles.background}></div>
					<div className={styles.loader}></div>
				</div>
			)}
		</>
	);
}
