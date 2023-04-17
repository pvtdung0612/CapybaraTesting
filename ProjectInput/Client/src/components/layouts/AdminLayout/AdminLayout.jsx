import Layout from "components/layouts/background/Layout";
import Navbar from "./Navbar";
import React, { useState } from "react";
import Sidebar from "./Sidebar";

function AdminLayout({ children }) {
  return (
    <div className="bg-[#0d0c22] h-screen flex flex-col">
      <div>
        <Navbar />
      </div>
      <div className="flex w-full flex-grow">
        <div className="h-full">
            <Sidebar />
        </div>
        <div className="w-full bg-[#f7f7f7] overflow-hidden">
            {children}
        </div>
      </div>
    </div>
  );
}
export default AdminLayout;
