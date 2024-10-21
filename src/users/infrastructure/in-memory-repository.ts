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
		this.followRelationsDb.push({ followerId, followedId });
	}

	public async findAllFollowersOfUser(userId: UserId) {
		const user1 = new User("123e4567-e89b-12d3-a456-426655440000", "rob", "rob@mail.com");
		const user2 = new User("123e4567-e89b-12d3-a456-42665544000a", "Jhon", "jhon@mail.com");
		return [user1, user2];
	}

	public async findAllFollowedsByUser(userId: UserId) {
		const user1 = new User("123e4567-e89b-12d3-a456-426655440000", "rob", "rob@mail.com");
		const user2 = new User("123e4567-e89b-12d3-a456-42665544000a", "Jhon", "jhon@mail.com");
		return [user1, user2];
	}

	public async isFollowing(followerId: UserId, followedId: UserId) {
		const isFollowing = this.followRelationsDb.some((relation) => {
			return (
				relation.followerId.value === followerId.value &&
				relation.followedId.value === followedId.value
			);
		});
		return isFollowing;
	}

	public async updateUser(userId: UserId, newUserData: User) {
		const userIndex = this.usersDb.findIndex((user) => user.getID().value === userId.value);
		if (userIndex === -1) throw 1;
		this.usersDb.splice(userIndex);
		this.usersDb.push(newUserData);
	}
}
