import { StatusRepository } from '../database/status.repository';
import { Status } from '../entities/status.entity';

export class GetStatusesUseCase {
	async execute(): Promise<Status[]> {
		const statusRepository = new StatusRepository();

		return statusRepository.findAll({ fields: ['createdAt', 'responseTime'] });
	}
}
