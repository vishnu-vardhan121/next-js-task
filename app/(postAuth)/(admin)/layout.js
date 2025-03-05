import AdminNavbar from "@/app/components/admin/AdminNavbar";
import Navbar from "../../components/Navbar";

export default function DashboardLayout({ children }) {
  return (
    <>
      <AdminNavbar />
      <main className="w-full">{children}</main>
    </>
  );
}
