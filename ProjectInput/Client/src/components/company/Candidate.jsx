import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Authentication from "services/Authentication/Authentication";

function Candidate({
    reload,
    setReload,
    application,
    candidate,
    activeOption,
}) {

    console.log(candidate)
    console.log(application)

    function getCandidateDescription() {
        const words = candidate.selfDescription.split(" ");
        const first30Words = words.slice(0, 30).join(" ");
        return first30Words;
    }

    const handleAccept = async () => {
        const response = await axios({
            method: "get",
            url: `http://localhost:5000/api/job-application/accept/${application.id}`,
            headers: {
                Authorization: Authentication.generateAuthorizationHeader(),
            },
        });
        if (response.status === 200) {
            setReload(!reload);
        } else {
            console.log(response);
        }
    };

    const handleReject = async () => {
        const response = await axios({
            method: "get",
            url: `http://localhost:5000/api/job-application/reject/${application.id}`,
            headers: {
                Authorization: Authentication.generateAuthorizationHeader(),
            },
        });

        if (response.status === 200) {
            setReload(!reload);
        } else {
            console.log(response);
        }
    };

    const navigate = useNavigate();
    return (
        <div className="flex flex-col p-5 shadow-md rounded-md gap-2 ">
            <div className="flex justify-between">
                <div className="flex gap-4 items-center">
                    <img
                        src={candidate.avatar || "https://i.imgur.com/6VBx3io.png"}
                        alt="avatar"
                        className="h-12 w-12 object-cover rounded-full"
                    />
                    <div className="flex gap-2 flex-col">
                        <h1
                            className="text-lg font-medium cursor-pointer"
                            onClick={() =>
                                navigate("/company/candidateinfor", {
                                    state: {
                                        candidate: candidate,
                                        application: application,
                                    },
                                })
                            }
                        >
                            {candidate.fullName}
                        </h1>
                        <div className="flex gap-5">
                            <p className="border-r pr-5 ">
                                <a
                                    href={`mailto:${candidate.contactEmail}`}
                                    className="text-gray-500 hover:underline "
                                    target="_blank"
                                >
                                    {candidate.contactEmail}
                                </a>
                            </p>
                            <p className="text-gray-500">{candidate.phoneNumber}</p>
                        </div>
                    </div>
                </div>
                <div className="mr-5">
                    {/* <a
            href={application.cv != undefined ? application.cv : ""}
            target="_blank"
            className=" text-emerald-500 underline cursor-pointer"
          >
            Xem CV
          </a> */}
                </div>
            </div>
            <div className="flex justify-between items-center">
                <div className="w-2/3">
                    {candidate.selfDescription.split(" ").length >= 30 ? (
                        <p className="">{`${getCandidateDescription()} ...`}</p>
                    ) : (
                        <p className="">{candidate.selfDescription}</p>
                    )}
                </div>

                {activeOption === "Waiting" && (
                    <div className="flex h-10 gap-5 text-sm">
                        <button
                            className="px-2 h-full  text-white rounded-lg bg-emerald-500 hover:bg-emerald-600"
                            onClick={handleAccept}
                        >
                            Chấp nhận
                        </button>
                        <button
                            className="px-2 h-full rounded-lg bg-red-500 hover:bg-red-700 text-white"
                            onClick={handleReject}
                        >
                            Từ chối
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
export default Candidate;
