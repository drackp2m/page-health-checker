import {
	BarElement,
	CategoryScale,
	Chart as ChartJS,
	Legend,
	LinearScale,
	Title,
	Tooltip,
} from 'chart.js';
import { useState } from 'react';
import { Chart } from 'react-chartjs-2';

import { getStatuses } from '../../services/statuses.service';

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
			display: false,
			grid: {
				display: false,
			},
		},
		y: {
			display: false,
		},
	},
};

export const AppChart = () => {
	const [data, setData] = useState({ labels: [], datasets: [] });

	try {
		getStatuses().then((res) => {
			const data = { labels: [], datasets: [] };
			const statuses: { id: string; responseTime: number; createdAt: string }[] = JSON.parse(res);

			console.log(statuses);

			data.labels = statuses?.map((item) => new Date(item.createdAt));
			data.datasets.push({
				data: statuses?.map((item) => item.responseTime),
				backgroundColor: 'rgba(255, 99, 132, 0.5)',
			});

			setData(data);
		});
	} catch (error) {
		console.error(error);
	}

	return <Chart type="bar" options={options} data={data} />;
};
