"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";
import axios from "axios";
import FeatureSection from "@/app/components/FeatureSection";
import Section from "@/app/components/Section";

import { setProducts } from "@/app/Redux/Features/productsSlice";
import WithAuth from "@/app/components/withAuth";
import Footer from "@/app/components/Footer";
const settings = {
  dots: true,
  infinite: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  speed: 1000,
  autoplaySpeed: 2000,
  cssEase: "linear",
};

function Dashboard() {
  const [products, setProductss] = useState({});
  const { user } = useSelector((state) => state); // Ensure correct state structure
  const dispatch = useDispatch();
  const router = useRouter();
  useEffect(() => {
    if (user.user === null || user.user?.email == null) {
      router.push("/login");
    }
  }, [user.user]);

  // useEffect(() => {
  //   const fetchProducts = async () => {
  //     try {
  //       const res = await axios.get(
  //         "https://5d76bf96515d1a0014085cf9.mockapi.io/product"
  //       );
  //       const data = res.data;

  //       let devidedData = {
  //         accessory: [],
  //         nonaccessory: [],
  //       };

  //       data.forEach((val) => {
  //         val.isAccessory
  //           ? devidedData.accessory.push(val)
  //           : devidedData.nonaccessory.push(val);
  //       });

  //       setProductss(devidedData);
  //       dispatch(setProducts(data));
  //     } catch (error) {
  //       console.error("Error fetching products:", error);
  //     }
  //   };

  //   fetchProducts();
  // }, []);

  return (
    <div className="w-full overflow-x-hidden">
      <div className="slider-container mt-2">
        <Slider {...settings} className="w">
          {[
            "carouselImages/image1.png",
            "carouselImages/image2.png",
            "carouselImages/image3.png",
            "carouselImages/image4.png",
          ].map((img, index) => (
            <div key={index} className="w-full">
              <img src={img} alt={`Slide ${index + 1}`} className="w-full" />
            </div>
          ))}
        </Slider>
      </div>

      <FeatureSection />

      {products.accessory && products.nonaccessory && (
        <>
          <Section
            section="Clothing for Men and Women"
            products={products.nonaccessory}
            type="nonAccessory"
          />
          <Section
            section="Accessories for Men and Women"
            products={products.accessory}
            type="Accessory"
          />
        </>
      )}
      <Footer />
    </div>
  );
}

export default WithAuth(Dashboard);
