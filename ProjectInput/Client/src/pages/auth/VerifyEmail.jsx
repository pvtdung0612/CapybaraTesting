import axios from "axios";
import React, { useRef } from "react";
import Countdown from "react-countdown";
import { useNavigate, useLocation } from "react-router-dom";
import VerificationInput from "react-verification-input";
import "./VerifyInput.css";

function VerifyEmail() {
  const location = useLocation();
  const navigate = useNavigate();

  const rendered = ({ minutes, seconds, completed }) => {
    if (completed) {
      return (
        <span>
          <span className="text-2xl font-semibold">00 : 00</span>
          <p className="text-lg text-background_color">
            Please request to resend the verification code.
          </p>
        </span>
      );
    } else {
      if (seconds >= 0 && seconds < 10) {
        return (
          <span className="text-2xl font-semibold">{`0${minutes} : 0${seconds}`}</span>
        );
      } else {
        return (
          <span className="text-2xl font-semibold">{`0${minutes} : ${seconds}`}</span>
        );
      }
    }
  };

  const handleVerify = (data) => {
    axios({
      method: "post",
      url: "http://localhost:5000/api/register/confirm",
      data: {
        email: location.state.email,
        confirmationKey: data,
      },
    })
      .then((res) => {
        if (res.data) {
          if (res.status === 200 || res.status === 201) {
            localStorage.setItem("authToken", res.data.accessToken);
            localStorage.setItem("tokenType", res.data.tokenType);
            if (res.data.user.roles[0] === "Company") {
              navigate("/auth/detail/company");
            } else {
              navigate("/auth/detail/candidate");
            }
          }
          return Promise.reject(res);
        }
        return Promise.reject(res);
      })
      .catch((err) => {
        return Promise.reject(err);
      });
  };

  const handleResendCode = () => {
    axios({
      method: "get",
      url: `http://localhost:5000/api/register/confirm/resend?email=${location.state.email}`,
    })
      .then((res) => {
        if (res.data) {
          if (res.data.success === "true") {
          }
          return Promise.reject(res);
        }
        return Promise.reject(res);
      })
      .catch((err) => {
        return Promise.reject(err);
      });
    window.location.reload(false);
  };
  return (
    <div className="">
      <div className="mx-4 md:w-1/2 xl:w-1/3 md:m-auto px-4 md:px-14 md:mt-20 py-10 rounded-md shadow-md text-text_color">
        <div className="flex flex-col gap-10">
          <h1 className="text-3xl md:text-4xl self-center font-semibold">
            Verify your email
          </h1>
          <div>
            <span className="text-lg md:text-xl font-light self-center">
              A verification code has been sent to your email
            </span>
            <span className="font-medium text-lg md:text-xl">{` ${location.state.email}`}</span>
          </div>
          <p className="text-lg font-normal">
            Please check your inbox and enter the verification code below to
            verify your email address. The code will expired in
            <span className="ml-2">
              <Countdown date={Date.now() + 1000 * 120} renderer={rendered} />
            </span>
          </p>

          <VerificationInput
            autoFocus
            placeholder="_"
            onComplete={handleVerify}
            classNames={{
              character: "character",
            }}
          />
          <div>
            <button
              onClick={handleResendCode}
              className="text-lg text-background_color"
            >
              Resend code
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default VerifyEmail;
