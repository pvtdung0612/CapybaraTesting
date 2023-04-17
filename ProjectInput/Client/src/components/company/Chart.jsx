import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  defaults,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { faker } from "@faker-js/faker";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
//   responsive: true,
  maintainAspectRatio: false,

  // Phần trăm độ rộng của 
  categoryPercentage: 0.9,
  categorySpacing: 100,

  // Set chiều dày cột cố định là pixel (mất gap giữa 2 cột)
//   barThickness: 40,
  
  // Set chiều dày cột theo phần trăm
  barPercentage: 0.8,

  plugins: {
    maintainAspectRatio: false,
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: "Chart.js Bar Chart",
      font: {
        size: 20,
      },
    },
    defaultFontSize: (defaults.font.size = 16),
  },
  layout: { padding: 10 },
};

const labels = ["January", "February", "March", "April", "May", "June", "July"];

export const data = {
  labels,
  datasets: [
    {
      label: "CV đã nhận",
      data: labels.map(() => faker.datatype.number({ min: 0, max: 100 })),
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
    {
      label: "CV đã xử lý",
      data: labels.map(() => faker.datatype.number({ min: 0, max: 100 })),
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
  ],
};

export default function Chart() {
  return <div style={{
    position: "relative",
    width: "100%",
    height: "17rem"
  }}>
    <Bar options={options} data={data}/>
  </div>;
}
