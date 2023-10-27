import { EntityRepository, MikroORM } from '@mikro-orm/core';

import { CustomBaseEntity } from '../entities/base.entity';

import config from './mikro-orm.config';

export class BaseRepository<T extends CustomBaseEntity> {
	private repository!: Promise<EntityRepository<T>>;

	constructor(entityName: string) {
		this.repository = MikroORM.init(config).then((orm) =>
			orm.em.fork().getRepository<T>(entityName),
		);
	}

	async getRepository(): Promise<EntityRepository<T>> {
		return this.repository;
	}
}
