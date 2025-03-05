"use client";
import Link from "next/link";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signinAction } from "../../Redux/Features/usersSlice";
import Input from "@/app/components/Input";
import { useRouter } from "next/navigation";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "@/config/firebase";
import { toast } from "react-toastify";

function SigninPage() {
  const { user, loading, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password, confirmpassword } = e.target;

    if (password.value !== confirmpassword.value) {
      toast.error("Password and Confirm Password are not same");
      return;
    }

    const data = {
      name: name.value,
      email: email.value,
      password: password.value,
    };

    try {
      const response = await dispatch(
        signinAction({ data, email: email.value })
      ).unwrap();
      if (response) {
        router.push("/dashboard");
      }
    } catch (err) {
      console.error("Error adding user:", err);
    }
  };

  const handleGoogleSignin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const userData = {
        name: result.user.displayName,
        email: result.user.email,
        photo: result.user.photoURL,
      };
      if (userData) {
        const response = await dispatch(
          signinAction({ data: userData, email: userData.email })
        ).unwrap();
        if (response) {
          router.push("/dashboard");
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="w-full max-w-96 p-8 rounded-lg shadow-lg bg-white">
        <h1 className="text-center text-3xl font-bold text-gray-700 mb-6">
          Sign Up
        </h1>

        <form
          onSubmit={handleSubmit}
          method="post"
          className="flex flex-col gap-5"
        >
          <Input type="text" name="name" placeholder="Full Name" />
          <Input type="email" name="email" placeholder="Email Address" />
          <Input type="password" name="password" placeholder="Password" />
          <Input
            type="password"
            name="confirmpassword"
            placeholder="Confirm Password"
          />

          <button
            className="w-full h-12 bg-appColor hover:bg-blue-600 text-white font-bold rounded-lg shadow-md transition duration-300"
            type="submit"
          >
            {loading ? "Loading..." : "Sign Up"}
          </button>
          <div className="text-sm p-2 text-center">
            Have an account?{" "}
            <Link href="/login" className="text-blue-600">
              Login here
            </Link>
          </div>
        </form>
      </div>
      <div
        className="w-full max-w-96 flex justify-center items-center mt-4 rounded-lg shadow-lg bg-white p-3 cursor-pointer"
        onClick={handleGoogleSignin}
      >
        <img src="googlelog.png" alt="" className="w-7 h-7 " />
        <p className="ml-2 text-lg">Login with Google</p>
      </div>
    </div>
  );
}

export default SigninPage;
