import { useRouter } from "next/navigation";
import React from "react";
import { FaEdit } from "react-icons/fa";
import { useSelector } from "react-redux";

function AdminProducts() {
  const { products } = useSelector((state) => state.products);
  console.log(products);
  const router = useRouter();
  const handleEdit = (id) => {
    router.push("admin-dashboard/products/" + id);
  };
  return (
    <div className="mx-auto px-4 py-6">
      {products &&
        Object.keys(products).map((category) => {
          return (
            <>
              <p className="uppercase text-xl font-bold my-4">{category}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {products[category].length > 0 &&
                  products[category].map((item, id) => (
                    <div
                      key={id}
                      className="bg-white rounded-md shadow-md overflow-hidden transform transition duration-300 hover:scale-105"
                    >
                      <div className="w-full h-48">
                        <img
                          src={item.photos[0]}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="text-lg font-semibold">{item.name}</h3>
                        <span className="flex">
                          <span>
                            <p className="text-gray-600 font-semibold">
                              {item.brand}
                            </p>
                            <p className="text-appColor font-bold">
                              ₹{item.price}
                            </p>
                          </span>
                          <p className="flex w-full  justify-end">
                            <FaEdit
                              className="text-2xl text-appColor hover:text-lime-500 "
                              onClick={() => {
                                handleEdit(item.id);
                              }}
                            />
                          </p>
                        </span>
                      </div>
                    </div>
                  ))}
              </div>
            </>
          );
        })}
    </div>
  );
}

export default AdminProducts;
