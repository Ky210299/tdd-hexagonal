import User, { UserId, Username, UserEmail } from "../domain/model";
import UserRepository from "../domain/repository";

type FollowRelation = {
	follower: UserId;
	followed: UserId;
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
		this.followRelationsDb.push({ follower: followerId, followed: followedId });
	}

	public async findAllFollowersOfUser(userId: UserId) {
		const followersIds = this.followRelationsDb.map((relation) => {
			if (relation.followed.value === userId.value) {
				return relation.follower;
			}
		});
		const followers = followersIds.map((id) =>
			this.usersDb.find((user) => user.getID().value === id?.value),
		);
		return followers;
	}
}
