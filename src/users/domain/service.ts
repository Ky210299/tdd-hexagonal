import type User from "./model";
import { UserId } from "./model";
import UserRepository from "./repository";

export default class UserService {
	private readonly repository: UserRepository;

	constructor(repository: UserRepository) {
		this.repository = repository;
	}

	public async saveUser(user: User) {
		await this.repository.save(user);
	}
	public async findUser(id: UserId) {
		return await this.repository.find(id);
	}

	public async findAllUsers() {
		return await this.repository.findAll();
	}
}
