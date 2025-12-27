import React, { useState } from "react";
import axios from "axios";
import { assets } from "../assets/assets";
import { backendUrl } from "../App";
import { toast } from "react-toastify";

const Add = () => {
  // ✅ MULTIPLE IMAGES
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

  // ✅ Handle input change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // ✅ Handle image selection
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    if (files.length === 0) return;

    if (files.length > 4) {
      toast.error("Maximum 4 images allowed");
      e.target.value = null;
      return;
    }

    setImages(files);
    e.target.value = null;
  };

  const swapImages = (from, to) => {
  const updated = [...images];
  [updated[from], updated[to]] = [updated[to], updated[from]];
  setImages(updated);
};


  // ✅ Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("adminToken");
    if (!token) {
      toast.error("Please login again");
      return;
    }

    if (!images || images.length < 1) {
      toast.error("Please upload at least one image");
      return;
    }

    const data = new FormData();

    // ✅ APPEND IMAGES ONLY ONCE
    images.forEach((img) => {
      data.append("images", img);
    });

    data.append("name", formData.name);
    data.append("price", formData.price);
    data.append("description", formData.description);
    data.append("bestseller", formData.bestseller);
    data.append("gender", formData.gender);
    data.append("type", formData.type);
    data.append("collection", formData.collection);

    try {
      const res = await axios.post(
        `${backendUrl}/api/product/add`,
        data,
        {
          headers: { token },
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
      toast.error("Something went wrong");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* IMAGE UPLOAD */}
      <div>
        <p className="mb-2">Upload Images (1–4)</p>

        <label
          htmlFor="images"
          className="flex gap-3 flex-wrap cursor-pointer"
        >
          {images.length > 0 ? (
            images.map((img, index) => (
              <img
                key={index}
                src={URL.createObjectURL(img)}
                alt="preview"
                className="w-24 h-24 object-cover border rounded"
              />
            ))
          ) : (
            <img
              src={assets.upload_area}
              alt="upload"
              className="w-32 h-32 object-cover border"
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

      <div className="flex gap-4 mt-4">
  {images.map((img, index) => (
    <div key={index} className="relative">
      <img
        src={URL.createObjectURL(img)}
        className="w-24 h-24 object-cover rounded border"
      />

      {/* MOVE LEFT */}
      {index > 0 && (
        <button
          onClick={() => swapImages(index, index - 1)}
          className="absolute -left-2 top-1/2 bg-white shadow px-1"
        >
          ←
        </button>
      )}

      {/* MOVE RIGHT */}
      {index < images.length - 1 && (
        <button
          onClick={() => swapImages(index, index + 1)}
          className="absolute -right-2 top-1/2 bg-white shadow px-1"
        >
          →
        </button>
      )}
    </div>
  ))}
</div>


      {/* NAME */}
      <div>
        <p>Product Name</p>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full border px-3 py-2"
          required
        />
      </div>

      {/* PRICE */}
      <div>
        <p>Price</p>
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          className="w-full border px-3 py-2"
          required
        />
      </div>

      {/* DESCRIPTION */}
      <div>
        <p>Description</p>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="w-full border px-3 py-2"
          required
        />
      </div>

      {/* GENDER */}
      <div>
        <p>Gender</p>
        <select
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          className="w-full border px-3 py-2"
          required
        >
          <option value="">Select</option>
          <option value="Men">Men</option>
          <option value="Women">Women</option>
          <option value="Unisex">Unisex</option>
        </select>
      </div>

      {/* TYPE */}
      <div>
        <p>Type</p>
        <select
          name="type"
          value={formData.type}
          onChange={handleChange}
          className="w-full border px-3 py-2"
          required
        >
          <option value="">Select</option>
          <option value="chain">Chain</option>
          <option value="pendant">Pendant</option>
          <option value="bracelet">Bracelet</option>
        </select>
      </div>

      {/* BESTSELLER */}
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          name="bestseller"
          checked={formData.bestseller}
          onChange={handleChange}
        />
        <label>Bestseller</label>
      </div>

      {/* COLLECTION */}
      <div>
        <p>Collection</p>
        <select
          name="collection"
          value={formData.collection}
          onChange={handleChange}
          className="w-full border px-3 py-2"
          required
        >
          <option value="">Select</option>
          <option value="classic">Classic</option>
          <option value="minimal">Minimal</option>
          <option value="pendant">Pendant</option>
        </select>
      </div>

      <button
        type="submit"
        className="bg-black text-white px-6 py-2 rounded"
      >
        ADD PRODUCT
      </button>
    </form>
  );
};

export default Add;
