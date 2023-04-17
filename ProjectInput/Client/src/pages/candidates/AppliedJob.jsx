import axios from "axios";
import Pagination, { postsPerPage } from "components/Pagination";
import Footer from "components/layouts/footer/Footer";
import { useNavigate } from "react-router-dom";
import Authentication from "services/Authentication/Authentication";

const { default: HomeHeader } = require("components/layouts/header/Header");
const { default: React, useState, useEffect } = require("react");

function AppliedJob() {
    const [currentPage, setCurrentPage] = useState(1);
    const lastPostIndex = currentPage * postsPerPage;
    const firstPostIndex = lastPostIndex - postsPerPage;

    const candidateData = Authentication.getCurrentUser();
    const navigate = useNavigate()
    const [appliedJobs, setAppliedJobs] = useState([]);
    useEffect(() => {
        axios({
            method: "get",
            url: `http://localhost:5000/api/job-application?candidateId=${candidateData.id}`,
            headers: {
                Authorization: Authentication.generateAuthorizationHeader(),
            },
        })
            .then((res) => {
                console.log(res.data);
                setAppliedJobs(res.data.elements);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return (
        <div className="w-full">
            <div className="h-screen w-full flex justify-center bg-gray-200 space-x-5 p-5">
                <div className="relative h-full w-4/5 rounded-lg shadow-md bg-white px-10 py-5">
                    <h2 className="text-2xl text-text_color font-medium mb-5">
                        Công việc đã ứng tuyển
                    </h2>
                    {appliedJobs.length === 0 ? (
                        <div className="flex justify-center mt-24 h-full">
                            <h1 className="text-xl text-text_color font-medium">
                                Bạn chưa ứng công việc nào
                            </h1>
                        </div>
                    ) : (
                        <div>
                            {appliedJobs
                                .slice(firstPostIndex, lastPostIndex)
                                .map((jobApplication) => (
                                    <div className="shadow-sm py-5" key={jobApplication.job.id}>
                                        <div className="flex gap-2 items-center">
                                            <img
                                                src={jobApplication.job.company.companyLogo}
                                                alt=""
                                                className="h-12 w-12 rounded-full object-cover"
                                            />
                                            <div className="ml-4">
                                                <h1 onClick={() => {
                                                    navigate(`/job/${jobApplication.job.id}`)
                                                }} className="text-lg cursor-pointer hover:text-red-400 font-semibold">
                                                    {jobApplication.job.jobTitle}
                                                </h1>
                                                <h1 onClick={() => {
                                                    navigate(`/company/${jobApplication.job.company.userId}`)
                                                }} className="text-gray-500 cursor-pointer hover:text-stone-700">
                                                    {jobApplication.job.company.companyName}
                                                </h1>
                                            </div>
                                        </div>
                                        <div className="mt-2">
                                            <p>{jobApplication.job.jobDescription}</p>
                                            <div className="mt-2 flex gap-2">
                                                <span className="bg-slate-100 px-2 py-1 rounded-md">
                                                    {jobApplication.job.salary}
                                                </span>
                                                <span className="bg-slate-100 px-2 py-1 rounded-md">
                                                    {jobApplication.job.requireExperience}
                                                </span>
                                                <span className="bg-slate-100 px-2 py-1 rounded-md">
                                                    {jobApplication.job.workingForm}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))}

                            <div className="absolute right-14 bottom-10">
                                <Pagination
                                    totalPosts={appliedJobs.length}
                                    setCurrentPage={setCurrentPage}
                                    currentPage={currentPage}
                                />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
export default AppliedJob;
