import axios from "axios";
import Candidate from "components/company/Candidate";
import Dashboard from "components/company/Dashboard";
import Post from "components/company/Post";
import React, { useEffect, useReducer, useState } from "react";
import { useLocation } from "react-router-dom";
import Authentication from "services/Authentication/Authentication";

function CandidatesPerPost({ route, navigation }) {
    const location = useLocation();

    const [applications, setApplications] = useState([]);
    const [waitingApplications, setWaitingApplications] = useState([]);
    const [acceptedApplications, setAcceptedApplications] = useState([]);
    const [rejectedApplications, setRejectedApplications] = useState([]);

    const [activeOption, setActiveOption] = useState("Waiting");

    useEffect(() => {
        axios({
            method: "get",
            url: `http://localhost:5000/api/job-application?jobId=${location.state.post.id}`,
            headers: {
                Authorization: Authentication.generateAuthorizationHeader(),
            },
        })
            .then((res) => {
                // setCandidates(res.data);
                console.log(res.data)
                let acceptedApplicationsTemp = res.data.elements.filter((application) => {
                    return application.status === "Accepted";
                })
                setAcceptedApplications(
                    acceptedApplicationsTemp
                );

                let waitingApplicationsTemp = res.data.elements.filter((application) => {
                    return application.status === "Waiting";
                })
                setWaitingApplications(
                    waitingApplicationsTemp
                );

                let rejectedApplicationsTemp = res.data.elements.filter((application) => {
                    return application.status === "Rejected";
                })
                setRejectedApplications(
                    rejectedApplicationsTemp
                );
                console.log(res.data);

                switch (activeOption) {
                    case "Waiting":
                        setApplications(waitingApplicationsTemp);
                        break;
                    case "Accepted":
                        setApplications(acceptedApplicationsTemp);
                        break;
                    case "Rejected":
                        setApplications(rejectedApplicationsTemp);
                        break;
                    default:
                        break;
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }, [activeOption]);

    return (
        <Dashboard>
            <div className="w-full bg-white m-5 rounded-md shadow-md p-5 overflow-y-scroll scrollbar-hide">
                <Post post={location.state.post} />
                <div className="flex flex-col gap-5 mt-10">
                    <h1 className="text-xl font-medium ">Danh sách ứng viên</h1>

                    <div className="flex gap-10">
                        <div>
                            <button
                                onClick={() => setActiveOption("Waiting")}
                                className={`${activeOption === "Waiting"
                                        ? "text-text_color"
                                        : "text-text_color/50"
                                    } text-lg font-medium `}
                            >
                                <span>Đang chờ</span>
                                <span className="ml-3">{waitingApplications.length}</span>
                                {activeOption === "Waiting" && (
                                    <div className="w-full h-2 bg-purple-300 mt-2 rounded-xl"></div>
                                )}
                            </button>
                        </div>
                        <div>
                            <button
                                onClick={() => setActiveOption("Accepted")}
                                className={`${activeOption === "Accepted"
                                        ? "text-text_color"
                                        : "text-text_color/50"
                                    } text-lg font-medium `}
                            >
                                <span>Chấp nhận</span>
                                <span className="ml-3">{acceptedApplications.length}</span>
                                {activeOption === "Accepted" && (
                                    <div className="w-full h-2 bg-purple-300 mt-2 rounded-xl"></div>
                                )}
                            </button>
                        </div>
                        <div>
                            <button
                                onClick={() => setActiveOption("Rejected")}
                                className={`${activeOption === "Rejected"
                                        ? "text-text_color"
                                        : "text-text_color/50"
                                    } text-lg font-medium `}
                            >
                                <span>Từ chối</span>
                                <span className="ml-3">{rejectedApplications.length}</span>
                                {activeOption === "Rejected" && (
                                    <div className="w-full h-2 bg-purple-300 mt-2 rounded-xl"></div>
                                )}
                            </button>
                        </div>
                    </div>

                    <div className="flex flex-col gap-5  scrollbar-hide">
                        {applications.map((application) => {
                            return (
                                <Candidate
                                    key={application.id}
                                    candidate={application.candidate}
                                    activeOption={activeOption}
                                    application={application}
                                    reload={false}
                                    setReload={() => {}}
                                />
                            );
                        })}
                    </div>
                </div>
            </div>
        </Dashboard>
    );
}
export default CandidatesPerPost;
