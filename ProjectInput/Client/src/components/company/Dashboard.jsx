import Layout from "components/layouts/background/Layout";
import Navbar from "./Navbar";
import React, { useState } from "react";
import Sidebar from "./Sidebar";

function Dashboard({ children }) {
  return (
    <div className="bg-[#f7f7f7] flex flex-col h-screen">
      <div>
        <Navbar />
      </div>
      <div className="flex flex-[1] overflow-hidden">
        <Sidebar />
        {children}
      </div>
    </div>
  );
}
export default Dashboard;
