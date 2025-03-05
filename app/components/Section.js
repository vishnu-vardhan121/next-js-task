import React from "react";
import ProductCard from "./ProductCard";

function Section({ section, products, type }) {
  return (
    <>
      <h2 className="text-2xl font-medium ml-5 sm:ml-0 md:ml-16">{section}</h2>
      <div className="flex flex-wrap w-full justify-center p-2 ">
        {products.map((product, i) => (
          <ProductCard
            key={product.id}
            src={product.preview}
            name={product.name}
            brand={product.brand}
            price={product.price}
            id={product.id}
          />
        ))}
      </div>
    </>
  );
}

export default Section;
