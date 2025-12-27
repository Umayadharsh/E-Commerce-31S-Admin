import React from "react";
import AdminLayout from "../components/AdminLayout";

const Users = () => {
  return (
    <AdminLayout>
      <h1 className="tracking-widest mb-6">USERS</h1>

      <div className="bg-white shadow p-4">
        <p className="text-sm text-gray-500">No users yet</p>
      </div>
    </AdminLayout>
  );
};

export default Users;
