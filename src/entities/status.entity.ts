import { Entity, Property } from '@mikro-orm/core';

import { CustomBaseEntity } from './base.entity';

@Entity()
export class Status extends CustomBaseEntity {
	@Property()
	responseTime!: number;

	constructor(data: Partial<Status>) {
		super();
		Object.assign(this, data);
	}
}
