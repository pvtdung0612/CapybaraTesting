import React, { useEffect, useState } from "react";

import Header from "../../components/layouts/header/Header";
import Footer from "../../components/layouts/footer/Footer";
import JobView from "../../components/componentCustom/JobView";
import CompanyView from "../../components/componentCustom/CompanyView";
import Authentication from "services/Authentication/Authentication";
import {
    getListJobFullFilter,
    getListMajor,
    getListJobDefault,
    getListCompanyDefault,
    getCandidateInfoByid,
} from "../../services/candidates/CandidateService";

import "./CandidateHome.css";
import LogoJobFinder from "../../assets/image/candidates/LogoJobFinder.png";

export const CandidateHome = () => {
    const [filterKey, setFilterKey] = useState({
        jobTitle: null,
        workingForm: null,
        major: null,
    });

    const [listMajor, setListMajor] = useState([]);

    const [listJob, setListJob] = useState([]);

    const [listCompany, setListCompany] = useState([]);

    const [listAddressJob, setListAddressJob] = useState([]);
    const userData = Authentication.getCurrentUser()

    useEffect(() => {
        if (filterKey.jobTitle || filterKey.major || filterKey.workingForm) {
            getListJobFullFilter(filterKey).then((res) => {
                setListJob(res);
            });
        }
    }, [filterKey]);

    useEffect(() => {
        if (!filterKey.jobTitle && !filterKey.major && !filterKey.workingForm) {
            getListJobDefault().then((data) => {
                setListJob(data);

                let uniqueAddress = [];
                listJob.map((item) => {
                    if (uniqueAddress.indexOf(item.jobAddress.province) == -1) {
                        uniqueAddress.push(item.jobAddress.province);
                    }
                });
                setListAddressJob(uniqueAddress);
            });
        }

        getListJobDefault().then((data) => {
            let uniqueAddress = [];
            data.map((item) => {
                if (uniqueAddress.indexOf(item.jobAddress.province) == -1) {
                    uniqueAddress.push(item.jobAddress.province);
                }
            });
            setListAddressJob(uniqueAddress);
        });

        getListMajor().then((data) => {
            setListMajor(data);
        });

        getListCompanyDefault().then((data) => {
            setListCompany(data);
        });
    }, [filterKey]);

    const handleChangeWorkingForm = (sender) => {
        let cloneFilterKey = { ...filterKey };
        cloneFilterKey.workingForm = sender.target.value;
        // 3864: Need check
        setFilterKey(cloneFilterKey);
    };

    const handleChangeMajor = (sender) => {
        let cloneFilterKey = { ...filterKey };
        cloneFilterKey.major = sender.target.value;
        // 3864: Need check
        setFilterKey(cloneFilterKey);
    };

    const handleSubmitSearch = (event) => {
        event.preventDefault();
        setFilterKey({ ...filterKey, ["jobTitle"]: event.target.ipt_search.value });
    };

    const handleClearFilter = (event) => {
        // event.preventDefault();
        setFilterKey({
            jobTitle: null,
            workingForm: null,
            major: null,
        });
    };

    const handleSelectChangeMajor = (event) => {
        if (event.target.value === "Tất cả") {
            setFilterKey({ ...filterKey, ["major"]: null });
        } else {
            setFilterKey({ ...filterKey, ["major"]: event.target.value });
        }
    };

    return (
        <div className="text-Poppins w-full">
            <div className="flex items-start w-full h-full bg-gray-200 space-x-5 p-5 h-[200vh]">
                {/* LeftBar */}
                <div className="overflow-hidden w-3/12 bg-white p-5 space-y-5 rounded-xl">
                    <div className="flex flex-row">
                        <p className="flex-1 font-bold">Lọc</p>
                        <label
                            onClick={handleClearFilter}
                            className="font-bold text-red-400"
                        >
                            Xóa
                        </label>
                    </div>

                    <div>
                        <label className="block mb-2 font-bold ">Địa điểm</label>
                        <select
                            id="countries"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-common_color focus:border-common_color block w-full p-2.5"
                        >
                            <option value={null} selected>
                                Tất cả
                            </option>
                            {listAddressJob &&
                                listAddressJob.map((item) => <option>{item}</option>)}
                        </select>
                    </div>

                    <div className="flex flex-col space-y-2">
                        <label className="font-bold">Hình thức</label>
                        <label className="filterChx">
                            <input
                                onChange={handleChangeWorkingForm}
                                type="radio"
                                value="Fulltime"
                                checked={filterKey.workingForm == "Fulltime"}
                                name="radio_workingForm"
                                className="text-common_color focus:ring-common_color focus:ring-1 focus:ring-offset-1 w-3.5 h-3.5 mr-1.5"
                            />
                            Full-time
                        </label>
                        <label className="filterChx">
                            <input
                                onChange={handleChangeWorkingForm}
                                type="radio"
                                value="Parttime"
                                checked={filterKey.workingForm == "Parttime"}
                                name="radio_workingForm"
                                className="text-common_color focus:ring-common_color focus:ring-1 focus:ring-offset-1 w-3.5 h-3.5 mr-1.5"
                            />
                            Part-time
                        </label>
                        <label className="flex filterChx items-center">
                            <input
                                onChange={handleChangeWorkingForm}
                                type="radio"
                                value="Remote"
                                checked={filterKey.workingForm == "Remote"}
                                name="radio_workingForm"
                                className="text-common_color focus:ring-common_color focus:ring-1 focus:ring-offset-1 w-3.5 h-3.5 mr-1.5"
                            />
                            Remote
                        </label>
                    </div>

                    {/* Major Filter */}
                    <div>
                        <label className="block mb-2 font-bold ">Chuyên ngành</label>
                        <select
                            value={filterKey.major}
                            onChange={handleSelectChangeMajor}
                            id="major"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-common_color focus:border-common_color block w-full p-2.5"
                        >
                            <option value={null} selected>
                                Tất cả
                            </option>
                            {listMajor &&
                                listMajor.map((item) => (
                                    <option value={item.name}>{item.name}</option>
                                ))}
                        </select>
                    </div>

                    <div className="h-[1rem]"></div>
                </div>

                {/* MidBar */}
                <div className="scrollbar-hide overflow-auto h-full space-y-3 w-6/12">
                    {/* Search Card */}
                    <div className="bg-cover opacity-90 rounded-xl w-full h-xl bg-[url('./assets/image/candidates/BackgroundSearch.png')]">
                        <div className="space-y-3 p-5 pb-2 text-gray-100">
                            <div className=" text-xl">
                                Bạn đang tìm kiếm một công việc mơ ước?
                            </div>

                            <p className="text-xs">
                                Job Finder là nơi bạn có thể tìm thấy công việc mơ ước của mình
                                với nhiều kỹ năng khác nhau, hơn 10.000 việc làm có sẵn tại đây
                            </p>

                            <form
                                onSubmit={handleSubmitSearch}
                                className="flex items-center space-x-3"
                            >
                                <div className="relative w-full">
                                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                        <svg
                                            aria-hidden="true"
                                            className="w-4 h-4 text-white"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                                clipRule="evenodd"
                                            ></path>
                                        </svg>
                                    </div>
                                    <input
                                        type="text"
                                        id="ipt_search"
                                        className="p-3 text-xs bg-gray-100 bg-opacity-20 outline-none border-none focus:ring focus:ring-hover_common_color focus:ring-1 text-white rounded-md block w-full pl-10 placeholder-white"
                                        placeholder="Tên công việc"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="w-auto whitespace-nowrap h-10 text-sm text-common_color rounded-md bg-white hover:bg-hover_common_color hover:text-white"
                                >
                                    <span className="m-3">Tìm kiếm</span>
                                </button>
                            </form>
                            <div></div>
                        </div>
                    </div>
                    <div className="space-y-3">
                        {/* ListJob */}
                        {listJob.length > 0 ? (
                            listJob.map((item, index) => <JobView data={item}></JobView>)
                        ) : (
                            <div className="font-bold p-5 bg-white text-center text-common_color rounded-xl">
                                Không có công việc nào phù hợp!
                            </div>
                        )}
                    </div>
                </div>

                {/* RightBar */}
                <div className="scrollbar-hide overflow-auto w-3/12 h-full space-y-3">
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

export default CandidateHome;
