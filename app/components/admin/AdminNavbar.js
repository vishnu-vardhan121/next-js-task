"use client";
import React from "react";
import { IoBagAdd, IoLogOutOutline, IoSearch } from "react-icons/io5";
import { FaRegUserCircle } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { logOutAction } from "../../Redux/Features/usersSlice";
import { persistor } from "../../Redux/store";
import { useRouter } from "next/navigation";
import { IoIosHome } from "react-icons/io";

function AdminNavbar() {
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = async () => {
    dispatch(logOutAction());
    await persistor.purge();
    localStorage.clear();
    sessionStorage.clear();
    router.push("/login");
    setTimeout(() => window.location.reload(), 500);
  };

  const handleLogoClick = (page) => {
    router.push("/" + page);
  };

  return (
    <nav className="shadow-md p-4 bg-white">
      <div className="container mx-auto flex justify-between items-center">
        <div
          className="text-xl sm:text-2xl md:3xl font-bold tracking-widest cursor-pointer"
          onClick={() => handleLogoClick("admin-dashboard")}
        >
          <span className="text-appColor">SHOP</span>
          <span>LANE</span>
        </div>

        <div className="flex items-center space-x-6 text-2xl">
          <IoIosHome
            className="cursor-pointer hover:text-appColor transition duration-300"
            onClick={() => handleLogoClick("admin-dashboard")}
          />
          <IoBagAdd
            className="cursor-pointer hover:text-appColor transition duration-300"
            onClick={() => handleLogoClick("admin-dashboard/addproduct")}
          />
          <FaRegUserCircle
            className="cursor-pointer hover:text-appColor transition duration-300"
            onClick={() => handleLogoClick("profile")}
          />
          <IoLogOutOutline
            className="cursor-pointer hover:text-appColor transition duration-300"
            onClick={handleLogout}
          />
        </div>
      </div>
    </nav>
  );
}

export default AdminNavbar;
