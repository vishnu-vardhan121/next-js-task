import React from "react";
import Image from "next/image";
import Link from "next/link";
function ProductCard({ src, name, brand, price, id }) {
  return (
    <div className="w-[15%] min-w-[200px] mt-8 ml-3 mb-8 mr-3 pointer p-2 shadow-[0_2px_10px_rgba(0,0,0,0.3)]">
      <Link href={`dashboard/${id}`}>
        <div className="w-full">
          <Image
            src={src}
            width={100}
            height={100}
            alt={name}
            className="w-full"
          />
        </div>
        <div className="p-1">
          <h3 className=" ">{name}</h3>
          <h4 className="text-sm text-slate-400 p-3 font-semibold">{brand}</h4>
          <h5 className="text-appColor font-bold">Rs {price}</h5>
        </div>{" "}
      </Link>
    </div>
  );
}

export default ProductCard;
