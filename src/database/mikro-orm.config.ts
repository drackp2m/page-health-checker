import { Options } from '@mikro-orm/core';
import { SqlHighlighter } from '@mikro-orm/sql-highlighter';

import { Status } from '../entities/status.entity';

const config: Options = {
	type: 'sqlite',
	dbName: '.database/sqlite-3.db',
	entities: [Status],
	highlighter: new SqlHighlighter(),
	debug: false,
};

export default config;
