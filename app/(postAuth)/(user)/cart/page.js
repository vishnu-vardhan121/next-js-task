"use client";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Image from "next/image";
import { CiCircleRemove } from "react-icons/ci";
import {
  fetchCartAction,
  removeFromCartAction,
} from "@/app/Redux/Features/cartSlice";
import WithAuth from "@/app/components/withAuth";

function Cart() {
  const { cart, user } = useSelector((state) => state);
  const dispatch = useDispatch();

  const totalCost =
    cart?.cart.reduce((sum, product) => sum + product.price, 0) || 0;

  const handleRemoveFromCart = (product) => {
    dispatch(
      removeFromCartAction({ userId: user?.user?.email, data: product })
    );
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h3 className="text-2xl font-bold text-center mb-6">Shopping Cart</h3>

      {cart?.cart.length > 0 ? (
        <div className="bg-white shadow-md rounded-lg p-5 space-y-4">
          {cart?.cart.map((product, ind) => (
            <div
              key={ind}
              className="flex items-center gap-4 border-b pb-4 last:border-b-0"
            >
              <Image
                src={product.preview}
                width={80}
                height={80}
                className="rounded-md shadow"
                alt={product.name}
              />

              <div className="flex-1">
                <div className="text-lg font-semibold">{product.name}</div>
                <div className="text-gray-500">{product.brand}</div>
                <div className="text-appColor font-bold">
                  Rs {product.price}
                </div>
              </div>

              <div
                className="text-4xl hover:text-red-600 cursor-pointer text-red-300 transition"
                onClick={() => handleRemoveFromCart(product)}
              >
                <CiCircleRemove />
              </div>
            </div>
          ))}

          <div className="flex justify-between items-center font-semibold text-lg mt-5 border-t pt-4">
            <span>Total Cost:</span>
            <span className="text-appColor">Rs {totalCost}</span>
          </div>
        </div>
      ) : (
        <p className="text-center text-lg text-gray-500">Your cart is empty.</p>
      )}
    </div>
  );
}

export default WithAuth(Cart);
