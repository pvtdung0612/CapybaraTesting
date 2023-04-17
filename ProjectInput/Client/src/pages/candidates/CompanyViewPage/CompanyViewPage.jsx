import axios from "axios"
import React, { useEffect, useState } from "react"
import config from "../../../config.json"
import { Search } from "@mui/icons-material"
import { Icon, IconButton, Pagination } from "@mui/material"
import searchIcon from "./searchIcon.svg"
import { useNavigate } from "react-router-dom"

export default function CompanyViewPage() {
    const [companyList, setCompanyList] = useState([])
    const navigate = useNavigate()

    const [page, setPage] = useState(1)
    const [totalPage, setTotalPage] = useState(1)

    const [searchKey, setSearchKey] = useState("")
    const [requestUrl, setRequestUrl] = useState(`${config.server.domain}/company`)
    const [requestOption, setRequestOption] = useState({
        method: "GET",
        url: `${config.server.domain}/company?pageSize=1&page=${page - 1}`
    })
    const onSearchButtonClick = () => {
        if (searchKey != "") {
            setPage(1)
            setRequestUrl(`${config.server.domain}/company/find?searchKey=${searchKey}`)
        }
    }

    useEffect(() => {
        let url = requestUrl
        if (url.includes("?")) {
            url = url + `&page=${page - 1}&pageSize=10`
        } else {
            url = url + `?page=${page - 1}&pageSize=10`
        }

        axios({
            method: "GET",
            url: url
        }).then((response) => {
            console.log(response)
            setTotalPage(response.data.page.totalPage)
            setCompanyList(response.data.elements.map((item, index) => {
                return {
                    ...item,
                    companyDescription: item.companyDescription.substr(0, 355) + "..."
                }
            }))
        })
    }, [page, requestUrl])

    return (
        <div className="w-full flex gap-4 flex-col items-center bg-[#f7f7f7]">
            <div className="flex flex-col items-center gap-4 my-8 min-w-[20rem]">
                <p className="text-[1.5rem] text-[#00b14f]">Tìm kiếm công ty phù hợp với bạn</p>
                <div className="bg-white py-1 px-6 rounded-[25px] flex justify-between items-center w-full">
                    <input value={searchKey} onChange={(e) => setSearchKey(e.target.value)} type="text" className="flex-grow focus:ring-0 outline-0 outline-transparent border-0 focus:outline-none active:outline-none" placeholder="Nhập từ khóa" />
                    <IconButton onClick={onSearchButtonClick}>
                        <img src={searchIcon} className="w-4 h-4" alt="" />
                    </IconButton>
                </div>
            </div>
            <div className="flex-wrap w-full flex gap-4 px-[5rem] pb-4 bg-[#f7f7f7]">
                {
                    companyList.length != 0 ?
                        companyList.map((company, index) => {
                            return (
                                <div key={index} className="w-[32.5%] h-[20rem] bg-white rounded p-4">
                                    <div className="flex items-center gap-4 ">
                                        {
                                            company.companyLogo != null ? <div onClick={() => {
                                                navigate(`/company/${company.userId}`)
                                            }} className="overflow-hidden cursor-pointer w-[5rem] rounded-md h-[5rem]">
                                                <img src={company.companyLogo} className="w-full h-full" alt="" />
                                            </div>
                                                : <div onClick={() => {
                                                    navigate(`/company/${company.userId}`)
                                                }} className="cursor-pointer w-[5rem] flex justify-center items-center rounded-md h-[5rem] bg-blue-600">
                                                    <p className="font-bold text-[2.5rem] text-white">{company.companyName.toUpperCase()[0]}</p>
                                                </div>
                                        }

                                        <div className="flex-grow flex-1">
                                            <p onClick={() => {
                                                navigate(`/company/${company.userId}`)
                                            }} className="cursor-pointer hover:text-[#00b14f] font-bold w-full text-[1rem]">{company.companyName}</p>
                                        </div>

                                    </div>
                                    <p className="mt-4">{company.companyDescription}</p>
                                </div>
                            )
                        })
                        : <p className="text-[1.5rem] left-[50%] translate-x-[-50%] relative">
                            Không có công ty nào
                        </p>
                }
            </div>
            {
                companyList.length != 0 && <div className="self-center my-4">
                    <Pagination page={page} onSelect={(e) => {
                        console.log(e)
                    }} onChange={(e, value) => {
                        setPage(value)
                    }} count={totalPage} shape="rounded" />
                </div>
            }
        </div>
    )
}