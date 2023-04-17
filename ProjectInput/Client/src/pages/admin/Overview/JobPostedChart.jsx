import { faker } from "@faker-js/faker";
import { Bar, Line } from "react-chartjs-2";
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
    LineElement
} from 'chart.js';
import axios from "axios";
import Authentication from "services/Authentication/Authentication";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend, LineElement
);

export default function JobPostedChart({ month = 0, year = 2023 }) {
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        barPercentage : 0.5,
        plugins: {
            title: {
                display: false,
                text: 'Tăng trưởng người dùng',
            },
            legend: {
                display: false
            }
        },
        scales: {
            x: {
                // stacked: true,
            },
            y: {
                // stacked: true,
                suggestedMax: 50
            },
        },
    };

    let label = ['T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8', 'T9', 'T10', 'T11', 'T12']
    if (month != 0) {
        label = Array.from(Array(new Date(year, month, 0).getDate()).keys())
            .map((index) => `${index + 1}`)
    }

    const [chartData, setChartData] = useState({
        labels: label,
        datasets: [
            {
                label: 'Bài viết',
                data: [],
                backgroundColor: '#1a181f',
                borderRadius: 50,
                borderColor: "#000000",
                tension: 0,
                pointHitRadius: 0
                // stack: 'Stack 0',
            }
        ],
    })

    useEffect(() => {
        axios({
            method: 'GET',
            url: `${config.server.domain}/job/statistic?month=${month}&year=${year}`,
            headers: {
                Authorization: Authentication.generateAuthorizationHeader()
            }
        }).then((response) => {
            setChartData({
                labels: label,
                datasets: [
                    {
                        label: 'Bài viết',
                        data: response.data.map((item) => item.numberOfJob),
                        backgroundColor: '#1a181f',
                        borderRadius: 50,
                        borderColor: "#000000",
                        tension: 0,
                        pointHitRadius: 0
                        // stack: 'Stack 0',
                    }
                ],
            })
        })
    }, [month, year])

    return (
            <Line options={options} data={chartData}/>
    )
}