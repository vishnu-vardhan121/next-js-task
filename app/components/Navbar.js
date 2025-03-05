"use client";
import React from "react";
import { IoLogOutOutline, IoSearch } from "react-icons/io5";
import { FaCartShopping } from "react-icons/fa6";
import { FaRegUserCircle } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { logOutAction } from "../Redux/Features/usersSlice";
import { persistor } from "../Redux/store";
import { useRouter } from "next/navigation";

function Navbar() {
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
          onClick={() => handleLogoClick("dashboard")}
        >
          <span className="text-appColor">SHOP</span>
          <span>LANE</span>
        </div>

        <ul className="hidden md:flex space-x-8 text-lg font-medium">
          <li className="hover:text-appColor transition duration-300 cursor-pointer">
            HOME
          </li>
          <li className="hover:text-appColor transition duration-300 cursor-pointer">
            CLOTHING
          </li>
          <li className="hover:text-appColor transition duration-300 cursor-pointer">
            ACCESSORIES
          </li>
        </ul>

        <div className="flex items-center space-x-6 text-2xl">
          <IoSearch className="cursor-pointer hover:text-appColor transition duration-300" />
          <FaCartShopping
            className="cursor-pointer hover:text-appColor transition duration-300"
            onClick={() => handleLogoClick("cart")}
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

export default Navbar;
