import React, { Children } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import serviceAuth from "../../../services/Authentication/Authentication";

import LogoJobFinder from "../../../assets/image/candidates/LogoJobFinder.png";

function HomeHeader() {
  const navigate = useNavigate();
  const [isLogged, setIsLogged] = useState(false);

  const handleClickLogoJobFinder = (e) => {
    navigate("/");
  };

    useEffect(() => {
        setIsLogged(serviceAuth.isUserAuthenticated());
    }, [isLogged]);

  return (
    <header className="text-gray-500">
      <nav className="container mx-auto py-4 px-2 flex items-center justify-between">
        {/* Logo */}
        <div
          onClick={handleClickLogoJobFinder}
          className="flex flex-row space-x-3 items-center"
        >
          <img className="rounded-md w-10 h-10" src={LogoJobFinder}></img>
          <h1 className="text-2xl font-bold justify-start text-emerald-500">
            Job Finder
          </h1>
        </div>

                {/* Option */}
                {/* <ul className="flex space-x-10 justify-end">
          <li><a href="#" className="hover:text-gray-400 text-xl hover:text-common_color">For candidates</a></li>
          <li><a href="#" className="hover:text-gray-400 text-xl hover:text-common_color">For companys</a></li>
        </ul> */}

        {/* Account */}
        {!isLogged && (
          <div className="flex space-x-4">
            <Link to="/auth/signin">
              <button className="bg-common_color hover:bg-green-700 text-white py-1 px-4 rounded-md justify-end">
                Đăng nhập
              </button>
            </Link>
            <Link to="/auth/signup">
              <button className="w-[7.5rem] whitespace-nowrap bg-common_color hover:bg-green-700 text-white py-1 px-4 rounded-md justify-end">
                Đăng kí
              </button>
            </Link>
          </div>
        )}
        {isLogged && (
          <div className="flex space-x-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-7 h-7"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </div>
        )}
      </nav>
    </header>
  );
}

export default HomeHeader;
