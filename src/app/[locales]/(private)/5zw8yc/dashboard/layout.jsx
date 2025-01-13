import styles from "@/styles/layouts/dashboard.module.css";
import DashboardAside from "@/layouts/DashboardAside";

export default function DashboardLayout({ children }) {
  return (
    <div className={styles.container}>
      <aside>
        <DashboardAside />
      </aside>
      {children}
    </div>
  );
}
