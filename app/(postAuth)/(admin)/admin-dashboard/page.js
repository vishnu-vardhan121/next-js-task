"use client";
import WithAuth from "@/app/components/withAuth";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import AdminProducts from "@/app/components/admin/adminProducts";

function AdminDashboard() {
  const { user } = useSelector((state) => state.user);
  const router = useRouter();

  useEffect(() => {
    if (!user?.id) {
      router.push("/login");
    }
  }, [user?.email]);

  return (
    <div className="p-6">
      <p className="text-xl md:text-2xl xl:text-2xl font-bold">
        Welcome, {user.name}
      </p>

      <div className="mt-6">
        <p className="text-lg font-semibold">Products</p>
        <AdminProducts />
      </div>
    </div>
  );
}

export default WithAuth(AdminDashboard);
