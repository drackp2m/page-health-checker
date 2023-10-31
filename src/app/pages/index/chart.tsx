import {
	BarElement,
	CategoryScale,
	Chart as ChartJS,
	Legend,
	LinearScale,
	Title,
	Tooltip,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const options = {
	responsive: true,
	plugins: {
		legend: {
			display: false,
		},
	},
	scales: {
		x: {
			grid: {
				display: false,
			},
		},
		y: {
			display: false,
		},
	},
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

export const data = {
	labels,
	datasets: [
		{
			label: 'Dataset 1',
			data: labels.map(() => Math.random() * 1000),
			backgroundColor: 'rgba(255, 99, 132, 0.5)',
		},
	],
};

try {
	fetch('http://localhost:3300/stats').then(async (res) => {
		console.log(await res.text());
	});
} catch (error) {
	console.error(error);
}

export function AppChart() {
	return <Bar options={options} data={data} />;
}
