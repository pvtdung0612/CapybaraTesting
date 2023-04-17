import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Authentication from "services/Authentication/Authentication";

function Navbar() {
  const navigate = useNavigate();

  const user = Authentication.getCurrentUser();

  const [company, setCompany] = useState({});
  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/company/${user.id}`, {
        headers: {
          Authorization: Authentication.generateAuthorizationHeader(),
        },
      })
      .then((res) => {
        setCompany(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div className=" text-white px-10 py-4 flex justify-between items-center bg-emerald-500">
      <div className="flex items-center gap-5">
        <span className="text-2xl font-medium">
          JobFinder
          <span className="text-lg font-normal">{` for `}</span>
          <span className="text-xl font-light">Business</span>
        </span>
      </div>

      <div className="flex items-center gap-10">
        <ul className="flex gap-4 text-lg  ">
          <li>
            <button
              onClick={() => navigate("/company/requirement")}
              className="text-[0.9rem] flex items-center gap-2 py-2 px-4 rounded-md font-poppins uppercase"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-[1.2rem] h-[1.2rem]"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                />
              </svg>
              Đăng tin
            </button>
          </li>
        </ul>
        {company.companyLogo ? (
          <img
            src={company.companyLogo}
            alt="avatar"
            className="w-10 h-10 rounded-full object-cover"
          />
        ) : (
          <img
            src="/blankAvatar.png"
            alt="avatar"
            className="w-12 h-12 rounded-full object-cover"
          />
        )}
      </div>
    </div>
  );
}
export default Navbar;
