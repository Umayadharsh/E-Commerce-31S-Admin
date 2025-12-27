import React from "react";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets";

const Sidebar = () => {
  const linkBase =
    "group flex items-center gap-3 px-4 py-3 rounded-l-lg transition-all duration-300";

  const linkInactive =
    "border border-gray-200 border-r-0 text-gray-500 hover:text-black hover:bg-gray-50";

  const linkActive =
    "bg-black text-white border border-black border-r-0 shadow-lg";

  return (
    <aside className="w-[18%] min-h-screen bg-white border-r">
      {/* LOGO / TITLE */}
      <div className="h-20 flex items-center justify-center border-b">
        <h2 className="tracking-widest text-sm font-semibold">
          ADMIN PANEL
        </h2>
      </div>

      {/* NAV LINKS */}
      <div className="flex flex-col gap-2 pt-8 px-4 text-sm">
        {/* ADD ITEMS */}
        <NavLink
          to="/admin/add"
          className={({ isActive }) =>
            `${linkBase} ${isActive ? linkActive : linkInactive}`
          }
        >
          <img
            src={assets.add}
            className="w-5 h-5 transition-transform duration-300 group-hover:scale-110"
            alt=""
          />
          <span className="hidden md:block tracking-wide">
            Add Products
          </span>
        </NavLink>

        {/* LIST ITEMS */}
        <NavLink
          to="/admin/list"
          className={({ isActive }) =>
            `${linkBase} ${isActive ? linkActive : linkInactive}`
          }
        >
          <img
            src={assets.list}
            className="w-5 h-5 transition-transform duration-300 group-hover:scale-110"
            alt=""
          />
          <span className="hidden md:block tracking-wide">
            Newly added
          </span>
        </NavLink>

        {/* ORDERS */}
        <NavLink
          to="/admin/orders"
          className={({ isActive }) =>
            `${linkBase} ${isActive ? linkActive : linkInactive}`
          }
        >
          <img
            src={assets.order}
            className="w-5 h-5 transition-transform duration-300 group-hover:scale-110"
            alt=""
          />
          <span className="hidden md:block tracking-wide">
            Orders
          </span>
        </NavLink>
      </div>
    </aside>
  );
};

export default Sidebar;
