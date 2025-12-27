import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";

const List = () => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${backendUrl}/api/product/list`);
      if (res.data.success) {
        setProducts(res.data.products);
      }
    } catch {
      toast.error("Failed to load products");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // 🔥 DELETE PRODUCT
  const deleteProduct = async (id) => {
    const confirm = window.confirm("Are you sure?");
    if (!confirm) return;

    try {
      const token = localStorage.getItem("adminToken");

      const res = await axios.post(
        `${backendUrl}/api/product/remove`,
        { id },
        {
          headers: { token },
        }
      );

      if (res.data.success) {
        toast.success("Product deleted");
        fetchProducts(); // refresh list
      } else {
        toast.error(res.data.message);
      }
    } catch {
      toast.error("Delete failed");
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">All Products</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map((item) => (
          <div key={item._id} className="border p-4 rounded bg-white">
            <img
              src={item.images?.[0]}
              alt={item.name}
              className="w-full h-40 object-cover mb-2"
            />

            <h3 className="font-medium">{item.name}</h3>
            <p className="text-sm text-gray-500">
              {item.gender} • {item.type}
            </p>
            <p className="font-semibold mt-1">₹{item.price}</p>

            <div className="flex gap-3 mt-3">
              <button
                onClick={() => deleteProduct(item._id)}
                className="text-red-600 text-sm"
              >
                Delete
              </button>

              <a
                href={`/admin/edit/${item._id}`}
                className="text-blue-600 text-sm"
              >
                Edit
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default List;
