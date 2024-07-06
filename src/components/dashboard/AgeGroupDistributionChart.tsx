import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface AgeGroupDistributionChartProps {
  data: {
    [key: string]: {
      ageGroup1: number;
      ageGroup2: number;
      ageGroup3: number;
    };
  };
}

export default function AgeGroupDistributionChart({
  data,
}: AgeGroupDistributionChartProps) {
  const chartData = {
    labels: Object.keys(data),
    datasets: [
      {
        label: "Age 18-30",
        data: Object.values(data).map((item) => item.ageGroup1),
        backgroundColor: "#FF6384",
      },
      {
        label: "Age 30-50",
        data: Object.values(data).map((item) => item.ageGroup2),
        backgroundColor: "#36A2EB",
      },
      {
        label: "Age 50-70",
        data: Object.values(data).map((item) => item.ageGroup3),
        backgroundColor: "#FFCE56",
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      x: { stacked: true },
      y: { stacked: true },
    },
    plugins: {
      legend: {
        position: "top" as const,
      },
    },
    borderRadius: 8,
  };

  return <Bar data={chartData} options={options} />;
}
