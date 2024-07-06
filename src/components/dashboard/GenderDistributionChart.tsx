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

interface GenderDistributionChartProps {
  data: {
    [key: string]: {
      male: number;
      female: number;
      total: number;
    };
  };
}

export default function GenderDistributionChart({
  data,
}: GenderDistributionChartProps) {
  const chartData = {
    labels: Object.keys(data),
    datasets: [
      {
        label: "Male",
        data: Object.values(data).map((item) => item.male),
        backgroundColor: "#36A2EB",
      },
      {
        label: "Female",
        data: Object.values(data).map((item) => item.female),
        backgroundColor: "#FF6384",
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
