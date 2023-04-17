import axios from "axios";
import Layout from "components/layouts/background/Layout";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
function SignUp({ navigation }) {
    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors, isSubmitSuccessful },
    } = useForm();

    const navigate = useNavigate();

    const onSubmit = (data) => {
        axios({
            method: "post",
            url: "http://localhost:5000/api/register",
            data: {
                email: data.email,
                password: data.password,
                role: data.role,
            },
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => {
                if (res.data) {
                    if (res.status === 200 || res.status === 201) {

                        navigate("/auth/verifyemail", {
                            state: {
                                email: res.data.email,
                            },
                        });
                        return res;
                    }
                    return Promise.reject(res);
                }
                return Promise.reject(res);
            })
            .catch((err) => {
                return Promise.reject(err);
            });
    };
    useEffect(() => {
        reset({
            data: "",
        });
    }, [isSubmitSuccessful]);
    return (
        <Layout>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="mx-4 bg-white md:w-1/2 xl:w-1/3 md:mx-auto mt-10 flex flex-col gap-5 px-8 md:px-14 py-10 shadow-md rounded-md"
            >
                <h1 className="text-3xl md:text-4xl self-center font-semibold mb-5">
                    Sign up
                </h1>
                <div className="flex flex-col gap-2">
                    <label
                        className="text-base md:text-lg font-normal flex gap-2 items-center"
                        htmlFor="email"
                    >
                        Email
                        <span className="text-red-500">(*)</span>
                    </label>
                    <input
                        className="border p-2 rounded-md focus:outline-none"
                        autoFocus
                        type="email"
                        {...register("email", {
                            required: true,
                            pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        })}
                    />

                    {errors.email && errors.email.type === "required" && (
                        <p className="text-red-500">This field is required</p>
                    )}
                    {errors.email && errors.email.type === "pattern" && (
                        <p className="text-red-500">Invalid email</p>
                    )}
                </div>
                <div className="flex flex-col gap-2">
                    <label
                        className="text-base md:text-lg font-normal flex gap-2 items-center"
                        htmlFor="password"
                    >
                        Password
                        <span className="text-red-500">(*)</span>
                    </label>
                    <input
                        className="border p-2 rounded-md focus:outline-none"
                        type="password"
                        {...register("password", {
                            required: true,
                        })}
                    />
                    {errors.password && errors.password.type === "required" && (
                        <p className="text-red-500">This field is required</p>
                    )}
                </div>
                <div className="flex flex-col gap-2">
                    <label
                        className="text-base md:text-lg font-normal flex gap-2 items-center"
                        htmlFor="repeat_password"
                    >
                        Repeat password
                        <span className="text-red-500">(*)</span>
                    </label>
                    <input
                        className="border p-2 rounded-md focus:outline-none"
                        type="password"
                        {...register("repeat_password", {
                            required: true,
                            validate: (value) => value === watch("password"),
                        })}
                    />
                    {errors.repeat_password &&
                        errors.repeat_password.type === "required" && (
                            <p className="text-red-500">This field is required</p>
                        )}
                    {errors.repeat_password &&
                        errors.repeat_password.type === "validate" && (
                            <p className="text-red-500">Password does not match</p>
                        )}
                </div>

                <div className="flex flex-col gap-2">
                    <label
                        className="text-base md:text-lg font-normal flex gap-2 items-center"
                        htmlFor="role"
                    >
                        Who you are?
                        <span className="text-red-500">(*)</span>
                    </label>
                    <div className="flex gap-2 items-center">
                        <input
                            type="radio"
                            id="company"
                            value="Company"
                            className="h-4 w-4 "
                            checked
                            {...register("role")}
                        />
                        <label htmlFor="company" className="text-base">
                            Company
                        </label>
                    </div>
                    <div className="flex gap-2 items-center">
                        <input
                            type="radio"
                            id="candidate"
                            value="Candidate"
                            className="h-4 w-4"
                            {...register("role")}
                        />
                        <label htmlFor="candidate" className="text-base">
                            Candidate
                        </label>
                    </div>
                </div>

                <input
                    type="submit"
                    value={"Sign up"}
                    className="text-white text-base md:text-lg bg-background_color hover:bg-background_color_hover py-2 rounded-md mt-5"
                />
            </form>
        </Layout>
    );
}
export default SignUp;
