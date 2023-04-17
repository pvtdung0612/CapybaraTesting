import Dashboard from "components/company/Dashboard";
import React, { useEffect, useState } from "react";
import Chart from "components/company/Chart";
import axios from "axios";
import config from "../../config.json";
import Authentication from "services/Authentication/Authentication";
import { Bar, Line } from "react-chartjs-2";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    LineElement,
    Filler
} from 'chart.js';
import { faker } from "@faker-js/faker";
import { toast } from "react-toastify";
import Spinner from "components/components/Spinner";

ChartJS.register(
    Filler,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend, LineElement
);

function ApplicationAnalysticChartLine() {
    const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
    const [selectedMonth, setSelectedMonth] = useState(months[0])

    const years = [2023, 2022, 2021, 2020]
    const [selectedYear, setSelectedYear] = useState(years[0])

    const statisticalUnit = ['Tháng', 'Năm']
    const [selectedStatisticalUnit, setSelectedStatisticalUnit] = useState(statisticalUnit[0])


    const options = {
        tension: 0.27,
        responsive: true,
        maintainAspectRatio: false,
        barPercentage: 0.5,
        plugins: {
            title: {
                display: false,
                text: 'Thống kê ứng tuyển',
            },
            legend: {
                display: true
            }
        },
        scales: {
            x: {
                // stacked: true,
            },
            y: {
                // stacked: true,
                ticks: {
                    // forces step size to be 50 units
                    stepSize: 1
                },
                suggestedMax: 20,
                suggestedMin: 0
            },
        },
    };

    let label = ['T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8', 'T9', 'T10', 'T11', 'T12']
    if (selectedMonth != 0) {
        label = Array.from(Array(new Date(selectedYear, selectedMonth, 0).getDate()).keys())
            .map((index) => `${index + 1}`)
    }

    const [chartData, setChartData] = useState({
        labels: label,
        datasets: [
            {
                fill: true,
                label: "Đơn ứng tuyển",
                data: [],
                backgroundColor: "#f66885",
                borderRadius: 50,
                borderColor: "#f66885",
                pointBackgroundColor: "#f66885",
                // pointRadius: 0
                // stack: 'Stack 0',
            }
        ],
    });

    useEffect(() => {
        axios({
            method: 'GET',
            url: `${config.server.domain}/job-application/statistic/chart?month=${selectedMonth}&year=${selectedYear}`,
            headers: {
                Authorization: Authentication.generateAuthorizationHeader()
            }
        }).then((response) => {
            console.log(response.data)
            console.log(response.data.slice(0, label.length).map((item) => item.numberOfApplication))
            if (selectedMonth != 0) {
                label = Array.from(Array(new Date(selectedYear, selectedMonth, 0).getDate()).keys())
                    .map((index) => `${index + 1}`)
            }
            setChartData({
                labels: label,
                datasets: [
                    {
                        label: 'Đơn ứng tuyển',
                        data: response.data.slice(0, label.length).map((item) => item.numberOfApplication),
                        backgroundColor: 'rgba(246, 104, 133, 0.2)',
                        borderRadius: 50,
                        borderColor: "#f66885",
                        pointBackgroundColor: "#f66885",
                        fill: true
                        // pointRadius: 0
                        // stack: 'Stack 0',
                    }
                ],
            })
        })
    }, [selectedMonth, selectedYear])

    return (
        <div className="h-full flex flex-col">
            <div className="flex items-center gap-[0.5rem]">
                <p className="font-bold mr-[1rem]">Thống kê đơn ứng tuyển</p>
                <Spinner options={statisticalUnit} selected={selectedStatisticalUnit}
                    setSelected={(value) => {
                        setSelectedStatisticalUnit(value)
                        if (value == statisticalUnit[1]) {
                            console.log("CALLED")
                            setSelectedMonth(0)
                        } else if (value == statisticalUnit[0]) {
                            console.log("CALLED")
                            setSelectedMonth(months[0])
                        }
                    }} />
                {
                    (selectedStatisticalUnit == statisticalUnit[0]) ? <Spinner options={months} selected={selectedMonth}
                        setSelected={setSelectedMonth} /> : <></>}
                <Spinner options={years} selected={selectedYear} setSelected={setSelectedYear} />
            </div>
            <div className="flex-[1] mt-4">
                <Line options={options} data={chartData} />
            </div>
        </div>
    )
}

function HomeCompany() {
    const [statisticData, setStatisticData] = useState({
        openJob: 0,
        totalJob: 0,
        incomingApplication: 0,
        repliedApplication: 0,
        star: 0
    })

    useEffect(() => {
        axios({
            method: 'GET',
            url: `${config.server.domain}/job-application/statistic`,
            headers: {
                Authorization: Authentication.generateAuthorizationHeader()
            }
        }).then((response) => {
            setStatisticData(response.data)
        }).catch((error) => {
            toast.error("Có lỗi xảy ra")
        })
    }, [])



    return (
        <Dashboard>
            <div className="flex h-full flex-col w-full rounded-md gap-4 p-4 overflow-hidden">
                <div>
                    <ul className="flex gap-5">
                        <li className="flex border-2 shadow-sm border-[#ecebee] flex-col gap-5 w-64 px-5 py-10 bg-white rounded">
                            <p className="text-3xl font-bold text-gray-800">
                                {statisticData.openJob}
                            </p>
                            <div className="flex justify-between">
                                <p className="text-base">Tin tuyển dụng đang mở</p>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="w-6 h-6"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M10.34 15.84c-.688-.06-1.386-.09-2.09-.09H7.5a4.5 4.5 0 110-9h.75c.704 0 1.402-.03 2.09-.09m0 9.18c.253.962.584 1.892.985 2.783.247.55.06 1.21-.463 1.511l-.657.38c-.551.318-1.26.117-1.527-.461a20.845 20.845 0 01-1.44-4.282m3.102.069a18.03 18.03 0 01-.59-4.59c0-1.586.205-3.124.59-4.59m0 9.18a23.848 23.848 0 018.835 2.535M10.34 6.66a23.847 23.847 0 008.835-2.535m0 0A23.74 23.74 0 0018.795 3m.38 1.125a23.91 23.91 0 011.014 5.395m-1.014 8.855c-.118.38-.245.754-.38 1.125m.38-1.125a23.91 23.91 0 001.014-5.395m0-3.46c.495.413.811 1.035.811 1.73 0 .695-.316 1.317-.811 1.73m0-3.46a24.347 24.347 0 010 3.46"
                                    />
                                </svg>
                            </div>
                        </li>

                        <li className="flex border-2 shadow-sm border-[#ecebee] flex-col gap-5 w-64 px-5 py-10 bg-white rounded">
                            <p className="text-3xl font-bold text-gray-800">
                                {statisticData.incomingApplication}
                            </p>
                            <div className="flex justify-between">
                                <p className="text-base">CV tiếp nhận</p>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="w-6 h-6"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184"
                                    />
                                </svg>
                            </div>
                        </li>

                        <li className="flex border-2 shadow-sm border-[#ecebee] flex-col gap-5 w-64 px-5 py-10 bg-white rounded">
                            <p className="text-3xl font-bold text-gray-800">
                                {statisticData.repliedApplication}
                            </p>
                            <div className="flex justify-between">
                                <p className="text-base">CV phản hồi</p>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="w-6 h-6"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M4.5 12.75l6 6 9-13.5"
                                    />
                                </svg>
                            </div>
                        </li>

                        <li className="flex border-2 shadow-sm border-[#ecebee] flex-col gap-5 w-64 px-5 py-10 bg-white rounded">
                            <p className="text-3xl font-bold text-gray-800">2</p>
                            <div className="flex justify-between">
                                <p className="text-base">CV ứng tuyển mới</p>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="w-6 h-6"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M9 8.25H7.5a2.25 2.25 0 00-2.25 2.25v9a2.25 2.25 0 002.25 2.25h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25H15M9 12l3 3m0 0l3-3m-3 3V2.25"
                                    />
                                </svg>
                            </div>
                        </li>
                    </ul>
                </div>
                <div className="border-2 shadow-sm border-[#ecebee] relative w-full bg-white p-4 rounded flex-[1]">
                    {/* <ApplicationAnalysticChart /> */}
                    <ApplicationAnalysticChartLine />
                </div>
            </div>
        </Dashboard>
    );
}
export default HomeCompany;
