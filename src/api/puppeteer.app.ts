import { MikroORM } from '@mikro-orm/core';
import { EntityRepository } from '@mikro-orm/sqlite';
import puppeteer from 'puppeteer';

import config from './database/mikro-orm.config';
import { Status } from './entities/status.entity';
import { GetTimeByIntervalUseCase } from './use-cases/get-time-by-interval.use-case';

export class PuppeteerApp {
	private readonly checkInterval = 15;
	private repository!: EntityRepository<Status>;

	private count = 0;

	constructor() {
		this.initMikroOrm();
	}

	async execute() {
		const getTimeByInterval = new GetTimeByIntervalUseCase();

		getTimeByInterval.execute(this.checkInterval).subscribe(async (date) => {
			console.log(date);

			const checkTime = await this.check();

			console.log(checkTime);

			const entity = new Status({
				responseTime: checkTime || this.checkInterval * 1000,
				createdAt: date,
				updatedAt: date,
			});

			this.repository.nativeInsert(entity);
		});
	}

	private async check(): Promise<number | null> {
		const startDate = new Date();

		{
			const browser = await puppeteer.launch({
				headless: 'new',
				timeout: 1000,
			});

			const page = await browser.newPage();

			await page.goto('https://drackp2m.github.io/set-online');

			await page.setViewport({ width: 600, height: 800 });

			try {
				const text = await page.waitForSelector('.flex-row.justify-between p:nth-child(2)');

				const cardPositions = this.getThreeRandomNumbersBetweenOneAndTwelve();

				for (const position of cardPositions) {
					const card = await page.waitForSelector(
						`#card-game set-card:nth-child(${position}) div.container`,
					);

					await card?.evaluate((el) => el.click());

					// await page.screenshot({ path: `./snapshot_${position}.png` });
				}

				await page.waitForNetworkIdle();

				const wrongSets = (await text?.evaluate((el) => el.textContent))?.split(':')[1];

				const result = wrongSets === '0';

				await browser.close();

				console.log(
					`[${this.getTime()}] ` +
						(result ? 'Good luck' : 'Bad luck') +
						` checking cards: ${cardPositions.join(',')}.`,
				);

				this.count++;
				if (result) {
					console.log(`${this.count} trys...`);
					throw new Error('error');
				}

				// return result ? new Date().getTime() - startDate.getTime() : null;
				return new Date().getTime() - startDate.getTime();
			} catch (e) {
				return null;
			}
		}
	}

	private async initMikroOrm(): Promise<void> {
		const orm = await MikroORM.init(config);

		this.repository = orm.em.fork().getRepository(Status);
	}

	private getThreeRandomNumbersBetweenOneAndTwelve(): number[] {
		const numbers: number[] = [];

		while (numbers.length < 3) {
			const number = Math.floor(Math.random() * 12) + 1;

			if (!numbers.includes(number)) {
				numbers.push(number);
			}
		}

		return numbers;
	}

	private getTime(): string {
		const now = new Date();
		let time = '';
		time += now.getHours().toString().padStart(2, '0') + ':';
		time += now.getMinutes().toString().padStart(2, '0') + ':';
		time += now.getSeconds().toString().padStart(2, '0');

		return time;
	}
}

const app = new PuppeteerApp();

app.execute();
