"use client";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Footer from "@/app/components/Footer";
import WithAuth from "@/app/components/withAuth";

function ProfilePage() {
  const { user, cart, liked } = useSelector((st) => st);
  const router = useRouter();

  useEffect(() => {
    if (!user?.user?.email) {
      router.push("/login");
    }
  }, [user, router]);

  const name = user?.user?.name || "Guest";
  const mobile = user?.user?.mobile || "N/A";

  const handleWishItemClick = (id) => {
    router.push("/dashboard/" + id);
  };

  return (
    <div className=" mx-auto p-6 bg-gray-100 ">
      <h2 className="text-2xl font-semibold text-gray-800">{name}</h2>
      <h3 className="text-lg text-gray-600">{mobile}</h3>

      <div className="mt-6">
        <h4 className="text-xl font-bold text-gray-700">Wish List</h4>
        <div className="flex overflow-x-auto space-x-4 mt-4 p-2 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
          {liked?.liked?.length > 0 ? (
            liked.liked.map((item, ind) => (
              <div
                key={ind}
                onClick={() => handleWishItemClick(item.id)}
                className="p-4 bg-white rounded-lg shadow cursor-pointer hover:shadow-lg transition flex-shrink-0 w-40 sm:w-60 "
              >
                <Image
                  src={item.preview}
                  width={150}
                  height={150}
                  alt={item.brand}
                  className="rounded-sm"
                />
                <h3 className="text-lg font-medium text-gray-800 mt-2">
                  {item.name.slice(0, 20) + "..."}
                </h3>
                <h5 className="text-gray-600">{item.brand}</h5>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No items in wish list.</p>
          )}
        </div>
      </div>

      <div className="mt-6">
        <h4 className="text-xl font-bold text-gray-700">Your Cart</h4>
        <div className="flex overflow-x-auto space-x-4 mt-4 p-2 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
          {cart?.cart?.length > 0 ? (
            cart.cart.map((item, ind) => (
              <div
                key={ind}
                className="p-4 bg-white rounded-lg shadow hover:shadow-lg transition flex-shrink-0 w-40 sm:w-60"
              >
                <Image
                  src={item.preview}
                  width={150}
                  height={150}
                  alt={item.brand}
                  className="rounded-lg"
                />
                <h3 className="text-lg font-medium text-gray-800 mt-2">
                  {item.name.slice(0, 20) + "..."}
                </h3>
                <h5 className="text-gray-600">{item.brand}</h5>
              </div>
            ))
          ) : (
            <p className="text-gray-500">Your cart is empty.</p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default WithAuth(ProfilePage);
