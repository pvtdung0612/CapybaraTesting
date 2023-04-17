import axios from "axios";
import Dashboard from "components/company/Dashboard";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Authentication from "services/Authentication/Authentication";

function CandidateProfile() {
    const userData = Authentication.getCurrentUser();
    const [candidate, setCandidate] = useState({});
    const navigate = useNavigate();
    useEffect(() => {
        axios({
            method: "get",
            url: `http://localhost:5000/api/candidate/${userData.id}`,
            headers: {
                Authorization: Authentication.generateAuthorizationHeader(),
            },
        })
            .then((res) => {
                console.log(res.data);
                setCandidate(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);
    return (
        <div className="w-full">
            <div className="flex w-full justify-center bg-gray-200 space-x-5 p-5">
                <div className=" w-4/5 rounded-lg shadow-md bg-white px-10 py-5">
                    <h2 className="text-2xl text-text_color font-medium mb-10">
                        Thông tin cá nhân
                    </h2>
                    <div className=" flex flex-col gap-5">
                        <div className="flex gap-5 items-center">
                            <img
                                src={candidate.avatar || "https://i.imgur.com/6VBx3io.png"}
                                alt="avatar"
                                className="h-24 w-24 object-cover rounded-full"
                            />
                            <h1 className="text-xl font-medium">{candidate.fullName}</h1>
                        </div>

                        <div className="flex mt-5 gap-56">
                            <div className="flex flex-col gap-5">
                                <div className="flex flex-col gap-2">
                                    <h1 className="font-medium text-base">Giới tính</h1>
                                    <p>{candidate.sex === "Male" ? "Nam" : "Nữ"}</p>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <h1 className="font-medium text-base">Ngày sinh</h1>
                                    <p>{candidate.dateOfBirth}</p>
                                </div>
                            </div>

                            <div className="flex flex-col gap-5">
                                <div className="flex flex-col gap-2">
                                    <h1 className="font-medium text-base">Email</h1>
                                    <p>{candidate.contactEmail}</p>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <h1 className="font-medium text-base">Điện thoại</h1>
                                    <p>{candidate.phoneNumber}</p>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col gap-2">
                            <h1 className="font-medium text-base">Giới thiệu</h1>
                            <p>{candidate.selfDescription}</p>
                        </div>
                    </div>
                    <button
                        className="px-3 py-2 mt-10 rounded-md text-white bg-emerald-500 hover:bg-emerald-600"
                        onClick={() =>
                            navigate("/candidate/profile/edit", {
                                state: { candidate: candidate },
                            })
                        }
                    >
                        Chỉnh sửa thông tin
                    </button>
                </div>
            </div>
        </div>
    );
}
export default CandidateProfile;
