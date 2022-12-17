import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: false,
    },
  },
};

export function BarChart({ data }) {
  const labels = ["1hr", "2hr", "3hr", "4hr", "5hr", "6hr", "7hr"];

  const testData = {
    labels,
    datasets: [
      {
        label: data.label,
        data: data.data,
        borderColor: data.borderColor,
        backgroundColor: data.backgroundColor,
      },
    ],
  };
  return <Line options={options} data={testData} />;
}
