import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl } from "../App"; 
import { toast } from "react-toastify";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  // 🔹 FETCH ALL ORDERS
  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("adminToken");

      const res = await axios.get(
        `${backendUrl}/api/order/list`,
        {
          headers: { token },
        }
      );

      if (res.data.success) {
        setOrders(res.data.orders);
      }
    } catch (error) {
      toast.error("Failed to load orders");
    }
  };

  // 🔹 UPDATE ORDER STATUS
  const updateStatus = async (orderId, status) => {
    try {
      const token = localStorage.getItem("adminToken");

      const res = await axios.post(
        `${backendUrl}/api/order/status`,
        { orderId, status },
        { headers: { token } }
      );

      if (res.data.success) {
        toast.success("Order status updated");
        fetchOrders(); // 🔥 refresh list
      }
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">All Orders</h2>

      {orders.length === 0 ? (
        <p>No orders yet</p>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order._id}
              className="border p-4 rounded bg-white"
            >
              {/* HEADER */}
              <div className="flex justify-between mb-2">
                <p className="font-medium">
                  Order #{order._id.slice(-6)}
                </p>
                <span className="text-sm text-gray-500">
                  {new Date(order.createdAt).toLocaleString()}
                </span>
              </div>

              {/* USER */}
              <p className="text-sm">
                <strong>User:</strong>{" "}
                {order.userId?.name} ({order.userId?.email})
              </p>

              {/* TOTAL */}
              <p className="text-sm">
                <strong>Total:</strong> ₹{order.amount}
              </p>

              {/* STATUS */}
              <div className="text-sm mt-2">
                <strong>Status:</strong>{" "}
                <select
                  value={order.orderStatus}
                  onChange={(e) =>
                    updateStatus(order._id, e.target.value)
                  }
                  className="border ml-2 px-2 py-1 text-sm"
                >
                  <option value="Pending">Placed</option>
                  <option value="Processing">Processing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </div>

              {/* ITEMS */}
              <div className="mt-3">
                <p className="font-medium mb-1">Items:</p>
                {order.items.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 text-sm mb-1"
                  >
                    <img
                      src={item.images}
                      className="w-10 h-10 object-cover"
                      alt=""
                    />
                    <span>{item.name}</span>
                    <span>x{item.quantity}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
