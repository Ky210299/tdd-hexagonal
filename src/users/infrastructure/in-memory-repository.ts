import User, { UserId, Username, UserEmail } from "../domain/model";
import UserRepository from "../domain/repository";

export default class InMemoryUserRepository implements UserRepository {
	private readonly db: Record<string, User> = {};
	public async save(user: User) {
		this.db[user.getName().value] = user;
	}
	public async find(id: UserId) {
		const user = Object.values(this.db).find((user) => user.getID().value === id.value);
		return user;
	}
}
