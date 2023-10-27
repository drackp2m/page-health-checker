import { Migration } from '@mikro-orm/migrations';

export class Migration20231027154056 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table `status` (`id` integer not null primary key autoincrement, `created_at` text not null, `updated_at` text not null, `response_time` integer not null);');
  }

}
