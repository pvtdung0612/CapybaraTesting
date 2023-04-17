import { faker } from "@faker-js/faker";
import { Bar } from "react-chartjs-2";
import React, { useEffect, useState } from "react";
import config from '../../../config.json'

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import axios from "axios";
import Authentication from "services/Authentication/Authentication";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export default function UserGrowthChart({ month = 0, year = 2023 }) {
    const [statisticData, setStatisticData] = useState()
    const [candidate, setCandidate] = useState([])
    const [company, setCompany] = useState([])

    let label = ['T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8', 'T9', 'T10', 'T11', 'T12']
    if (month != 0) {
        label = Array.from(Array(new Date(year, month, 0).getDate()).keys())
            .map((index) => `${index + 1}`)
    }

    const [chartData, setChartData] = useState({
        labels: label,
        datasets: [
            {
                label: 'Ứng viên',
                data: [],
                backgroundColor: '#3762ec',
                borderRadius: 50,
                // stack: 'Stack 1',
            },
            {
                label: 'Công ty',
                data: [],
                backgroundColor: '#1a181f',
                borderRadius: 50,
                // stack: 'Stack 0',
            }
        ],
    })

    useEffect(() => {
        axios({
            method: 'GET',
            url: `${config.server.domain}/user/statistic?month=${month}&year=${year}`,
            headers: {
                Authorization: Authentication.generateAuthorizationHeader()
            }
        }).then((res) => {
            console.log(res)
            setCandidate(res.data.candidate)
            setCompany(res.data.company)

            let labels = [""]
            setChartData({
                labels: label,
                datasets: [
                    {
                        label: 'Ứng viên',
                        data: res.data.candidate.map((item) => item.numberOfUser),
                        backgroundColor: '#3762ec',
                        borderRadius: 50,
                        // stack: 'Stack 1',
                    },
                    {
                        label: 'Công ty',
                        data: res.data.company.map((item) => item.numberOfUser),
                        backgroundColor: '#1a181f',
                        borderRadius: 50,
                        // stack: 'Stack 0',
                    }
                ],
            })
        })
    }, [month, year])

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        barPercentage: 0.5,
        data: {
            borderRadius: [50, 40]
        },
        plugins: {
            title: {
                display: false,
                text: 'Tăng trưởng người dùng',
            },
            legend: {
                display: true,
                padding: {
                    bottom: 20
                },
                labels: {
                    boxHeight: 15,
                    boxWidth: 15
                }
            }
        },
        scales: {
            x: {
                stacked: true,
            },
            y: {
                stacked: true,
                min: 0,
                suggestedMax: 4,
                ticks: {
                    // forces step size to be 50 units
                    stepSize: 1
                }
            },
        },
    };


    return (
        <Bar options={options} data={chartData} />
    )
}