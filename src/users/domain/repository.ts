import User from "./model";
import { UserId, Username, UserEmail } from "./model";

export default interface UserRepository {
	save: (user: User) => Promise<void>;
	find: (id: UserId) => Promise<User | undefined>;
	findAll: () => Promise<Array<User>>;
	addFollowRelation: (followerId: UserId, followedId: UserId) => Promise<void>;
	findAllFollowersOfUser: (id: UserId) => Promise<Array<User>>;
	findAllFollowedsByUser: (id: UserId) => Promise<Array<User>>;
	isFollowing: (followerID: UserId, FollowedId: UserId) => Promise<boolean>;
	updateUser: (userId: UserId, newUserData: User) => Promise<void>;
}
