import User, { UserId, Username, UserEmail } from "../domain/model";
import UserRepository from "../domain/repository";

type FollowRelation = {
	followerId: UserId;
	followedId: UserId;
};
export default class InMemoryUserRepository implements UserRepository {
	private readonly usersDb: Array<User> = [];
	private readonly followRelationsDb: Array<FollowRelation> = [];

	public async save(user: User) {
		this.usersDb.push(user);
	}
	public async find(id: UserId) {
		return this.usersDb.find((user) => user.getID().value === id.value);
	}

	public async findAll() {
		return this.usersDb.slice();
	}

	public async addFollowRelation(followerId: UserId, followedId: UserId) {
		this.followRelationsDb.push({ followerId: followerId, followedId: followedId });
	}

	public async findAllFollowersOfUser(userId: UserId) {
		const user1 = new User("123e4567-e89b-12d3-a456-426655440000", "rob", "rob@mail.com");
		const user2 = new User("123e4567-e89b-12d3-a456-42665544000a", "Jhon", "jhon@mail.com");
		return [user1, user2]
	}
}
