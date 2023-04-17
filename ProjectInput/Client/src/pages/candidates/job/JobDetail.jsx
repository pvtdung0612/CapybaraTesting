import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Authentication from "services/Authentication/Authentication";
import {
    getListCompanyDefault,
    getCompanyById,
    getCandidateInfoByid,
} from "../../../services/candidates/CandidateService";
import { getJobById } from "../../../services/job/JobService";
import CompanyView from "../../../components/componentCustom/CompanyView";
import LogoJobFinder from "../../../assets/image/candidates/LogoJobFinder.png";
import Header from "components/layouts/header/Header";
import ModelCV from "components/componentCustom/ModalCV";
import "./JobDetail.css";
import { toast } from "react-toastify";
import Footer from "components/layouts/footer/Footer";
import { Modal } from "@mui/material";

export const JobDetail = () => {
    const params = useParams();
    const navigate = useNavigate();

    const [openApply, setOpenAppy] = useState(false)

    const [jobDetail, setJobDetail] = useState({
        id: null,
        userId: null,
        jobTitle: "",
        jobDescription: "",
        jobAddress: {
            id: 0,
            province: "",
            district: "",
            ward: "",
            detailAddress: "",
        },
        company: {
            companyName: ""
        },
        major: "",
        salary: "",
        numberOfHiring: 0,
        requireExperience: "",
        sex: "",
        workingForm: "",
    });

    const [userData, setUserData] = useState(null);

    const [listCompany, setListCompany] = useState([]);
    const [companyLogo, setCompanyLogo] = useState("");
    const [companyTitle, setCompanyTitle] = useState("");

    const [reloadPage, setReloadPage] = useState(false);

    const handleClickSendCV = (e) => {
        if (!Authentication.isUserAuthenticated()) {
            toast.warn("Bạn cần đăng nhập trước khi Gửi CV");
        }
        setOpenAppy(true)
    };

    // first load
    useEffect(() => {
        if (
            Authentication.isUserAuthenticated() &&
            Authentication.getCurrentUser().roles[0] == "Candidate"
        ) {
            getCandidateInfoByid(Authentication.getCurrentUser().id).then((res) => {
                if (res) {
                    setUserData(res);
                } else {
                    setUserData(null);
                }
            });
        } else {
            setUserData(null);
        }
    }, []);

    // load after userData
    useEffect(() => {
        if (params.id) {
            getJobById(params.id).then((data) => {
                console.log(data);
                setJobDetail(data);
            });
        } else {
            navigate("/");
        }

        getListCompanyDefault().then((data) => {
            setListCompany(data);
        });
    }, [userData]);

    // Load after get jobDetail
    useEffect(() => {
        if (jobDetail.userId) {
            getCompanyById(jobDetail.userId).then((company) => {
                if (company.companyLogo) {
                    setCompanyLogo(company.companyLogo);
                } else {
                    setCompanyLogo(LogoJobFinder);
                }
                if (company.companyName) {
                    setCompanyTitle(company.companyName);
                } else {
                    setCompanyTitle("Undefind");
                }
            });
        } else {
            setCompanyLogo(LogoJobFinder);
        }
    }, [jobDetail]);

    return (
        <div className="text-Poppins w-full">
            {/* Body */}
            <div className="flex items-start w-full h-full bg-gray-200 space-x-5 p-5">
                {/* Left Content */}
                <div className="scroll-hidden overflow-auto w-9/12 space-y-4 bg-white p-6 rounded-xl">
                    {/* Header */}
                    <div className="flex flex-row items-center space-x-4">
                        <img onClick={() => { navigate(`/company/${jobDetail.userId}`) }} className="cursor-pointer rounded-md w-12 h-12" src={companyLogo} />
                        <div>
                            <p className="text-2xl">{jobDetail.jobTitle}</p>
                            <p onClick={() => { navigate(`/company/${jobDetail.userId}`) }} className="font-bold cursor-pointer hover:text-slate-400">{jobDetail.company.companyName}</p>
                        </div>
                        <p className="flex-1"></p>

                        <button
                            onClick={handleClickSendCV}
                            className="text-[0.9rem] bg-common_color whitespace-nowrap hover:bg-green-700 text-white p-3 rounded-md justify-end"
                            data-hs-overlay="#hs-slide-down-animation-modal"
                        >
                            Gửi CV
                        </button>
                    </div>

                    {/* Infor */}
                    <div className="flex flex-col space-y-2">
                        <label className="labelItem">Công ty đăng tuyển</label>
                        <p className="pItem">{companyTitle}</p>
                        <label className="labelItem">Địa chỉ</label>
                        <p className="pItem">
                            {jobDetail.jobAddress.detailAddress} - {jobDetail.jobAddress.ward}{" "}
                            - {jobDetail.jobAddress.district} -{" "}
                            {jobDetail.jobAddress.province}
                        </p>
                        <label className="labelItem">Lương</label>
                        <p className="pItem">{jobDetail.salary}</p>
                        <label className="labelItem">Mô tả</label>
                        <p className="pItem">{jobDetail.jobDescription}</p>
                        <label className="labelItem">Chuyên ngành</label>
                        <p className="pItem">{jobDetail.major}</p>
                        <label className="labelItem">Số lượng ứng tuyển</label>
                        <p className="pItem">{jobDetail.numberOfHiring} ứng viên</p>
                        <label className="labelItem">Hình thức làm việc</label>
                        <p className="pItem">{jobDetail.workingForm}</p>
                        <label className="labelItem">Yêu cầu</label>
                        <p className="pItem">Kinh nghiêm: {jobDetail.requireExperience}</p>
                        <p className="pItem">Giới tính: {jobDetail.sex}</p>
                    </div>

                    {
                        // jobDetail.id && userData &&
                        <Modal open={openApply} onClose={() => setOpenAppy(false)}>
                            <ModelCV
                                open={openApply}
                                setOpen={setOpenAppy}
                                idModal="hs-slide-down-animation-modal"
                                job={jobDetail}
                                candidate={userData}
                            />
                        </Modal>
                    }
                </div>

                {/* Right Content */}
                <div className="scrollbar-hide overflow-auto h-full w-3/12 space-y-3">
                    {userData ? (
                        <div className="flex flex-col items-center space-y-2 pt-7 pb-5 bg-white p-3 rounded-xl">
                            <img
                                className="m-auto w-1/3 h-1/3 rounded-md"
                                src={LogoJobFinder}
                            />
                            <p className="font-bold line-clamp-1">{userData.fullName}</p>
                            <p className="line-clamp-1">{userData.phoneNumber}</p>
                            <p className="line-clamp-1 w-full">{userData.contactEmail}</p>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center content-center space-y-2 pt-7 pb-5 bg-white p-3 rounded-xl">
                            <img
                                className="m-auto w-1/3 h-1/3 rounded-md"
                                src={LogoJobFinder}
                            />
                            <p className="font-bold line-clamp-1">Tên</p>
                            <p className="line-clamp-1">Số điện thoại</p>
                            <p className="line-clamp-1">Email</p>
                            <p className="text-xs line-clamp-1">
                                Bạn cần đăng nhập để hiển thị thông tin
                            </p>
                        </div>
                    )}

                    <div className="space-y-3">
                        {/* ListCompany */}
                        {listCompany.length > 0 ? (
                            listCompany.map((item, index) => (
                                <CompanyView data={item}></CompanyView>
                            ))
                        ) : (
                            <div className="font-bold p-5 bg-white text-center text-common_color rounded-xl">
                                Không có công ty nào được hiển thị!
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default JobDetail;
