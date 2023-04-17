import React, { Children, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import Authentication from "services/Authentication/Authentication";

import LogoJobFinder from "../../../assets/image/candidates/LogoJobFinder.png";
import {
    AccountCircle,
    Bookmark,
    Lock,
    Logout,
    MarkEmailRead,
} from "@mui/icons-material";
import Footer from "../footer/Footer";
import BlankAvatar from "./blankAvatar.svg";
// import { useOnClickOutside } from 'hooks/useOnClickOutside';

function Header() {
    const navigate = useNavigate();

    const isLogged = Authentication.isUserAuthenticated();
    const [isSubmenuOpen, setIsSubmenuOpen] = useState(false);

    const subMenuRef = useRef(null);

    const subMenuItemCandidate = [
        {
            title: "Thông tin cá nhân",
            icon: <AccountCircle />,
            onClick: () => {
                navigate("/candidate/profile");
            },
        },
        {
            title: "Công việc đã lưu",
            icon: <Bookmark />,
            onClick: () => {
                navigate("/candidate/savedjob");
            },
        },
        {
            title: "Công việc đã ứng tuyển",
            icon: <MarkEmailRead />,
            onClick: () => {
                navigate("/candidate/appliedjob");
            },
        },
        {
            title: "Đổi mật khẩu",
            icon: <Lock />,
            onClick: () => {
                navigate("/auth/change-password");
            },
        },
        {
            title: "Đăng xuất",
            icon: <Logout />,
            onClick: () => {
                navigate("/auth/signout");
            },
        },
    ];
    const subMenuItemCompany = [
        {
            title: "Bảng điều khiển",
            icon: <AccountCircle />,
            onClick: () => {
                navigate("/company");
            },
        },
        {
            title: "Đổi mật khẩu",
            icon: <Lock />,
            onClick: () => { },
        },
        {
            title: "Đăng xuất",
            icon: <Logout />,
            onClick: () => {
                navigate("/auth/signout");
            },
        },
    ];
    const subMenuItemAdmin = [
        {
            title: "Bảng điều khiển",
            icon: <AccountCircle />,
            onClick: () => {
                navigate("/admin");
            },
        },
        {
            title: "Đổi mật khẩu",
            icon: <Lock />,
            onClick: () => {
                navigate("/auth/change-password");
            },
        },
        {
            title: "Đăng xuất",
            icon: <Logout />,
            onClick: () => {
                navigate("/auth/signout");
            },
        },
    ];

    const [activeItemIndex, setActiveItemIndex] = useState(0);
    const navigationItems = [
        {
            title: "Tìm việc",
            action: "/",
        },
        {
            title: "Công ty",
            action: "/findCompany",
        },
        {
            title: "Về chúng tôi",
            action: "/about",
        },
    ];

    let subMenuItem = subMenuItemCandidate;
    if (Authentication.isCompany()) {
        subMenuItem = subMenuItemCompany;
    } else if (Authentication.isAdmin()) {
        subMenuItem = subMenuItemAdmin;
    }

    const user = Authentication.getCurrentUser();
    let avatar = null;
    if (user != undefined) {
        avatar = user.avatar
            ? user.avatar
            : user.companyLogo != undefined
                ? user.companyLogo
                : null;
    }

    return (
        <header className="bg-white w-full flex">
            <nav className="relative px-[2rem] flex items-center w-full justify-between">
                {/* Logo */}
                <div
                    onClick={() => {
                        setActiveItemIndex(0);
                        navigate("/");
                    }}
                    className="flex cursor-pointer py-4 flex-row space-x-3 items-center"
                >
                    <img className="rounded-md w-10 h-10" src={LogoJobFinder}></img>
                    <h1 className="text-2xl font-bold justify-start text-common_color">
                        Job Finder
                    </h1>
                </div>
                <div className="flex gap-8 h-full absolute left-[50%] translate-x-[-50%]">
                    {navigationItems.map((item, index) => {
                        if (index === activeItemIndex) {
                            return (
                                <div
                                    key={index}
                                    onClick={() => {
                                        setActiveItemIndex(index);
                                        navigate(item.action);
                                    }}
                                    className="flex justify-center py-6 cursor-pointer relative"
                                >
                                    <p className="font-bold text-[#71a893] inline-block">
                                        {item.title}
                                    </p>
                                    <div className="bg-[#71a893] w-full rounded-3xl h-[3px] absolute bottom-0"></div>
                                </div>
                            );
                        } else {
                            return (
                                <div
                                    key={index}
                                    onClick={() => {
                                        setActiveItemIndex(index);
                                        navigate(item.action);
                                    }}
                                    className="transition-[0.3s] group flex justify-center py-6 cursor-pointer relative"
                                >
                                    <p className="font-bold text-[#c5c5c5] group-hover:text-[#71a893] inline-block">
                                        {item.title}
                                    </p>
                                    <div className="bg-[#71a893] hidden group-hover:block transition-transform w-full rounded-3xl h-[3px] absolute bottom-0"></div>
                                </div>
                            );
                        }
                    })}
                </div>
                {!isLogged && (
                    <div className="flex space-x-4">
                        <Link to="/auth/signin">
                            <button className="w-[7.5rem] whitespace-nowrap bg-common_color hover:bg-green-700 text-white py-1 px-4 rounded-md justify-end">
                                Đăng nhập
                            </button>
                        </Link>
                        <Link to="/auth/signup">
                            <button className="w-[7.5rem] whitespace-nowrap bg-common_color hover:bg-green-700 text-white py-1 px-4 rounded-md justify-end">
                                Đăng kí
                            </button>
                        </Link>
                    </div>
                )}
                {isLogged && (
                    <div
                        className="flex space-x-4 relative"
                        ref={subMenuRef}
                        onMouseOver={() => setIsSubmenuOpen(true)}
                    >
                        {avatar != null ? (
                            <div className="w-8 h-8 rounded-full inline-block overflow-hidden">
                                <img src={avatar} className="w-8 h-8" alt="" />
                            </div>
                        ) : (
                            <img src={BlankAvatar} className="w-8 h-8" />
                        )}
                        {isSubmenuOpen && (
                            <div
                                className="min-w-[15rem] drop-shadow-md flex flex-col right-0 bg-white rounded-xl z-10 top-full mt-2 absolute w-fit whitespace-nowrap"
                                onMouseLeave={() => setIsSubmenuOpen(false)}
                            >
                                <div className="overflow-hidden rounded-xl">
                                    {subMenuItem.map((item, index) => {
                                        return (
                                            <div
                                                onClick={item.onClick}
                                                className="p-4 group hover:bg-[#f1f1f1] cursor-pointer flex items-center gap-[1rem]"
                                                key={index}
                                            >
                                                {item.icon}
                                                <p>{item.title}</p>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </nav>
        </header>
    );
}

export default function CandidateLayout({ children }) {
    return (
        <div className="bg-[#f7f7f7] h-screen flex flex-col">
            <div>
                <Header />
            </div>
            <div className="flex w-full flex-grow">{children}</div>
            <Footer />
        </div>
    );
}
