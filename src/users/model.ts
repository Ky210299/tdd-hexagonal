import UserService from "./service";

export default class User {
	private readonly id;
	private readonly username;
	private readonly email;
	private readonly service: UserService;

	constructor(uuid: string, username: string, email: string) {
		if (!username || !email || !uuid) throw 1;
		else if (typeof username !== "string" || !User.isValidUsername(username)) throw 1;
		else if (typeof email !== "string" || !User.isValidEmail(email)) throw 1;
		else if (typeof uuid !== "string" || !User.isValidUUID(uuid)) throw 1;

		this.id = "";
		this.username = username;
		this.email = email;
		this.service = new UserService(this);
	}

	public static createUser(uuid: string, username: string, email: string) {
		return new User(uuid, username, email);
	}

	public getTotalFollowers(): number {
		return this.service.getTotalFollowers();
	}

	public getTotalFolloweds(): number {
		return this.service.getTotalFolloweds();
	}

	public getListOfFollowers(): User[] {
		return [];
	}
	public getListOfFolloweds(): User[] {
		return [];
	}

	public followTo(user: User): void {
		if (user.id === this.id) throw 1;
		this.service.followUser(user);
	}

	public unfollowTo(user: User): void {
		if (user.id === this.id) throw 1;
		this.service.unfollowUser(user);
	}

	public static isValidUUID(uuid: string): boolean {
		const RegExpForUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;
		return RegExpForUUID.test(uuid);
	}

	public static isValidUsername(username: string): boolean {
		const RegExpForUsername = /^[a-zA-Z0-9_]+$/;
		return RegExpForUsername.test(username);
	}
	public static isValidEmail(email: string): boolean {
		const RegExpForEmail =
			/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
		return RegExpForEmail.test(email);
	}

	public getName() {
		return this.username;
	}
	public getEmail() {
		return this.email;
	}
}
