import { Status } from '../entities/status.entity';

import { BaseRepository } from './base.repository';

export class StatusRepository extends BaseRepository<Status> {
	constructor() {
		super(Status.name);
	}

	async findAll(): Promise<Status[]> {
		return (await this.getRepository()).findAll();
	}
}
