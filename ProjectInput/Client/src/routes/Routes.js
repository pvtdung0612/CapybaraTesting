// import { CandidateHome } from "../pages/candidates/CandidateHome";
import { JobDetail } from "../pages/candidates/job/JobDetail";
import SignIn from "../pages/auth/SignIn";
import SignUp from "pages/auth/SignUp";
import VerifyEmail from "pages/auth/VerifyEmail";
import CompanyDetail from "pages/auth/detail/CompanyDetail";
import CandidateDetail from "pages/auth/detail/CandidateDetail";
import HomeCompany from "pages/company/HomeCompany";
import Requirement from "pages/company/Requirement";
import Posts from "pages/company/Posts";
import BlankLayout from "components/layouts/BlankLayout";
import PostDetail from "pages/company/PostDetail";
import CandidatesPerPost from "pages/company/CandidatesPerPost";
import AdminLayout from "components/layouts/AdminLayout/AdminLayout";
import Overview from "pages/admin/Overview/Overview";
import UserManager from "pages/admin/UserManager/UserManager";
import Signout from "pages/Logout";
import NotFound from "pages/NotFound/NotFound";
import CandidateHome from "pages/candidates/CandidateHome";
import EditPost from "pages/company/EditPost";
import CandidatesList from "pages/company/CandidatesList";
import Profile from "pages/company/Profile";

import EditProfile from "pages/company/CompanyEditProfile";
import CandidateLayout from "components/layouts/CandidateLayout/CandidateLayout";
import ChangePassword from "pages/auth/ChangePassword";


import CandidateInfor from "pages/company/CandidateInfor";
import CandidateProfile from "pages/candidates/Profile";
import CandidateEditProfile from "pages/candidates/CandidateEditProfile";
import SavedJob from "pages/candidates/SavedJob";
import AppliedJob from "pages/candidates/AppliedJob";
import AboutUs from "pages/AboutUs";
import CompanyViewPage from "pages/candidates/CompanyViewPage/CompanyViewPage";
import CandidateViewCompany from "pages/company/CandidateViewCompany/CandidateViewCompany";
import Report from "pages/admin/Report/Report";


const privateRoutes = [
    //  Example: {path: '/manager/home', layout: ManagerLayout , component: ManagerHome, authorization : ['Admin']}
    //  Explain:
    //  path: path from root
    //  layout: layout for this page (BlankLayout as default)
    //  component: component will be display
    //  authorization: array of roles can access this page
];
const publicRoutes = [
    { path: "/about", component: AboutUs, layout: CandidateLayout },
    { path: "/findCompany", component: CompanyViewPage, layout: CandidateLayout},
    //  Example: {path: '/login', component: Login}
    //   { path: "/", component: Home, layout: BlankLayout },
    { path: "/auth/verifyemail", component: VerifyEmail, layout: BlankLayout },

    { path: "admin", component: Overview, layout: AdminLayout, authorization: ['Admin'] },
    { path: "admin/user", component: UserManager, layout: AdminLayout, authorization: ['Admin'] },
    { path: "admin/report", component: Report, layout: AdminLayout, authorization: ['Admin'] },

    { path: "/company", component: HomeCompany, layout: BlankLayout, authorization: ['Company'] },
    { path: "/company/requirement", component: Requirement, layout: BlankLayout, authorization: ['Company'] },
    { path: "/company/posts", component: Posts, layout: BlankLayout, authorization: ['Company'] },
    { path: "/company/post/:id", component: PostDetail, layout: BlankLayout, authorization: ['Company'] },
    { path: "/company/post/candidates", component: CandidatesPerPost, layout: BlankLayout, authorization: ['Company'] },
    { path: "/company/post/edit", component: EditPost, layout: BlankLayout, authorization: ['Company'] },
    { path: "/company/candidates", component: CandidatesList, layout: BlankLayout, authorization: ['Company'] },
    { path: "/company/profile", component: Profile, layout: BlankLayout, authorization: ['Company'] },
    { path: "/company/profile/edit", component: EditProfile, layout: BlankLayout, authorization: ['Company'] },
    {
        path: "/company/candidateinfor",
        component: CandidateInfor,
        layout: BlankLayout,
    },

    { path: "/not_found", component: NotFound, layout: BlankLayout },
    { path: "/", component: CandidateHome, layout: CandidateLayout },
    { path: "/auth/signin", component: SignIn, layout: BlankLayout },
    { path: "/auth/signup", component: SignUp, layout: BlankLayout },
    { path: "/auth/signout", component: Signout, layout: BlankLayout },
    { path: "/auth/verifyemail", component: VerifyEmail, layout: BlankLayout },
    { path: "/auth/detail/company", component: CompanyDetail, layout: BlankLayout },
    { path: "/auth/change-password", component: ChangePassword },

    { path: "/auth/detail/candidate", component: CandidateDetail, layout: BlankLayout },

    { path: "/job/:id", component: JobDetail, layout: CandidateLayout },
    { path: "/company/:id", component: CandidateViewCompany, layout: CandidateLayout },
    { path: "/auth/detail/candidate", component: CandidateDetail, layout: BlankLayout },
    {
        path: "/company/candidateinfor",
        component: CandidateInfor,
        layout: BlankLayout,
    },
    {
        path: "/candidate/profile",
        component: CandidateProfile,
        layout: CandidateLayout,
    },
    {
        path: "/candidate/profile/edit",
        component: CandidateEditProfile,
        layout: CandidateLayout,
        authorization: ["Candidate"],
    },
    {
        path: "/candidate/savedjob",
        component: SavedJob,
        layout: CandidateLayout,
        authorization: ["Candidate"],
    },
    {
        path: "/candidate/appliedjob",
        component: AppliedJob,
        layout: CandidateLayout,
        authorization: ["Candidate"],
    },

];

export { publicRoutes, privateRoutes };
