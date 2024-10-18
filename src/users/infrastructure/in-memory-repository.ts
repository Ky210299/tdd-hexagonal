import User, { UserId, Username, UserEmail } from "../domain/model";
import UserRepository from "../domain/repository";

export default class InMemoryUserRepository implements UserRepository {
	private readonly db: Array<User> = [];

	public async save(user: User) {
		this.db.push(user);
	}
	public async find(id: UserId) {
		return this.db.find((user) => user.getID().value === id.value);
	}

	public async findAll() {
		return this.db.slice();
	}
}
