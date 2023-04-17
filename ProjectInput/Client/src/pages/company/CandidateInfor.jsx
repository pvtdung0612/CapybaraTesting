import Dashboard from "components/company/Dashboard";
import React from "react";
import { useLocation } from "react-router-dom";

function CandidateInfor() {
  const location = useLocation();
  const candidate = location.state.candidate;
  return (
    <Dashboard>
      <div className="w-full bg-white m-5 rounded-md shadow-md p-5 overflow-y-scroll scrollbar-hide">
        <h1 className="text-text_color text-2xl font-medium mb-10">
          Thông tin ứng viên
        </h1>
        <div className="flex gap-5 flex-col px-10 py-5">
          <div className="flex flex-row gap-5 items-center">
            <img
              src={candidate.avatar || "https://i.imgur.com/6VBx3io.png"}
              alt="avatar"
              className="h-24 w-24 object-cover rounded-full"
            />
            <h1 className="text-2xl font-medium">{candidate.fullName}</h1>
          </div>
          <div className="flex mt-10 gap-56">
            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <h1 className="font-medium text-lg">Giới tính</h1>
                <p>{candidate.sex === "Male" ? "Nam" : "Nữ"}</p>
              </div>
              <div className="flex flex-col gap-2">
                <h1 className="font-medium text-lg">Ngày sinh</h1>
                <p>{candidate.dateOfBirth}</p>
              </div>
            </div>

            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <h1 className="font-medium text-lg">Email</h1>
                <p>{candidate.contactEmail}</p>
              </div>
              <div className="flex flex-col gap-2">
                <h1 className="font-medium text-lg">Điện thoại</h1>
                <p>{candidate.phoneNumber}</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <h1 className="font-medium text-lg"> Địa chỉ</h1>
            {/* <p>{`${candidate.address.detailAddress}, ${candidate.address.ward}, ${candidate.address.district}, ${candidate.address.province}`}</p> */}
          </div>
          <div className="flex flex-col gap-2">
            <h1 className="font-medium text-lg">Giới thiệu</h1>
            <p>{candidate.selfDescription}</p>
          </div>

          <div>
            <a
              href={location.state.application.cv}
              target="_blank"
              className="underline text-emerald-500 cursor-pointer"
            >
              Xem CV
            </a>
          </div>
        </div>
      </div>
    </Dashboard>
  );
}
export default CandidateInfor;
