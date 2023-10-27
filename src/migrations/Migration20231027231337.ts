import { Migration } from '@mikro-orm/migrations';

export class Migration20231027231337 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table `custom_base_entity` (`id` integer not null primary key autoincrement, `created_at` datetime not null, `updated_at` datetime not null);');

    this.addSql('create table `status` (`id` integer not null primary key autoincrement, `created_at` datetime not null, `updated_at` datetime not null, `response_time` integer not null);');
  }

}
