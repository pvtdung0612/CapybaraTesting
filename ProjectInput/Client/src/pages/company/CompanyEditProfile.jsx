import axios from "axios";
import Dashboard from "components/company/Dashboard";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Authentication from "services/Authentication/Authentication";
import subVn from "sub-vn";

function EditProfile() {
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm();
    const navigate = useNavigate();

    const location = useLocation();

    console.log(location.state.company);

    const [selectedProvince, setSelectedProvince] = useState(
        location.state.company.address.province
    );
    const [selectedDistrict, setSelectedDistrict] = useState(
        location.state.company.address.district
    );
    const [selectedWard, setSelectedWard] = useState(
        location.state.company.address.ward
    );
    const [detailAddress, setDetailAddress] = useState(
        location.state.company.address.detailAddress
    );
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);

    const provinces = subVn.getProvinces();

    const [provinceCode, setProvinceCode] = useState(null);
    const [districtCode, setDistrictCode] = useState(null);
    useEffect(() => {
        const province = provinces.filter(
            (province) => province.name === selectedProvince
        );
        if (province.length !== 0) {
            const code = province[0].code;
            setProvinceCode(code);
        }
    }, [selectedProvince, provinces, provinceCode]);

    useEffect(() => {
        const districtList = subVn.getDistrictsByProvinceCode(provinceCode);
        setDistricts(districtList);
    }, [selectedProvince, provinceCode]);

    useEffect(() => {
        const district = districts.filter(
            (district) => district.name === selectedDistrict
        );
        if (district.length !== 0) {
            const code = district[0].code;
            setDistrictCode(code);
        }
    }, [selectedDistrict, districtCode, districts]);

    useEffect(() => {
        const wards = subVn.getWardsByDistrictCode(districtCode);
        setWards(wards);
    }, [selectedDistrict, districtCode]);

    const [companyName, setCompanyName] = useState(
        location.state.company.companyName
    );
    const [companyDescription, setCompanyDescription] = useState(
        location.state.company.companyDescription
    );
    const [numberOfEmployee, setNumberOfEmployee] = useState(
        location.state.company.numberOfEmployee
    );

    const onSubmit = (data) => {
        console.log(data);
        let formData = new FormData();
        formData.append("companyName", companyName);
        formData.append("companyDescription", companyDescription);
        formData.append("numberOfEmployee", numberOfEmployee);
        formData.append("address.province", selectedProvince);
        formData.append("address.district", selectedDistrict);
        formData.append("address.ward", selectedWard);
        formData.append("address.detailAddress", detailAddress);
        if (data.companyLogoFile != null) {
            formData.append("companyLogoFile", data.companyLogoFile);
        }

        axios({
            method: "put",
            url: "http://localhost:5000/api/company",
            data: formData,
            headers: {
                Authorization: Authentication.generateAuthorizationHeader(),
            },
        })
            .then((res) => {
                console.log(res);
                toast("Cập nhật thông tin thành công", {
                    type: "success",
                });
                navigate("/company/profile");
                
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const [selectedLogo, setSelectedLogo] = useState(null);
    const [preview, setPreview] = useState(location.state.company.companyLogo);
    const onSelectImage = (e) => {
        if (!e.target.files || e.target.files.length === 0) {
            setSelectedLogo(undefined);
            return;
        }

        setSelectedLogo(e.target.files[0]);
        setValue("companyLogoFile", e.target.files[0]);
        setPreview(URL.createObjectURL(e.target.files[0]));
    };
    return (
        <Dashboard>
            <div className="w-full bg-white m-5 rounded-md shadow-md p-5 overflow-y-scroll scrollbar-hide">
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex w-full xl:px-10 flex-col gap-3 text-text_color overflow-y-scroll scrollbar-hide"
                >
                    <h1 className="self-center text-2xl md:text-3xl font-semibold">
                        Thông tin công ty
                    </h1>

                    <div className="relative mt-4 mb-5 flex sm:flex-row flex-col w-full sm:items-center gap-5 md:gap-10">
                        <div className=" ">
                            {selectedLogo ? (
                                <img
                                    src={preview}
                                    alt="logo"
                                    className="w-24 h-24 md:w-28 md:h-28 xl:w-36 xl:h-36 object-cover rounded-full"
                                />
                            ) : (
                                <img
                                    src={
                                        location.state.company.companyLogo ||
                                        "https://i.imgur.com/6VBx3io.png"
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
                                name="companyLogoFile"
                                className="hidden"
                            />
                        </label>
                    </div>

                    <div className="flex flex-col gap-2">
                        <label
                            htmlFor="companyName"
                            className="text-base md:text-lg font-medium"
                        >
                            Tên công ty
                        </label>
                        <input
                            type="text"
                            // {...register("companyName", {
                            //   required: true,
                            // })}
                            defaultValue={companyName}
                            onChange={(e) => setCompanyName(e.target.value)}
                            className="border p-2 text-base md:text-lg focus:outline-none rounded-md"
                        />
                        {errors.companyName && (
                            <span className="text-red-500">This field is required</span>
                        )}
                    </div>

                    <div className="flex flex-col gap-2 mt-5">
                        <label
                            htmlFor="companyDescription"
                            className="text-base md:text-lg font-medium"
                        >
                            Giới thiệu
                        </label>
                        <textarea
                            defaultValue={companyDescription}
                            onChange={(e) => setCompanyDescription(e.target.value)}
                            className="border h-32 p-2 text-base md:text-lg focus:outline-none rounded-md"
                        />
                        {errors.companyDescription && (
                            <span className="text-red-500">This field is required</span>
                        )}
                    </div>

                    <div className="flex flex-col gap-2 mt-5">
                        <label
                            htmlFor="numberOfEmployee"
                            className="text-base md:text-lg font-medium"
                        >
                            Quy mô (nhân viên)
                        </label>
                        <input
                            type="text"
                            // {...register("numberOfEmployee", {
                            //   required: true,
                            // })}
                            defaultValue={numberOfEmployee}
                            onChange={(e) => setNumberOfEmployee(e.target.value)}
                            className="border p-2 text-base md:text-lg focus:outline-none rounded-md"
                        />
                        {errors.numberOfEmployee && (
                            <span className="text-red-500">This field is required</span>
                        )}
                    </div>

                    <div className="flex flex-col gap-2">
                        <label
                            htmlFor="countries"
                            className="block text-base md:text-lg font-medium "
                        >
                            Địa chỉ
                        </label>
                        <div className="flex gap-10">
                            <select
                                id="provinces"
                                {...register("address.province", {
                                    required: true,
                                })}
                                defaultValue={selectedProvince}
                                onChange={(e) => {
                                    setSelectedProvince(e.target.value);
                                }}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                            >
                                <option selected>Chọn tỉnh/ thành phố</option>
                                {provinces.map((province) => {
                                    return (
                                        <option key={province.code} value={province.name}>
                                            {province.name}
                                        </option>
                                    );
                                })}
                            </select>

                            <select
                                id="districts"
                                {...register("address.district", {
                                    required: true,
                                })}
                                defaultValue={selectedDistrict}
                                onChange={(e) => {
                                    setSelectedDistrict(e.target.value);
                                }}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                            >
                                <option selected>Chọn quận/ huyện</option>
                                {districts.map((district) => {
                                    return (
                                        <option key={district.code} value={district.name}>
                                            {district.name}
                                        </option>
                                    );
                                })}
                            </select>

                            <select
                                id="wards"
                                {...register("address.ward", {
                                    required: true,
                                })}
                                defaultValue={selectedWard}
                                onChange={(e) => {
                                    setSelectedWard(e.target.value);
                                }}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                            >
                                <option selected>Chọn xã/ phường/ thị trấn</option>
                                {wards.map((ward) => {
                                    return (
                                        <option key={ward.code} value={ward.name}>
                                            {ward.name}
                                        </option>
                                    );
                                })}
                            </select>
                        </div>

                        <input
                            type="text"
                            placeholder="Đường/ Tòa nhà"
                            {...register("address.detailAddress", {
                                required: true,
                            })}
                            defaultValue={detailAddress}
                            onChange={(e) => setDetailAddress(e.target.value)}
                            className="mt-2 border focus:outline-none p-2 text-base rounded-md"
                        />
                        {errors.address && (
                            <span className="text-red-500">This field is required</span>
                        )}
                    </div>

                    <input
                        type="submit"
                        value="Cập nhật"
                        className="p-2 my-10 border bg-emerald-500 hover:bg-emerald-600 text-white text-base md:text-lg rounded-md"
                    />
                </form>
            </div>
        </Dashboard>
    );
}
export default EditProfile;
