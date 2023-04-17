import axios from "axios";
import Dashboard from "components/company/Dashboard";
import SelectionList from "components/company/SelectionList";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Authentication from "services/Authentication/Authentication";
import config from "../../config.json"

function Requirement() {
    const sexList = ["Không yêu cầu", "Nam", "Nữ"];
    const [majorList, setMajorList] = useState([]);
    const requireExperienceList = [
        "Không yêu cầu",
        "Dưới 1 năm",
        "1 - 3 năm",
        "Trên 3 năm",
    ];
    const workingFormList = ["Full-time", "Part-time", "Remote"];
    const [selectedSex, setSelectedSex] = useState(sexList[0]);
    const [selectedMajor, setSelectedMajor] = useState("");
    const [selectedForm, setSelectedForm] = useState(workingFormList[0]);
    const [selectedExperience, setSelectedExperience] = useState(
        requireExperienceList[0]
    );
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { isSubmitSuccessful },
    } = useForm();

    const onSubmit = (data) => {
        if (
            data.jobTitle === "" ||
            data.jobDescription === "" ||
            data.major === "" ||
            data.salary === "" ||
            data.numberOfHiring === "" ||
            data.closeDate === ""
        ) {
            toast.error("Please fill all required field");
        } else {
            axios({
                method: "post",
                url: "http://localhost:5000/api/job",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: Authentication.generateAuthorizationHeader(),
                },
                data: {
                    jobTitle: data.jobTitle,
                    jobDescription: data.jobDescription,
                    major: selectedMajor,
                    salary: data.salary,
                    numberOfHiring: data.numberOfHiring,
                    sex: selectedSex,
                    workingForm: selectedForm,
                    requireExperience: selectedExperience,
                    jobAddress: companyAddress,
                    closeDate: data.closeDate,
                },
            })
                .then((res) => {
                    // console.log(res.data);
                    navigate("/company/posts");
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    };

    // useEffect(() => {
    //   if (isSubmitSuccessful) {
    //     alert("Đăng tin thành công");
    //   }
    // }, [isSubmitSuccessful]);

    const [companyAddress, setCompanyAddress] = useState({});
    const [companyAddressAsString, setCompanyAddressAsString] = useState("");
    const companyData = Authentication.getCurrentUser();

    useEffect(() => {
        axios({
            method: "get",
            url: `http://localhost:5000/api/company/${companyData.id}`,
        })
            .then((res) => {
                // console.log(res.data.address);
                setCompanyAddressAsString(
                    `${res.data.address.detailAddress}, ${res.data.address.ward}, ${res.data.address.district}, ${res.data.address.province}`
                );
            })
            .catch((err) => {
                console.log(err);
            });

        axios({
            method: 'get',
            url: `${config.server.domain}/major`
        }).then((response) => {
            setMajorList(response.data.map((item) => item.name));
        })
    }, []);

    return (
        <Dashboard>
            <div className="w-full bg-white m-5 rounded-md shadow-md p-5 overflow-y-auto scrollbar-hide">
                <h1 className="text-3xl font-semibold text-text_color mb-10">
                    Đăng tin tuyển dụng
                </h1>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex w-full xl:pr-24 flex-col gap-5 text-text_color overflow-y-scroll scrollbar-hide"
                >
                    <div className="flex flex-col lg:flex-row w-full gap-10">
                        <div className="flex flex-col gap-2 md:flex-1">
                            <label
                                htmlFor="jobTitle"
                                className="text-base md:text-lg font-medium"
                            >
                                Tên công việc
                                <span className="text-red-500 ml-2">(*)</span>
                            </label>
                            <input
                                type="text"
                                {...register("jobTitle", {})}
                                className="border p-2 text-base md:text-lg focus:outline-none rounded-md"
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label
                                htmlFor="major"
                                className="text-base md:text-lg font-medium"
                            >
                                Ngành nghề
                                <span className="text-red-500 ml-2">(*)</span>
                            </label>
                            <SelectionList
                                options={majorList}
                                selected={selectedMajor}
                                setSelected={setSelectedMajor}
                                {...register("major")}
                            />
                        </div>
                    </div>

                    <div className="flex flex-col gap-2 flex-initial">
                        <label
                            htmlFor="jobDescription"
                            className="text-base md:text-lg font-medium"
                        >
                            Mô tả
                            <span className="text-red-500 ml-2">(*)</span>
                        </label>
                        <textarea
                            {...register("jobDescription", {})}
                            className="border p-2 text-base md:text-lg focus:outline-none rounded-md"
                        />
                    </div>

                    <div className="flex flex-col md:flex-row gap-10">
                        <div className="flex flex-col gap-2 flex-initial">
                            <label
                                htmlFor="numberOfHiring"
                                className="text-base md:text-lg font-medium"
                            >
                                {`Số lượng (người)`}
                                <span className="text-red-500 ml-2">(*)</span>
                            </label>
                            <input
                                type="number"
                                {...register("numberOfHiring", {})}
                                className="border p-2 text-base md:text-lg focus:outline-none rounded-md"
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="sex" className="text-base md:text-lg font-medium">
                                Giới tính
                            </label>

                            <SelectionList
                                options={sexList}
                                selected={selectedSex}
                                setSelected={setSelectedSex}
                                {...register("sex")}
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label
                                htmlFor="requireExperience"
                                className="text-base md:text-lg font-medium"
                            >
                                Kinh nghiệm
                            </label>

                            <SelectionList
                                options={requireExperienceList}
                                selected={selectedExperience}
                                setSelected={setSelectedExperience}
                                {...register("requireExperience")}
                            />
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row gap-10">
                        <div className="flex flex-col gap-2">
                            <label
                                htmlFor="salary"
                                className="text-base md:text-lg font-medium"
                            >
                                Lương
                                <span className="text-red-500 ml-2">(*)</span>
                            </label>

                            <input
                                type="text"
                                {...register("salary")}
                                className="border p-2 text-base md:text-lg focus:outline-none rounded-md"
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label
                                htmlFor="workingForm"
                                className="text-base md:text-lg font-medium"
                            >
                                Hình thức
                            </label>

                            <SelectionList
                                options={workingFormList}
                                selected={selectedForm}
                                setSelected={setSelectedForm}
                                {...register("workingForm")}
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label
                                htmlFor="closeDate"
                                className="text-base md:text-lg font-medium"
                            >
                                Ngày đóng đơn
                                <span className="text-red-500 ml-2">(*)</span>
                            </label>
                            <input
                                type="date"
                                {...register("closeDate", {
                                    required: true,
                                })}
                                className="border p-2 text-base md:text-lg focus:outline-none rounded-md"
                            />
                        </div>
                    </div>

                    <div className="flex flex-col gap-2">
                        <label
                            htmlFor="jobAddress"
                            className="text-base lg:text-lg font-medium"
                        >
                            Địa điểm làm việc
                        </label>

                        <input
                            type="text"
                            defaultValue={companyAddressAsString}
                            readOnly={true}
                            className="border p-2 text-base md:text-lg focus:outline-none rounded-md"
                            {...register("jobAddress")}
                        />
                    </div>

                    <input
                        type="submit"
                        value={"Đăng"}
                        className="text-white text-base md:text-lg bg-background_color hover:bg-background_color_hover py-2 rounded-md my-4"
                    />
                </form>
            </div>
        </Dashboard>
    );
}
export default Requirement;
