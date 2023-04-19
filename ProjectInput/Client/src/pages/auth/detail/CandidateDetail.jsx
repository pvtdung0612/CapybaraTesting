import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Authentication from "services/Authentication/Authentication";
import Datepicker from "tailwind-datepicker-react";

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
  defaultDate: new Date(),
  language: "en",
};

function CandidateDetail() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
    setValue,
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    console.log(selectedDate.month)
    const formData = new FormData();
    formData.append("fullName", data.fullName);
    formData.append("sex", data.sex);
    formData.append("dateOfBirth", selectedDate);
    formData.append("contactEmail", data.contactEmail);
    formData.append("phoneNumber", data.phoneNumber);
    formData.append("selfDescription", data.selfDescription);
    formData.append("candidateAvatarFile", selectedAvatar);
    // for (const value of formData.values()) {
    //   console.log(value);
    // }
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
        navigate("/auth/signin");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    reset({
      data: "",
    });
  }, [isSubmitSuccessful]);

  const [show, setShow] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  const handleChange = (e) => {
    setSelectedDate(e.target.value);
    console.log(e.target.value);
  };
  const handleClose = (state) => {
    setShow(state);
  };

  const [preview, setPreview] = useState();
  const [selectedAvatar, setSelectedAvatar] = useState();

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

  return (
    <div className="flex overflow-auto mx-5 md:mx-20 px-5 md:px-10 my-5 max-h-screen gap-20 border py-5 shadow-md rounded-md">
      <img
        src="https://images.unsplash.com/photo-1579389083046-e3df9c2b3325?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
        alt="right_side"
        className="hidden lg:block object-cover w-1/3 self-center rounded-md"
      />

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-full xl:pr-24 flex-col gap-3 text-text_color overflow-y-scroll scrollbar-hide"
      >
        <h1 className="self-center text-2xl md:text-3xl font-semibold">
          Thông tin cá nhân
        </h1>

        <div className="relative mt-14 mb-5 flex sm:flex-row flex-col w-full sm:items-center gap-5 md:gap-10">
          <div className=" ">
            {selectedAvatar ? (
              <img
                src={preview}
                alt="logo"
                className="w-24 h-24 md:w-28 md:h-28 xl:w-36 xl:h-36 object-cover rounded-full"
              />
            ) : (
              <img
                src="/blankAvatar.png"
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
            {...register("fullName", {
              required: true,
            })}
            className="border p-2 text-base md:text-lg focus:outline-none rounded-md"
          />

          {errors.fullName && (
            <p className="text-red-500">This field is required</p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="date" className="text-base lg:text-lg font-medium">
            Ngày sinh
          </label>
          <input type="date" onChange={handleChange}/>
          {/* <Datepicker
            options={options}
            onChange={handleChange}
            show={show}
            setShow={handleClose}
          /> */}
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="">
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
            {...register("contactEmail", {
              required: true,
            })}
            className="border p-2 text-base md:text-lg focus:outline-none rounded-md"
          />

          {errors.contactEmail && (
            <p className="text-red-500">This field is required</p>
          )}
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
            {...register("phoneNumber", {
              required: true,
            })}
            className="border p-2 text-base md:text-lg focus:outline-none rounded-md"
          />
          {errors.phoneNumber && (
            <p className="text-red-500">This field is required</p>
          )}
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
            id="selfDescription"
            {...register("selfDescription", {
              required: true,
            })}
            className="border h-24 focus:outline-none p-2 text-base lg:text-lg rounded-md "
          ></textarea>
        </div>
        <input
          type="submit"
          value="Cập nhật"
          className="p-2 my-5 border bg-emerald-500 hover:bg-emerald-600 text-white text-base md:text-lg rounded-md"
        />
      </form>
    </div>
  );
}
export default CandidateDetail;
