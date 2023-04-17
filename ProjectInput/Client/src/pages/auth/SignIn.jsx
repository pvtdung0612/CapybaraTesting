import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Authentication from "../../services/Authentication/Authentication";
import { toast } from "react-toastify";
import Layout from "components/layouts/background/Layout";
function SignIn() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    reset,

    formState: { errors, isSubmitSuccessful },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    Authentication.login(data.email, data.password)
      .then(() => {
        const userData = Authentication.getCurrentUser();
        if (userData.roles[0] === "Company") {
          navigate("/company");
        } else if (userData.roles[0] === "Admin") {
          navigate("/admin");
        } else {
          navigate("/");
        }
      })
      .catch((errors) => {
        console.log(errors);
        toast.error("Invalid email or password");
      });
  };

  useEffect(() => {
    reset({
      email: "",
      password: "",
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
            Sign In
          </h1>
          <h2 className="text-lg md:text-2xl font-normal self-center">
            Welcome to JobFinder
          </h2>
          <div className="flex flex-col gap-2">
            <label className="text-base md:text-lg" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              autoFocus
              {...register("email", {
                required: true,
                pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              })}
              className="border border-slate-200 focus:outline-none p-2 rounded-md"
            />
            {errors.email && errors.email.type === "required" && (
              <p className="text-red-500">This field is required</p>
            )}
            {errors.email && errors.email.type === "pattern" && (
              <p className="text-red-500">Invalid email address</p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-base md:text-lg" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              {...register("password", { required: true })}
              className="border border-slate-200 focus:outline-none p-2 rounded-md "
            />
            {errors.password && (
              <p className="text-red-500">This field is required</p>
            )}
          </div>

          <input
            type="submit"
            value={"Sign in"}
            className="mt-5 bg-emerald-500 hover:bg-emerald-500 p-2 w-full text-base md:text-lg rounded-md text-white font-normal self-center"
          />
        </form>

                <div className="flex justify-between mt-8">
                    <p onClick={() => navigate("/auth/signup")} className="cursor-pointer  text-right text-base md:text-lg hover:text-blue-600">
                        Đăng ký</p>
                    <p className="cursor-pointer  text-right text-base md:text-lg hover:text-blue-600">
                        Quên mật khẩu ?
                    </p>
                </div>
            </div>
        </Layout>
    );
}
export default SignIn;
