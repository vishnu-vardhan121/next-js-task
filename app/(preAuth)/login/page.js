"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginAction } from "../../Redux/Features/usersSlice";
import { useRouter } from "next/navigation";
import Input from "@/app/components/Input";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "@/config/firebase";

function LoginPage() {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push("/dashboard");
    }
  }, [user, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = e.target.email.value.trim();
    const password = e.target.password.value.trim();

    if (!email || !password) {
      setErrorMessage("Both email and password are required.");
      return;
    }

    try {
      const response = await dispatch(
        loginAction({ email, password, type: "password" })
      ).unwrap();
      if (response.role == "user") {
        router.push("/dashboard");
      } else if (response.role == "admin") {
        router.push("/admin-dashboard");
      }
      toast.success("Login Successful!");
    } catch (error) {
      console.error("Login Failed:", error);

      toast.error(error, "error"); // Show error as toast notification
    }
  };

  const handlleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const userData = {
        name: result.user.displayName,
        email: result.user.email,
        photo: result.user.photoURL,
      };

      if (userData) {
        const response = await dispatch(
          loginAction({ email: userData.email, type: "google" })
        ).unwrap();

        if (response.role == "user") {
          router.push("/dashboard");
        } else if (response.role == "admin") {
          router.push("/admin-dashboard");
        }
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="w-[97%] max-w-md p-8 rounded-lg shadow-lg bg-white">
        <h1 className="text-center text-3xl font-bold text-gray-700 mb-6">
          Login
        </h1>

        <form
          onSubmit={handleSubmit}
          method="POST"
          className="flex flex-col gap-5"
        >
          <Input
            type="email"
            name="email"
            placeholder="Email Address"
            required
          />
          <Input
            type="password"
            name="password"
            placeholder="Password"
            required
          />
          <button
            className="w-full h-12 bg-appColor hover:bg-blue-600 text-white font-bold rounded-lg shadow-md transition duration-300"
            type="submit"
          >
            Login
          </button>

          <div className="text-sm p-2">
            Don't have an account?{" "}
            <Link href="/signin" className="text-blue-600">
              Register here
            </Link>
          </div>
        </form>
      </div>
      <div
        className="w-full max-w-md flex justify-center items-center mt-4 rounded-lg shadow-lg bg-white p-3 cursor-pointer"
        onClick={handlleGoogleLogin}
      >
        <img src="googlelog.png" alt="" className="w-7 h-7 " />
        <p className="ml-2 text-lg">Login with Google</p>
      </div>
    </div>
  );
}

export default LoginPage;
