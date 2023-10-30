import { BaseEntity, Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity()
export abstract class CustomBaseEntity extends BaseEntity<CustomBaseEntity, 'id'> {
	@PrimaryKey()
	id!: number;

	@Property()
	createdAt: Date = new Date();

	@Property({ onUpdate: () => new Date() })
	updatedAt: Date = new Date();

	constructor(data: Partial<CustomBaseEntity>) {
		super();

		Object.assign(this, data);
	}
}
