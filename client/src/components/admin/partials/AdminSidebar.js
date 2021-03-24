import React, { Fragment } from "react";
import { useLocation, useHistory } from "react-router-dom";

const AdminSidebar = (props) => {
  const location = useLocation();
  const history = useHistory();

  return (
    <Fragment>
      <div
        style={{ boxShadow: "1px 1px 8px 0.2px #aaaaaa",position:"fixed",zIndex:999,marginTop:'6%' }}
        id="sidebar"
        className="hidden md:block sticky top-0 left-0 h-screen md:w-2/12 lg:w-1/12 sidebarShadow bg-white"
      >
        <div
          onClick={(e) => history.push("/admin/dashboard")}
          className={`${
            location.pathname === "/admin/dashboard"
              ? "border-r-4 border-green-700 bg-green-500 text-white"
              : ""
          } hover:bg-green-400 cursor-pointer flex flex-col items-center justify-center py-2`}
        >
          <span>
            <svg
              className="w-8 h-8 text-gray-600 hover:text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </span>
          <span className="hover:text-white">Dashboard</span>
        </div>
        <hr className="border-b border-gray-200" />
        <div
          onClick={(e) => history.push("/admin/dashboard/categories")}
          className={`${
            location.pathname === "/admin/dashboard/categories"
              ? "border-r-4 border-green-700 bg-green-500 text-white"
              : ""
          } hover:bg-green-400  cursor-pointer flex flex-col items-center justify-center py-2`}
        >
          <span>
            <svg
              className="w-8 h-8 text-gray-600 hover:text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
              />
            </svg>
          </span>
          <span className="hover:text-white">Categories</span>
        </div>
        <hr className="border-b border-gray-200" />
        <div
          onClick={(e) => history.push("/admin/dashboard/products")}
          className={`${
            location.pathname === "/admin/dashboard/products"
              ? "border-r-4 border-green-700 bg-green-500 text-white"
              : ""
          } hover:bg-green-400 cursor-pointer flex flex-col items-center justify-center py-2`}
        >
          <span>
            <svg
              className="w-8 h-8 text-gray-600 hover:text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
              />
            </svg>
          </span>
          <span className="hover:text-white">Product</span>
        </div>
        <hr className="border-b border-gray-200" />
        <div
          onClick={(e) => history.push("/admin/dashboard/orders")}
          className={`${
            location.pathname === "/admin/dashboard/orders"
              ? "border-r-4 border-green-700 bg-green-500 text-white"
              : ""
          } hover:bg-green-400 cursor-pointer flex flex-col items-center justify-center py-2`}
        >
          <span>
            <svg
              className="w-8 h-8 text-gray-600 hover:text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
              />
            </svg>
          </span>
          <span className="hover:text-white">Order</span>
        </div> 
        <hr className="border-b border-gray-200" />
         <div
          onClick={(e) => history.push("/admin/dashboard/subscriptions")}
          className={`${
            location.pathname === "/admin/dashboard/subscriptions"
              ? "border-r-4 border-green-700 bg-green-500 text-white"
              : ""
          } hover:bg-green-400 cursor-pointer flex flex-col items-center justify-center py-2`}
        >
          <span>
            <svg
              className="w-8 h-8 text-gray-600 hover:text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
              />
            </svg>
          </span>
          <span className="hover:text-white">Subscriptions</span>
        </div>
        <hr className="border-b border-gray-200" />
        <div
          onClick={(e) => history.push("/admin/dashboard/subpacks")}
          className={`${
            location.pathname === "/admin/dashboard/subpacks"
              ? "border-r-4 border-green-700 bg-green-500 text-white"
              : ""
          } hover:bg-green-400 cursor-pointer flex flex-col items-center justify-center py-2`}
        >
          <span>
            <svg
              className="w-8 h-8 text-gray-600 hover:text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
              />
            </svg>
          </span>
          <span className="hover:text-white">Subpacks</span>
        </div>
        <hr className="border-b border-gray-200" />

        <div
          onClick={(e) => history.push("/admin/dashboard/deliveryboys")}
          className={`${
            location.pathname === "/admin/dashboard/deliveryboys"
              ? "border-r-4 border-green-700 bg-green-500 text-white"
              : ""
          } hover:bg-green-400 cursor-pointer flex flex-col items-center justify-center py-2`}
        >
          <span>
            <svg
              className="w-8 h-8 text-gray-600 hover:text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
              />
            </svg>
          </span>
          <span className="hover:text-white">Delivery Boys</span>
        </div>
      </div>
    </Fragment>
  );
};

export default AdminSidebar;
