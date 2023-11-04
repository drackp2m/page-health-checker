import { BarElement, CategoryScale, Chart as ChartJS, LinearScale, Tooltip } from 'chart.js';
import { Component } from 'preact';
import React from 'react';
import { Chart } from 'react-chartjs-2';

import { getStatuses } from '../../services/statuses.service';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip);

interface State {
	data: {
		labels: string[];
		datasets: { data: number[]; backgroundColor: string }[];
	};
}

export class AppChart extends Component<{}, State> {
	private readonly options = {
		responsive: true,
		scales: {
			x: {
				display: false,
				grid: {
					display: false,
				},
			},
		},
	};

	constructor() {
		super();
		this.state = { data: { labels: [], datasets: [] } };
	}

	async componentDidMount() {
		try {
			const res = await getStatuses();
			const statuses: { id: string; responseTime: number; createdAt: string }[] = JSON.parse(res);

			const labels = statuses?.map((item) => new Date(item.createdAt).toString()).slice(20, 180);
			const datasets = [
				{
					data: statuses?.map((item) => item.responseTime / 1000).slice(20, 180),
					backgroundColor: 'rgba(255, 99, 132, 0.5)',
				},
			];

			this.setState({ data: { labels, datasets } });
		} catch (error) {
			console.error(error);
		}
	}

	render() {
		return (
			<Chart type="bar" options={this.options} data={this.state.data} width={100} height={20} />
		);
	}
}
