import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);
const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "",
    },
  },
};
interface Iprop{
yaxis: number[];
xaxis: string[];
}
const Graph = (props: Iprop) => {
  
  const labels = props.xaxis.map((item)=>item)
   
  const weatdata = {
    labels,
    datasets: [
      {
        fill: true,
        data: props.yaxis.map((item)=>item),
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
        pointRadius: 3,
      },
    ],
  };
  return (
    <>
      <Line options={options} data={weatdata} />
    </>
  );
};
export default Graph;
