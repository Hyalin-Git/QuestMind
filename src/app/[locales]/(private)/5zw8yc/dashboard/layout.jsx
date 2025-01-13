import styles from "@/styles/layouts/dashboard.module.css";
import DashboardAside from "@/layouts/DashboardAside";
import AuthProvider from "@/app/AuthProvider";

export default function DashboardLayout({ children }) {
	return (
		<AuthProvider>
			<div className={styles.container}>
				<aside>
					<DashboardAside />
				</aside>
				{children}
			</div>
		</AuthProvider>
	);
}
