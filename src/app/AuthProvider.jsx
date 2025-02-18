"use client";
import { getSession } from "@/api/auth";
import { AuthContext } from "@/context/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import useSWR from "swr";

export default function AuthProvider({ children }) {
	const router = useRouter();
	const [uid, setUid] = useState(null);

	const { data, error } = useSWR("/auth/get-session", getSession, {
		refreshInterval: 15 * 60 * 1000, // Refresh every 15 minutes
		revalidateOnMount: true,
		revalidateOnFocus: true,
		refreshWhenHidden: true,
	});

	useEffect(() => {
		if (data?.success === false) {
			router.push(`/${process.env.NEXT_PUBLIC_SECRET_URL}/auth`);
		}

		setUid(data?.data?.userId);
	}, [data, router]);

	if (error) {
		router.push(`/${process.env.NEXT_PUBLIC_SECRET_URL}/auth`);
	}

	return (
		<AuthContext.Provider value={{ uid, setUid }}>
			{children}
		</AuthContext.Provider>
	);
}
