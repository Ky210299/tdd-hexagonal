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
		const RegExForUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;
		if (!RegExForUUID.test(uuid)) throw 1;

		return new User(uuid, username, email);
	}

	public getName() {
		return this.username;
	}
	public getEmail() {
		return this.email;
	}
}
