import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";
import { useParams, useNavigate } from "react-router-dom";

const Edit = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    gender: "",
    type: "",
    collection: "",
    bestseller: false,
  });

  const fetchProduct = async () => {
    try {
      const res = await axios.post(`${backendUrl}/api/product/single`, { id });
      if (res.data.success) {
        setFormData(res.data.product);
      }
    } catch {
      toast.error("Failed to load product");
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("adminToken");

    try {
      const res = await axios.post(
        `${backendUrl}/api/product/update`,
        { ...formData, id },
        { headers: { token } }
      );

      if (res.data.success) {
        toast.success("Product updated");
        navigate("/admin/list");
      }
    } catch {
      toast.error("Update failed");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-lg">
      <h2 className="text-xl font-semibold">Edit Product</h2>

      <input name="name" value={formData.name} onChange={handleChange} className="border p-2 w-full" />
      <input name="price" value={formData.price} onChange={handleChange} className="border p-2 w-full" />
      <textarea name="description" value={formData.description} onChange={handleChange} className="border p-2 w-full" />

      <select name="gender" value={formData.gender} onChange={handleChange} className="border p-2 w-full">
        <option value="men">Men</option>
        <option value="women">Women</option>
        <option value="unisex">Unisex</option>
      </select>

      <select name="type" value={formData.type} onChange={handleChange} className="border p-2 w-full">
        <option value="tshirt">Tshirt</option>
        <option value="hoodie">Hoodie</option>
        <option value="pendant">Pendant</option>
      </select>

      <button className="bg-black text-white px-6 py-2 rounded">
        UPDATE PRODUCT
      </button>
    </form>
  );
};

export default Edit;
