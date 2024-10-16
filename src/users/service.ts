import type User from "./model";
export default class UserService {
	private readonly user: User;
	constructor(user: User) {
		this.user = user;
	}

	public getTotalFollowers(): number {
		return 0;
	}
	public getTotalFolloweds(): number {
		return 0;
	}

	public followUser(followed: User): void {
		return
		
	}
}
