"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const WithAuth = (Component) => {
  return (props) => {
    const { user } = useSelector((state) => state); // Ensure correct state structure
    const router = useRouter();

    useEffect(() => {
      if (!user?.user?.email) {
        // ✅ Redirect only if NOT authenticated
        router.push("/login");
      } else {
        // Redirect based on role
        if (user.user.role === "admin") {
          router.push("/admin-dashboard");
        } else {
          router.push("/dashboard");
        }
      }
    }, [user.user?.email, user.user?.role]);

    return user?.user?.email ? <Component {...props} /> : null;
  };
};

export default WithAuth;
