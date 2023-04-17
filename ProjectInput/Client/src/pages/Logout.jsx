import { Navigate, redirect, useNavigate } from "react-router-dom";
import Authentication from "services/Authentication/Authentication";
import React from "react";

export default function Signout() {
    Authentication.logout()
    const navigate = useNavigate()
    // navigate("/auth/signin")
    // return redirect("/auth/signin")
    return (
        <Navigate to="/auth/signin" />
    )
}