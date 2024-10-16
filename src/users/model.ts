export default class User {
	private readonly id;
	private username = "";
	private email = "";
	constructor(uuid: string, username: string, email: string) {
		this.id = "";
		this.username = username;
		this.email = email;
	}

	public static createUser(uuid: string, username: string, email: string) {
		if (!username || !email || !uuid) throw 1;

		if (typeof username !== "string") throw 1;
		if (typeof email !== "string") throw 1;
		if (typeof uuid !== "string") throw 1;

		const RegExpForUsername = /^[a-zA-Z0-9_]+$/;
		if (!RegExpForUsername.test(username)) throw 1;
		const RegExpForUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;
		if (!RegExpForUUID.test(uuid)) throw 1;

		const RegExpForEmail =
			/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
		if (!RegExpForEmail.test(email)) throw 1;

		return new User(uuid, username, email);
	}

	public getName() {
		return this.username;
	}
	public getEmail() {
		return this.email;
	}
}
