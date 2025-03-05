import React from "react";
import Image from "next/image";

const features = [
  { id: 1, image: "featuresImages/image1.png", text: "Free Delivery" },
  { id: 2, image: "featuresImages/image2.png", text: "Money Back Guarantee" },
  { id: 3, image: "featuresImages/image3.png", text: "Always Support" },
  { id: 4, image: "featuresImages/image4.png", text: "Secure Payment" },
];

function FeatureSection() {
  return (
    <div className="flex flex-wrap justify-center md:justify-around items-center gap-8 mt-10 p-8">
      {features.map((feature) => (
        <div key={feature.id} className="flex flex-col items-center">
          <div className="bg-appColor animate-featuresAnimation shadow-lg md:shadow-xl lg:shadow-2xl rounded-full flex items-center justify-center w-20 h-20">
            <img
              src={feature.image}
              alt={feature.text}
              width={40}
              height={40}
            />
          </div>
          <h4 className="text-gray-700 text-sm md:text-lg font-medium mt-2">
            {feature.text}
          </h4>
        </div>
      ))}
    </div>
  );
}

export default FeatureSection;
