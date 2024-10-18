export default class User {
	private readonly id: string;
	private username: string;
	private email: string;

	constructor(uuid: string, username: string, email: string) {
		if (!User.isValidUsername(username)) throw 1;
		else if (!User.isValidEmail(email)) throw 1;
		else if (!User.isValidUUID(uuid)) throw 1;

		this.id = uuid;
		this.username = username;
		this.email = email;
	}

	public static createUser(uuid: string, username: string, email: string) {
		return new User(uuid, username, email);
	}

	public getName() {
		return this.username;
	}

	public getEmail() {
		return this.email;
	}
	public getID() {
		return this.id;
	}

	public changeUsername(newUsername: string) {
		if (newUsername === this.username) throw 1;
		else if (!User.isValidUsername(newUsername)) throw 1;
		else this.username = newUsername;
	}

	public changeEmail(newEmail: string) {
		if (newEmail === this.email) throw 1;
		else if (!User.isValidEmail(newEmail)) throw 1;
		else this.email = newEmail;
	}

	private static isValidUUID(uuid: string): boolean {
		if (!uuid || typeof uuid !== "string") return false;
		const RegExpForUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;
		return RegExpForUUID.test(uuid);
	}

	private static isValidUsername(username: string): boolean {
		if (!username || typeof username !== "string") return false;
		const RegExpForUsername = /^[a-zA-Z0-9_]+$/;
		return RegExpForUsername.test(username);
	}

	private static isValidEmail(email: string): boolean {
		if (!email || typeof email !== "string") return false;
		const RegExpForEmail =
			/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
		return RegExpForEmail.test(email);
	}
}
