import React, { useEffect, useState } from 'react';
import {
    Chart as ChartJS,
    LinearScale,
    PointElement,
    Tooltip,
    Legend,
    ArcElement,
} from 'chart.js';
import { Bubble, Doughnut } from 'react-chartjs-2';
import { faker } from '@faker-js/faker';
import axios from 'axios';
import config from '../../../config.json';
import Authentication from 'services/Authentication/Authentication';
import { set } from 'react-hook-form';

ChartJS.register(ArcElement, LinearScale, PointElement, Tooltip, Legend);

export default function UserSummaryChart({statisticData = {candidate: 0, company: 0}}) {
    const [chartData, setChartData] = useState({
        labels: ['Ứng viên', 'Công ty'],
        datasets: [
            {
                label: 'Số lượng',
                data: [300, 50],
                backgroundColor: [
                    'rgb(255, 99, 132)',
                    'rgb(54, 162, 235)'
                  ],
                hoverOffset: 4,
                borderWidth: 0
            }
        ],
    })

    useEffect(() => {
        setChartData({
            labels: ['Ứng viên', 'Công ty'],
            datasets: [
                {
                    label: 'Số lượng',
                    data: [statisticData.company, statisticData.company],
                    backgroundColor: [
                        'rgb(255, 99, 132)',
                        'rgb(54, 162, 235)'
                      ],
                    hoverOffset: 4,
                    borderWidth: 0
                }
            ],
        })
    }, [statisticData])

    const options = {
        plugins: {
            responsive: true,
            maintainAspectRatio: false,
            title: {
                display: false,
                text: 'Số lượng người dùng',
                align: 'start'
            },
            legend: {
                display: false
            }
        },
        width: 100,
        height: 100
    };

    const data = {
        labels: ['Ứng viên', 'Công ty'],
        datasets: [
            {
                label: 'Số lượng',
                data: [300, 50],
                backgroundColor: [
                    'rgb(255, 99, 132)',
                    'rgb(54, 162, 235)'
                  ],
                hoverOffset: 4,
                borderWidth: 0
            }
        ],
    };

    return <Doughnut options={options} data={chartData} />;
}
