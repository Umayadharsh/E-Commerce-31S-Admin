import React, { useState } from "react";
import axios from "axios";
import { assets } from "../assets/assets";
import { backendUrl } from "../App";
import { toast } from "react-toastify";

const Add = () => {
  const [images, setImages] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    bestseller: false,
    gender: "",
    type: "",
    collection: "",
  });

  // 🔹 INPUT CHANGE
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // 🔹 IMAGE CHANGE
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    if (files.length === 0) return;

    if (files.length > 4) {
      toast.error("Maximum 4 images allowed");
      return;
    }

    setImages(files);
    e.target.value = null;
  };

  // 🔹 SWAP IMAGES
  const swapImages = (from, to) => {
    const updated = [...images];
    [updated[from], updated[to]] = [updated[to], updated[from]];
    setImages(updated);
  };

  // 🔹 SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("adminToken");
    if (!token) {
      toast.error("Please login again");
      return;
    }

    if (images.length === 0) {
      toast.error("Please upload at least one image");
      return;
    }

    try {
      const data = new FormData();

      images.forEach((img) => data.append("images", img));

      Object.entries(formData).forEach(([key, value]) => {
        data.append(key, value);
      });

      const res = await axios.post(
        `${backendUrl}/api/product/add`,
        data,
        {
          headers: {
            token,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (res.data.success) {
        toast.success("Product added successfully");
        setFormData({
          name: "",
          price: "",
          description: "",
          bestseller: false,
          gender: "",
          type: "",
          collection: "",
        });
        setImages([]);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to add product");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* IMAGE UPLOAD */}
      <div>
        <p className="mb-2">Upload Images (1–4)</p>

        <label htmlFor="images" className="flex gap-3 flex-wrap cursor-pointer">
          {images.length > 0 ? (
            images.map((img, index) => (
              <img
                key={index}
                src={URL.createObjectURL(img)}
                className="w-24 h-24 object-cover border rounded"
              />
            ))
          ) : (
            <img
              src={assets.upload_area}
              alt="upload"
              className="w-32 h-32 border"
            />
          )}
        </label>

        <input
          type="file"
          id="images"
          multiple
          hidden
          accept="image/*"
          onChange={handleImageChange}
        />
      </div>

      {/* IMAGE ORDER */}
      <div className="flex gap-4">
        {images.map((img, index) => (
          <div key={index} className="relative">
            <img
              src={URL.createObjectURL(img)}
              className="w-24 h-24 object-cover rounded border"
            />

            {index > 0 && (
              <button
                type="button"
                onClick={() => swapImages(index, index - 1)}
                className="absolute -left-2 top-1/2 bg-white shadow px-1"
              >
                ←
              </button>
            )}

            {index < images.length - 1 && (
              <button
                type="button"
                onClick={() => swapImages(index, index + 1)}
                className="absolute -right-2 top-1/2 bg-white shadow px-1"
              >
                →
              </button>
            )}
          </div>
        ))}
      </div>

      {/* FORM FIELDS */}
      <input name="name" value={formData.name} onChange={handleChange} placeholder="Product Name" required className="w-full border p-2" />
      <input name="price" value={formData.price} onChange={handleChange} type="number" placeholder="Price" required className="w-full border p-2" />
      <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" required className="w-full border p-2" />

      <select name="gender" value={formData.gender} onChange={handleChange} required className="w-full border p-2">
        <option value="">Select Gender</option>
        <option value="Men">Men</option>
        <option value="Women">Women</option>
        <option value="Unisex">Unisex</option>
      </select>

      <select name="type" value={formData.type} onChange={handleChange} required className="w-full border p-2">
        <option value="">Select Type</option>
        <option value="chain">Chain</option>
        <option value="pendant">Pendant</option>
        <option value="bracelet">Bracelet</option>
      </select>

      <select name="collection" value={formData.collection} onChange={handleChange} required className="w-full border p-2">
        <option value="">Select Collection</option>
        <option value="classic">Classic</option>
        <option value="minimal">Minimal</option>
        <option value="pendant">Pendant</option>
      </select>

      <label className="flex gap-2 items-center">
        <input type="checkbox" name="bestseller" checked={formData.bestseller} onChange={handleChange} />
        Bestseller
      </label>

      <button type="submit" className="bg-black text-white px-6 py-2 rounded">
        ADD PRODUCT
      </button>
    </form>
  );
};

export default Add;
