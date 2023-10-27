import { Entity, Property } from '@mikro-orm/core';
import { BaseEntity } from './base.entity';

@Entity()
export class Status extends BaseEntity {
  @Property()
  responseTime!: number;

  constructor(data: Partial<Status>) {
    super();
    Object.assign(this, data);
  }
}
