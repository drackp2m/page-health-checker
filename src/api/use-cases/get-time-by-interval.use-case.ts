import { Subject } from 'rxjs';

export class GetTimeByIntervalUseCase {
	private subject = new Subject<Date>();

	execute(interval: number): Subject<Date> {
		const nowTime = new Date().getTime();
		const nextSecond = Math.ceil((nowTime + 10) / (interval * 1000)) * interval * 1000;
		const timeUntilNextSecond = nextSecond - nowTime;

		setTimeout(async () => {
			const now = new Date();
			now.setMilliseconds(0);
			this.subject.next(now);

			this.execute(interval);
		}, timeUntilNextSecond);

		return this.subject;
	}
}
