"use client";
import { AddProductAction } from "@/app/Redux/Features/productsSlice";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Select from "react-select";
const options = [
  { value: "accessories", label: "Accessories" },
  { value: "clothes", label: "Clothes" },
  { value: "footwear", label: "Footwear" },
  { value: "mobiles", label: "Mobiles" },
  { value: "electronics", label: "Electronics" },
  { value: "home-furniture", label: "Home & Furniture" },
];

function AddProduct() {
  const { user } = useSelector((state) => state.user);
  const { products } = useSelector((state) => state.products);
  const [images, setImages] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    category: "footwear",
    brand: "",
    price: "",
    description: "",
    photos: [],
  });
  console.log("user", products);

  const dispatch = useDispatch();

  // Handle form input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleOptionChange = (optionSelcted) => {
    setFormData((pre) => ({ ...pre, category: optionSelcted.value }));
  };
  // Handle image selection
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const validImages = files.filter((file) => file.type.startsWith("image/"));

    if (validImages.length !== files.length) {
      toast.error("Only image files are allowed!");
    }

    const imagePreviews = validImages.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    setImages(imagePreviews);
  };

  // Cleanup object URLs to prevent memory leaks
  useEffect(() => {
    return () => {
      images.forEach((img) => URL.revokeObjectURL(img.preview));
    };
  }, [images]);

  // Upload images to Cloudinary
  const handleUpload = async () => {
    if (images.length === 0) {
      toast.error("Please select images first!");
      return [];
    }

    const cloudinaryUploadURL = `https://api.cloudinary.com/v1_1/dxecmnxg6/image/upload`;

    try {
      const uploadedImageLinks = await Promise.all(
        images.map(async (image) => {
          const uploadData = new FormData();
          uploadData.append("file", image.file);
          uploadData.append("upload_preset", "dashboard");
          uploadData.append("cloud_name", "dxecmnxg6");

          const response = await axios.post(cloudinaryUploadURL, uploadData);
          return response.data.secure_url;
        })
      );

      return uploadedImageLinks;
    } catch (error) {
      toast.error("Image upload failed!");
      return [];
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (images.length === 0) {
      toast.error("Please select images first!");
      return;
    }

    const uploadedImageLinks = await handleUpload();
    if (uploadedImageLinks.length === 0) {
      toast.error("Image upload failed!");
      return;
    }

    const updatedFormData = { ...formData, photos: uploadedImageLinks };

    await dispatch(
      AddProductAction({
        data: updatedFormData,
        userId: user.email,
      })
    );

    toast.success("Product added successfully!");
    setFormData({
      name: "",
      category: "footwear",
      brand: "",
      price: "",
      description: "",
      photos: [],
    });
    setImages([]);
  };

  return (
    <div>
      <p className="sm:text-xl font-semibold">Add Product</p>
      <form className="" onSubmit={handleSubmit}>
        <div className="md:flex md:justify-stretch">
          <div className="md:w-1/2 md:space-y-6 space-y-3 md:p-4">
            {/* Product name */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Product Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Category
              </label>
              <Select
                options={options}
                value={options.find((opt) => opt.value === formData.category)}
                onChange={handleOptionChange}
                className="mt-1 block w-full"
              />
            </div>
            {/* Brand */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Brand
              </label>
              <input
                type="text"
                name="brand"
                value={formData.brand}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
            </div>
          </div>

          <div className="md:w-1/2 md:space-y-6 space-y-3 md:p-4">
            {/* Price */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Price
              </label>
              <input
                type="text"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
            </div>

            {/* Image upload */}
            <div>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageChange}
                className="mt-2 border p-2"
              />

              {/* Display Image Previews */}
              {images.length > 0 && (
                <div className="flex gap-2 flex-wrap mt-4">
                  {images.map((img, index) => (
                    <div key={index} className="w-24 h-24 border rounded-lg">
                      <img
                        src={img.preview}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            className="mt-4 w-full bg-appColor hover:bg-green-600 text-white py-2 rounded md:w-1/2"
          >
            Add Product
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddProduct;
