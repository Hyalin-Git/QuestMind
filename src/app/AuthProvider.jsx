"use client";
import { getSession } from "@/api/auth";
import { AuthContext } from "@/context/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import useSWR from "swr";

export default function AuthProvider({ children }) {
	const router = useRouter();
	const [uid, setUid] = useState(null);

	const { error } = useSWR("/auth/get-session", getSession, {
		onSuccess: (data, key, config) => {
			if (data.success) {
				setUid(data?.data?.userId);
			} else {
				router.push(`/${process.env.NEXT_PUBLIC_SECRET_URL}/auth`);
			}
		},
		refreshInterval: 15 * 60 * 1000, // Refresh every 15 minutes
		revalidateOnMount: true,
		revalidateOnFocus: true,
		refreshWhenHidden: true,
	});

	console.log(error);

	useEffect(() => {
		if (error) {
			router.push(`/${process.env.NEXT_PUBLIC_SECRET_URL}/auth`);
		}
	}, [error]);

	return (
		<AuthContext.Provider value={{ uid, setUid }}>
			{children}
		</AuthContext.Provider>
	);
}
