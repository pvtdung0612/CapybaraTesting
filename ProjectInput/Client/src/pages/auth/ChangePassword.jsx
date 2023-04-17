import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import Authentication from "../../services/Authentication/Authentication";
import { toast } from "react-toastify";
import Layout from "components/layouts/background/Layout";
import config from '../../config.json'

export default function ChangePassword() {
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        watch,
        reset,

        formState: { errors, isSubmitSuccessful },
    } = useForm();

    const onSubmit = (data) => {
        console.log(errors)
        console.log(data)
        Authentication.changePassword(data.oldPassword, data.newPassword)
            .then((res) => {
                toast.success("Đổi mật khẩu thành công");
                navigate("/");
            }).catch(err => {
                toast.error("Đổi mật khẩu thất bại");
            })
    };

    useEffect(() => {
        reset({
            oldPassword: "",
            newPassword: "",
            confirmPassword: ""
        });
    }, [isSubmitSuccessful, reset]);

    return (
        <Layout>
            <div className=" mx-4 bg-white md:w-1/2 mt-20 xl:w-1/3 md:mx-auto px-4 md:px-14 py-10 rounded-md shadow-md text-text_color">
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className=" flex flex-col gap-5  "
                >
                    <h1 className="text-3xl md:text-4xl font-semibold self-center">
                        Đổi mật khẩu
                    </h1>
                    <div className="flex flex-col gap-2">
                        <label className="text-base md:text-lg" htmlFor="oldPassword">
                            Mật khẩu cũ
                        </label>
                        <input
                            type="password"
                            autoFocus
                            {...register("oldPassword", {
                                required: "Hãy nhập trường này"
                            })}
                            className="border border-slate-200 focus:outline-none p-2 rounded-md"
                        />
                        {errors.oldPassword && (
                            <p className="text-red-500">`${errors.oldPassword.message}`</p>
                        )}
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-base md:text-lg" htmlFor="newPassword">
                            Mật khẩu mới
                        </label>
                        <input
                            type="password"
                            {...register("newPassword", { required: "Hãy nhập trường này" })}
                            className="border border-slate-200 focus:outline-none p-2 rounded-md "
                        />
                        {errors.newPassword && (
                            <p className="text-red-500">{errors.newPassword.message}</p>
                        )}
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="text-base md:text-lg" htmlFor="confirmPassword">
                            Mật khẩu mới
                        </label>
                        <input
                            type="password"
                            {
                            ...register("confirmPassword", {
                                required: "Hãy nhập trường này",
                                validate: (val) => {
                                    if (watch('newPassword') != val) {
                                        return "Xác nhận mật khẩu không đúng";
                                    }
                                }
                            })
                            }
                            className="border border-slate-200 focus:outline-none p-2 rounded-md "
                        />
                        {errors.confirmPassword && (
                            <p className="text-red-500">{errors.confirmPassword.message}</p>
                        )}
                    </div>

                    <input
                        type="submit"
                        value={"Đổi mật khẩu"}
                        className="cursor-pointer mt-5 bg-background_color hover:bg-background_color_hover p-2 w-full text-base md:text-lg rounded-md text-white font-normal self-center"
                    />
                </form>
            </div>
        </Layout>
    );
}
