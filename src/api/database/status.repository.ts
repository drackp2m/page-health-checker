import { FindOptions } from '@mikro-orm/core';

import { Status } from '../entities/status.entity';

import { BaseRepository } from './base.repository';

export class StatusRepository extends BaseRepository<Status> {
	constructor() {
		super(Status.name);
	}

	async findAll(options?: FindOptions<Status>): Promise<Status[]> {
		return (await this.getRepository()).findAll(options);
	}
}
