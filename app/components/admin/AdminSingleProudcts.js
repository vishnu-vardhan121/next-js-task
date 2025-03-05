import React, { useState } from "react";
import { useSelector } from "react-redux";

function AdminSingleProudct() {
  const { products } = useSelector((state) => state.products);
  const [state, setState] = useState({
    product: null,
    currentImage: 0,
    likedd: false,
  });
  console.log(products);
  const handleSelect = (i) => {
    setState((prev) => ({ ...prev, currentImage: i }));
  };

  return (
    <div>
      {products[0] ? (
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex relative flex-col items-center md:w-1/2 p-5">
            <img
              src={products[0].photos[state.currentImage]}
              width={100}
              height={100}
              className="w-full max-w-[400px] rounded-sm shadow-lg object-cover"
              alt={products[0].name}
            />

            <div className="flex mt-4 gap-3 overflow-x-auto">
              {products[0].photos.map((val, i) => (
                <button
                  key={i}
                  onClick={() => handleSelect(i)}
                  className={`border rounded-lg transition-all ${
                    state.currentImage === i
                      ? "border-appColor shadow-md"
                      : "border-gray-300"
                  }`}
                >
                  <img
                    src={val}
                    width={60}
                    height={60}
                    className="rounded-md object-cover"
                    alt={products[0].name}
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="md:w-1/2 space-y-4 p-3">
            <h1 className="text-2xl md:text-3xl font-bold">
              {products[0].name}
            </h1>
            <h4 className="text-lg md:text-xl text-gray-500 font-mono">
              {products[0].brand}
            </h4>
            <h3 className="text-lg font-semibold">
              Price:{" "}
              <span className="text-appColor">Rs {products[0].price}</span>
            </h3>

            <div>
              <h3 className="font-semibold">Description</h3>
              <p className="text-gray-700">{products[0].description}</p>
            </div>
          </div>
        </div>
      ) : (
        <p className="text-center text-lg">Loading...</p>
      )}
    </div>
  );
}

export default AdminSingleProudct;
