import React, { useEffect, useState } from 'react'
import UserGrowthChart from './UserGrowthChart'
import UserSummaryChart from './UserSummaryChart'
import CompanyIcon from './companyIcon.svg'
import CandidateIcon from './candidateIcon.svg'
import Spinner from 'components/components/Spinner'
import JobPostedChart from './JobPostedChart'
import { toast } from 'react-toastify'
import Authentication from 'services/Authentication/Authentication'
import config from '../../../config.json'
import axios from 'axios'

function UserGrowthChartField() {
    const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
    const [selectedMonth, setSelectedMonth] = useState(months[0])

    const years = [2023, 2022, 2021, 2020]
    const [selectedYear, setSelectedYear] = useState(years[0])

    const statisticalUnit = ['Tháng', 'Năm']
    const [selectedStatisticalUnit, setSelectedStatisticalUnit] = useState(statisticalUnit[0])

    return (
        <div className="flex bg-white w-2/3 h-[20rem] px-4 py-4 flex-col rounded">
            <div className='flex justify-between items-start'>
                <p className='font-bold mb-[2rem]'>Tăng trưởng người dùng</p>
                <div className="flex items-center gap-[0.5rem]">
                    <Spinner options={statisticalUnit} selected={selectedStatisticalUnit}
                        setSelected={(value) => {
                            setSelectedStatisticalUnit(value)
                            if (value == statisticalUnit[1]) {
                                setSelectedMonth(0)
                            } else {
                                setSelectedMonth(months[0])
                            }
                        }} />
                    {
                        (selectedStatisticalUnit == statisticalUnit[0]) ? <Spinner options={months} selected={selectedMonth}
                            setSelected={setSelectedMonth} /> : <></>}
                    <Spinner options={years} selected={selectedYear} setSelected={setSelectedYear} />
                </div>
            </div>
            <div className='w-full flex-grow h-[80%]'>
                <UserGrowthChart month={selectedMonth} year={selectedYear} />
            </div>
        </div>
    )
}

function JobPostedChartField() {
    const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
    const [selectedMonth, setSelectedMonth] = useState(months[0])

    const years = [2023, 2022, 2021, 2020]
    const [selectedYear, setSelectedYear] = useState(years[0])

    const statisticalUnit = ['Tháng', 'Năm']
    const [selectedStatisticalUnit, setSelectedStatisticalUnit] = useState(statisticalUnit[0])

    return (
        <div className='w-3/4 flex-1 h-[18rem] bg-white px-4 py-4 rounded'>
            <div className='flex justify-between items-start'>
                <p className='font-bold mb-[2rem]'>Thống kê bài viết</p>
                <div className="flex items-center gap-[0.5rem]">
                    <Spinner options={statisticalUnit} selected={selectedStatisticalUnit}
                        setSelected={(value) => {
                            setSelectedStatisticalUnit(value)
                            if (value == statisticalUnit[1]) {
                                setSelectedMonth(0)
                            } else {
                                setSelectedMonth(months[0])
                            }
                        }} />
                    {
                        (selectedStatisticalUnit == statisticalUnit[0]) ? <Spinner options={months} selected={selectedMonth}
                            setSelected={setSelectedMonth} /> : <></>}
                    <Spinner options={years} selected={selectedYear} setSelected={setSelectedYear} />
                </div>
            </div>
            <div className='w-full h-[80%]'>
                <JobPostedChart month={selectedMonth} year={selectedYear}/>
            </div>
        </div>
    )
}

function UserSummaryChartField() {
    const [statisticData, setStatisticData] = useState({
        candidate: 0, company: 0
    })

    useEffect(() => {
        axios({
            method: 'GET',
            url: `${config.server.domain}/user/count`,
            headers: {
                Authorization: Authentication.generateAuthorizationHeader()
            }
        }).then((response) => {
            setStatisticData({
                candidate: response.data.candidate,
                company: response.data.company
            })
        })
    }, [])

    return (
        <div className="relative justify-between flex flex-col w-[32%] min-w-1/3 bg-white px-4 py-4 rounded">
            <p className="font-bold">Số lượng người dùng</p>
            <div className="inline-block">
                <div className="w-full h-[10rem] flex justify-center items-center">
                    <UserSummaryChart statisticData={statisticData}/>
                </div>
            </div>
            <div className='flex justify-between px-[1rem]'>
                <div className='flex justify-between items-center'>
                    <div className="relative top-[0rem] bg-[#eaf0fe] inline-block px-3 py-3 rounded-full">
                        <img className="w-6 h-6" src={CompanyIcon} alt="" />
                    </div>
                    <p className='ml-[0.5rem]'>{statisticData.company}</p>
                </div>
                <div className='flex justify-center items-center'>
                    <div className="relative top-[0rem] bg-[#eaf0fe] block px-3 py-3 rounded-full">
                        <img className="w-6 h-6" src={CandidateIcon} alt="" />
                    </div>
                    <p className='ml-[0.5rem]'>{statisticData.candidate}</p>
                </div>
            </div>
        </div>
    )
}

export default function Overview() {
    const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]


    const years = [2023, 2022, 2021, 2020]
    const [selectedYear, setSelectedYear] = useState(years[0])

    const statisticalUnit = ['Tháng', 'Năm']
    const [selectedStatisticalUnit, setSelectedStatisticalUnit] = useState(statisticalUnit[0])

    const [numberOfJob, setNumberOfJob] = useState(0)
    useEffect(() => {
        axios({
            method: "get",
            url: `${config.server.domain}/job/countAll`,
            headers: {
                Authorization: Authentication.generateAuthorizationHeader()
            }
        }).then((response) => {
            setNumberOfJob(response.data)
        })
    }, [])

    return (
        <div className="px-4 py-4 max-w-full w-full h-full overflow-hidden">
            <div className="flex flex-wrap w-full gap-4">
                <UserGrowthChartField />
                <UserSummaryChartField />
                <div className="min-w-[18rem] items-center border-2 shadow-sm border-[#ecebee] px-4 py-4 bg-white rounded flex flex-col">
                    <p className="font-bold">Số lượng bài viết</p>
                    <p className="relative text-[3rem] mx-[2rem] font-bold my-auto">{numberOfJob}</p>
                </div>
                <JobPostedChartField />
            </div>
        </div>
    )
}