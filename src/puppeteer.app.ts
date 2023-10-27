import puppeteer from 'puppeteer';

export class PuppeteerApp {
  private count = 0;

	async execute() {
		await this.check();

		setTimeout(async () => {
			await this.execute();
		}, 500);
	}

	private async check() {
		{
			const browser = await puppeteer.launch({
				headless: 'new',
				timeout: 1000
			});

			const page = await browser.newPage();

			await page.goto('https://drackp2m.github.io/set-online');

			await page.setViewport({ width: 600, height: 800 });

			const text = await page.waitForSelector('.flex-row.justify-between p:nth-child(2)');

			const cardPositions = this.getThreeRandomNumbersBetweenOneAndTwelve();

			for (const position of cardPositions) {
				const card = await page.waitForSelector(`#card-game set-card:nth-child(${position})`);

				await card?.click();

        // await page.screenshot({ path: `./snapshot_${position}.png` });
			}

			const wrongSets = (await text?.evaluate(el => el.textContent))?.split(':')[1];

			await browser.close();

			const result = wrongSets === '0';

			const now = new Date();
			let time = '';
			time += now.getHours().toString().padStart(2, '0') + ':';
			time += now.getMinutes().toString().padStart(2, '0') + ':';
			time += now.getSeconds().toString().padStart(2, '0');

			console.log(`[${time}] ` + (result ? 'Good luck' : 'Bad luck') + ` checking cards: ${cardPositions.join(',')}.`)
      
      this.count++;
      if (result) {
        console.log(`${this.count} trys...`);
        throw new Error('error');
      }

			return result;
		}
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
}

const app = new PuppeteerApp();

app.execute();
