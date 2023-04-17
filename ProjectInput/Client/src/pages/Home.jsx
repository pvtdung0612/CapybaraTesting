import React from "react";
import CandidateHome from "./candidates/CandidateHome";
import Authentication from "services/Authentication/Authentication";
import Overview from "./admin/Overview/Overview";
import HomeCompany from "./company/HomeCompany";
import { Navigate } from "react-router-dom";

export function Home() {
    let Page = CandidateHome
    if (Authentication.isAdmin()) {
        // Page = Overview
    } else if (Authentication.isCompany()) {
        // Page = HomeCompany
    }
    return (
        Authentication.isAdmin() ? <Navigate to={"/admin"} /> :
        Authentication.isCompany() ? <Navigate to={"/company"} /> :
        <Navigate to={"/candidates"} />
    );
}
