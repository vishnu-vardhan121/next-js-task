"use client";
import { useParams } from "next/navigation";
import React from "react";
import { useSelector } from "react-redux";

function EditProductPage() {
  const { id } = useParams();
  const { products } = useSelector((state) => state);
  console.log(products);

  return (
    <div>
      EditProductPage
      {id}
    </div>
  );
}

export default EditProductPage;
