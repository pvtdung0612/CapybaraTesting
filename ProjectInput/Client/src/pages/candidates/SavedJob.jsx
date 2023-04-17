import { Delete } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import axios from "axios";
import Pagination, { postsPerPage } from "components/Pagination";
import Footer from "components/layouts/footer/Footer";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Authentication from "services/Authentication/Authentication";

const { default: HomeHeader } = require("components/layouts/header/Header");
const { default: React, useState, useEffect } = require("react");

function getJobDescription(str) {
    if (str != undefined) {
        const words = str.split(" ");
        const first50Words = words.slice(0, 50).join(" ");
        return first50Words;
    } else return ""
}

function SavedJob() {
    const [currentPage, setCurrentPage] = useState(1);
    const lastPostIndex = currentPage * postsPerPage;
    const firstPostIndex = lastPostIndex - postsPerPage;

    const candidateData = Authentication.getCurrentUser();

    const [savedJobs, setSavedJobs] = useState([]);
    const [reload, setReload] = useState(false)

    const navigate = useNavigate()

    useEffect(() => {
        axios({
            method: "get",
            url: `http://localhost:5000/api/job/save?candidateId=${candidateData.id}`,
            headers: {
                Authorization: Authentication.generateAuthorizationHeader(),
            },
        })
            .then((res) => {
                console.log(res.data);
                setSavedJobs(res.data.elements);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [reload]);

    const handleUnSaveJob = (jobId) => {
        axios({
            method: "delete",
            url: `http://localhost:5000/api/job/save/${jobId}`,
            headers: {
                Authorization: Authentication.generateAuthorizationHeader(),
            },
        })
            .then((res) => {
                toast.success("Bỏ lưu công việc thành công")
                setReload(!reload)
            })
            .catch((err) => {
                toast.error("Có lỗi xảy ra")
            });
    };
    return (
        <div className="w-full bg-gray-200">
            <div className="w-full inset-x-0 top-0 flex justify-center bg-gray-200 space-x-5 p-5">
                <div className="relative w-4/5 rounded-lg shadow-md bg-white px-10 py-5">
                    <h2 className="text-2xl text-text_color font-medium mb-5">
                        Công việc đã lưu
                    </h2>
                    {savedJobs.length === 0 ? (
                        <div className="flex justify-center items-center">
                            <h1 className="text-xl text-text_color font-medium">
                                Bạn chưa lưu công việc nào
                            </h1>
                        </div>
                    ) : (
                        <div className="flex flex-col">
                            {savedJobs.slice(firstPostIndex, lastPostIndex)
                                .map((savedJob) => (
                                <div className="shadow-sm py-5" key={savedJob.job.id}>
                                    <div className="flex justify-between items-center">
                                        <div className="flex gap-2 items-center">
                                            <img
                                                src={savedJob.job.company.companyLogo}
                                                alt=""
                                                className="h-12 w-12 rounded-full object-cover"
                                            />
                                            <div>
                                                <h1 onClick={() => {
                                                    navigate(`/job/${savedJob.job.id}`)
                                                }} className="text-lg ml-4 hover:text-red-400 cursor-pointer font-semibold">{savedJob.job.jobTitle}</h1>
                                            </div>
                                        </div>
                                        <IconButton className="text-gray-600 hover:text-gray-800 px-2 py-1 rounded-md"
                                            onClick={() => handleUnSaveJob(savedJob.id)}>
                                            <Delete />
                                        </IconButton>
                                    </div>

                                    <div className="mt-2 w-5/6">
                                        <p>{`${getJobDescription(savedJob.job.jobDescription)} ...`}</p>
                                        <div className="mt-2 flex gap-2">
                                            <span className="bg-slate-100 px-2 py-1 rounded-md">
                                                {savedJob.job.salary}
                                            </span>
                                            <span className="bg-slate-100 px-2 py-1 rounded-md">
                                                {savedJob.job.requireExperience}
                                            </span>
                                            <span className="bg-slate-100 px-2 py-1 rounded-md">
                                                {savedJob.job.workingForm}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}

                            <div className="self-end mt-8">
                                <Pagination
                                    totalPosts={savedJobs.length}
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
export default SavedJob;
