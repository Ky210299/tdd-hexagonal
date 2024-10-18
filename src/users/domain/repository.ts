import User from "./model";
import { UserId, Username, UserEmail } from "./model";

export default interface UserRepository {
	save: (user: User) => Promise<void>;
	find: (id: UserId) => Promise<User | undefined>;
}
