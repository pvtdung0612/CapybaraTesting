import React from "react";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  return (
    <div className=" text-white px-10 py-4 flex justify-between items-center bg-navbar_color/80">
      <div className="flex items-center gap-5">
        <span className="text-2xl font-medium">
          JobFinder
          <span className="text-lg font-normal">{` for `}</span>
          <span className="text-xl font-light">Admin</span>
        </span>
      </div>

      <div className="flex items-center gap-10">
        <ul className="flex gap-4 text-lg">
        </ul>
        <img
          src="/blankAvatar.png"
          alt="avatar"
          className="w-7 h-7 rounded-full object-cover"
        />
      </div>
    </div>
  );
}
export default Navbar;
