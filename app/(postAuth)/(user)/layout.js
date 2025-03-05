import Navbar from "../../components/Navbar";

export default function DashboardLayout({ children }) {
  return (
    <>
      <Navbar />
      <main className="w-full">{children}</main>
    </>
  );
}
