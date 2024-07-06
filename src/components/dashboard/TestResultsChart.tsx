import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

interface TestResultsChartProps {
  data: {
    Depressed: number;
    Negative: number;
    Normal: number;
  };
}

export default function TestResultsChart({ data }: TestResultsChartProps) {
  const chartData = {
    labels: ["Depressed", "Negative", "Normal"],
    datasets: [
      {
        data: [data.Depressed, data.Negative, data.Normal],
        backgroundColor: ["#f43f5e", "#3b82f6", "#10b981"],
        borderColor: ["#ffffff", "#ffffff", "#ffffff"],
        borderWidth: 0,
      },
    ],
  };

  const options = {
    responsive: true,
    cutout: "60%",
    plugins: {
      legend: {
        position: "bottom" as const,
      },
    },
  };

  return <Doughnut data={chartData} options={options} />;
}
