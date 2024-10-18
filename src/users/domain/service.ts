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

	public async findUser(id: string) {
		return await this.repository.find(new UserId(id));
	}

	public async findAllUsers() {
		return await this.repository.findAll();
	}

	public async follow(followerId: string, followedId: string) {
		if (followerId === followedId) throw "follow it self";
	}
}
