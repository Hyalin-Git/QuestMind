import styles from "@/styles/layouts/dashboard.module.css";
import DashboardAside from "@/layouts/DashboardAside";

export default function DashboardLayout({ children }) {
  return (
    <div>
      <aside>
        <DashboardAside />
      </aside>
      {children}
    </div>
  );
}
