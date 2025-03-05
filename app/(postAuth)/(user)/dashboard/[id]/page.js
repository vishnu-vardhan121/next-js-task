"use client";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import Footer from "@/app/components/Footer";
import { AddToCarAction } from "@/app/Redux/Features/cartSlice";
import { IoMdHeartEmpty, IoMdHeart } from "react-icons/io";
import {
  addToLikedAction,
  removeLikeAction,
} from "@/app/Redux/Features/likedSlice";
import WithAuth from "@/app/components/withAuth";

function ProductPage() {
  const [state, setState] = useState({
    product: null,
    currentImage: 0,
    likedd: false,
  });

  const { products, user, liked } = useSelector((state) => state);
  const { id } = useParams();
  const router = useRouter();
  const dispatch = useDispatch();
  useEffect(() => {
    if (!user.user) {
      router.push("/login");
    }
  }, [user]);

  useEffect(() => {
    if (id && products.products.length > 0) {
      const product = products.products.find((val) => val.id === id);
      setState((prev) => ({ ...prev, product }));
    }
    console.log(liked);

    setState((prev) => ({
      ...prev,
      likedd: liked.liked.some((item) => item.id === id),
    }));
  }, [id, products, liked]);

  const handleSelect = (i) => {
    setState((prev) => ({ ...prev, currentImage: i }));
  };

  const handleAddToCart = async () => {
    await dispatch(
      AddToCarAction({ userId: user.user.email, data: state.product })
    );
  };

  const handleLike = async () => {
    if (state.likedd) {
      await dispatch(
        removeLikeAction({ userId: user.user.email, data: state.product })
      );
    } else {
      await dispatch(
        addToLikedAction({ userId: user.user.email, data: state.product })
      );

      setState((prev) => ({ ...prev, likedd: !prev.likedd }));
    }
  };

  return (
    <div>
      {state?.product ? (
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex relative flex-col items-center md:w-1/2 p-5">
            <div
              className="absolute top-5 right-5 sm:right-11 text-4xl cursor-pointer transition"
              onClick={handleLike}
            >
              {state.likedd ? (
                <IoMdHeart className="text-red-500" />
              ) : (
                <IoMdHeartEmpty className="text-slate-600 hover:text-red-500" />
              )}
            </div>

            <Image
              src={state.product.photos[state.currentImage]}
              width={100}
              height={100}
              className="w-full max-w-[400px] rounded-sm shadow-lg object-cover"
              alt={state.product.name}
            />

            <div className="flex mt-4 gap-3 overflow-x-auto">
              {state.product.photos.map((val, i) => (
                <button
                  key={i}
                  onClick={() => handleSelect(i)}
                  className={`border rounded-lg transition-all ${
                    state.currentImage === i
                      ? "border-appColor shadow-md"
                      : "border-gray-300"
                  }`}
                >
                  <Image
                    src={val}
                    width={60}
                    height={60}
                    className="rounded-md object-cover"
                    alt={state.product.name}
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="md:w-1/2 space-y-4 p-3">
            <h1 className="text-2xl md:text-3xl font-bold">
              {state.product.name}
            </h1>
            <h4 className="text-lg md:text-xl text-gray-500 font-mono">
              {state.product.brand}
            </h4>
            <h3 className="text-lg font-semibold">
              Price:{" "}
              <span className="text-appColor">Rs {state.product.price}</span>
            </h3>

            <div>
              <h3 className="font-semibold">Description</h3>
              <p className="text-gray-700">{state.product.description}</p>
            </div>

            <button
              className="w-96 md:w-1/2 py-2 my-3 bg-appColor text-white rounded-lg shadow-md hover:shadow-lg transition"
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>
          </div>
        </div>
      ) : (
        <p className="text-center text-lg">Loading...</p>
      )}

      <Footer />
    </div>
  );
}

export default ProductPage;
