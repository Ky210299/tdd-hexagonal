import type User from "./model";
import UserRepository from "./repository";

export default class UserService {
	private readonly repository: UserRepository;

	constructor(repository: UserRepository) {
		this.repository = repository;
	}
}
