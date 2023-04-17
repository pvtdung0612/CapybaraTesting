import axios from "axios";
import HomeHeader from "components/layouts/header/Header";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Authentication from "services/Authentication/Authentication";
import Datepicker from "tailwind-datepicker-react";
import blankAvatar from './blankAvatar.svg'

function CandidateEditProfile() {
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitSuccessful },
        setValue,
    } = useForm();

    const location = useLocation();
    const [show, setShow] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);

    const [fullName, setFullName] = useState(location.state.candidate.fullName);
    const [contactEmail, setContactEmail] = useState(
        location.state.candidate.contactEmail
    );
    const [phoneNumber, setPhoneNumber] = useState(
        location.state.candidate.phoneNumber
    );
    const [dateOfBirth, setDateOfBirth] = useState(
        location.state.candidate.dateOfBirth
    );
    const [selfDescription, setSelfDescription] = useState(
        location.state.candidate.selfDescription
    );

    const handleChange = (selectedDate) => {
        setSelectedDate(selectedDate);
        console.log(selectedDate);
    };
    const handleClose = (state) => {
        setShow(state);
    };

    const [preview, setPreview] = useState(location.state.candidate.avatar);
    const [selectedAvatar, setSelectedAvatar] = useState(null);

    useEffect(() => {
        if (!selectedAvatar) {
            setPreview(undefined);
            return;
        }
        const objUrl = URL.createObjectURL(selectedAvatar);
        setPreview(objUrl);

        return () => URL.revokeObjectURL(objUrl);
    }, [selectedAvatar]);

    const onSelectImage = (e) => {
        if (!e.target.files || e.target.files.length === 0) {
            setSelectedAvatar(undefined);
            return;
        }

        setSelectedAvatar(e.target.files[0]);
        setValue("candidateAvatarFile", e.target.files[0]);
    };

    const onSubmit = (data) => {
        const formData = new FormData();
        formData.append("fullName", fullName);
        formData.append("contactEmail", contactEmail);
        formData.append("phoneNumber", phoneNumber);
        formData.append("dateOfBirth", dateOfBirth);
        formData.append("selfDescription", selfDescription);
        formData.append("candidateAvatarFile", data.candidateAvatarFile);
        formData.append("sex", data.sex);

        axios({
            method: "put",
            url: "http://localhost:5000/api/candidate",
            data: formData,
            headers: {
                Authorization: Authentication.generateAuthorizationHeader(),
            },
        })
            .then((res) => {
                console.log(res);
                navigate("/candidate/profile");
                toast("Cập nhật thông tin thành công", {
                    type: "success",
                });
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const options = {
        title: "Calendar",
        autoHide: true,
        todayBtn: false,
        clearBtn: false,
        maxDate: new Date("2030-01-01"),
        minDate: new Date("1950-01-01"),
        theme: {
            background: "bg-white dark:bg-gray-800",
            todayBtn: "",
            clearBtn: "",
            icons: "",
            text: "text-text_color",
            disabledText: "text-gray-300",
            input: "",
            inputIcon: "",
            selected: "",
        },
        icons: {
            // () => ReactElement | JSX.Element
            prev: () => (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 19.5L8.25 12l7.5-7.5"
                    />
                </svg>
            ),
            next: () => (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M8.25 4.5l7.5 7.5-7.5 7.5"
                    />
                </svg>
            ),
        },
        datepickerClassNames: "top-12",
        defaultDate: new Date(location.state.candidate.dateOfBirth),
        language: "en",
    };
    return (
        <div className="w-full">
            <div className="flex justify-center bg-gray-200 space-x-5 p-5">
                <div className=" w-4/5 rounded-lg shadow-md bg-white px-10 py-5">
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="flex w-full xl:pr-24 flex-col gap-3 text-text_color overflow-y-scroll scrollbar-hide"
                    >
                        <div className=" relative mt-14 mb-5 flex sm:flex-row flex-col w-full sm:items-center gap-5 md:gap-10">
                            <div className=" ">
                                {selectedAvatar ? (
                                    <img
                                        src={preview}
                                        alt="logo"
                                        className="w-24 h-24 md:w-28 md:h-28 xl:w-36 xl:h-36 object-cover rounded-full"
                                    />
                                ) : (
                                    <img
                                        src={
                                            location.state.candidate.avatar ||
                                            blankAvatar
                                        }
                                        alt="blankAvatar"
                                        className="w-24 h-24 md:w-28 md:h-28 xl:w-36 xl:h-36 object-cover rounded-full"
                                    />
                                )}
                            </div>
                            <label
                                htmlFor="logo"
                                className="cursor-pointer absolute text-gray-400 bottom-3 left-16"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="w-6 h-6"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z"
                                    />
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z"
                                    />
                                </svg>

                                <input
                                    type="file"
                                    id="logo"
                                    onChange={onSelectImage}
                                    name="candidateAvatarFile"
                                    className="hidden"
                                />
                            </label>
                        </div>

                        <div className="flex flex-col gap-2">
                            <label
                                htmlFor="fullName"
                                className="text-base md:text-lg font-medium"
                            >
                                Họ và tên
                                <span className="text-red-500 ml-2">(*)</span>
                            </label>
                            <input
                                type="text"
                                onChange={(e) => setFullName(e.target.value)}
                                defaultValue={fullName}
                                className="border p-2 text-base md:text-lg focus:outline-none rounded-md"
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label
                                htmlFor="date"
                                className="text-base lg:text-lg font-medium"
                            >
                                Ngày sinh
                            </label>
                            <Datepicker
                                options={options}
                                onChange={handleChange}
                                show={show}
                                setShow={handleClose}
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label htmlFor="text-base lg:text-lg font-medium">
                                Giới tính
                                <span className="text-red-500 ml-2">(*)</span>
                            </label>
                            <div className="flex gap-2 items-center">
                                <input
                                    className=" h-4 w-4"
                                    type="radio"
                                    value="male"
                                    id="male"
                                    {...register("sex")}
                                />
                                <label htmlFor="male">Nam</label>
                            </div>
                            <div className="flex gap-2 items-center">
                                <input
                                    className=" h-4 w-4"
                                    type="radio"
                                    value="female"
                                    {...register("sex", {})}
                                    id="male"
                                />
                                <label htmlFor="female">Nữ</label>
                            </div>
                        </div>

                        <div className="flex flex-col gap-2">
                            <label
                                htmlFor="contactEmail"
                                className="text-base md:text-lg font-medium"
                            >
                                Email
                                <span className="text-red-500 ml-2">(*)</span>
                            </label>
                            <input
                                type="text"
                                defaultValue={contactEmail}
                                onChange={(e) => setContactEmail(e.target.value)}
                                className="border p-2 text-base md:text-lg focus:outline-none rounded-md"
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label
                                htmlFor="phoneNumber"
                                className="text-base md:text-lg font-medium"
                            >
                                Điện thoại
                                <span className="text-red-500 ml-2">(*)</span>
                            </label>
                            <input
                                type="tel"
                                defaultValue={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                className="border p-2 text-base md:text-lg focus:outline-none rounded-md"
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label
                                htmlFor="selfDescription"
                                className="text-base lg:text-lg font-medium"
                            >
                                Giới thiệu
                            </label>
                            <textarea
                                name="selfDescription"
                                defaultValue={selfDescription}
                                onChange={(e) => setSelfDescription(e.target.value)}
                                className="border h-24 focus:outline-none p-2 text-base lg:text-lg rounded-md "
                            ></textarea>
                        </div>
                        <input
                            type="submit"
                            value="Cập nhật"
                            className="p-2 mb-5 mt-5 border bg-emerald-500 hover:bg-emerald-600 text-white text-base md:text-lg rounded-md"
                        />
                    </form>
                </div>
            </div>
        </div>
    );
}
export default CandidateEditProfile;
