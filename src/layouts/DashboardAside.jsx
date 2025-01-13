"use client";
import { logout } from "@/api/auth";
import styles from "@/styles/layouts/dashboard.module.css";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function DashboardAside() {
	const pathname = usePathname();

	const players = pathname?.includes("players");
	const games = pathname?.includes("games");
	const sponsors = pathname?.includes("sponsors");
	async function handleLogout(e) {
		await logout();
	}
	return (
		<div className={styles.dashboard}>
			<nav className={styles.nav}>
				<div className={styles.logo}>
					<Link href={"/"}>
						<Image
							src={"/quest-mind-logo.svg"}
							width={140}
							height={140}
							alt="QuestMind"
						/>
					</Link>
				</div>
				<div className={styles.navList}>
					<ul>
						<li data-active={players}>
							<Link href={`players`}>Gestion des joueurs </Link>
						</li>
						<li data-active={games}>
							<Link href={`games`}>Gestion des jeux </Link>
						</li>
						<li data-active={sponsors}>
							<Link href={`sponsors`}>Gestion des sponsors</Link>
						</li>
					</ul>
				</div>
			</nav>
			<div className={styles.logout} onClick={handleLogout}>
				<span>Se déconnecter</span>
			</div>
		</div>
	);
}
