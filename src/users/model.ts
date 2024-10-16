export default class User {
	private username = "";
	private email = "";
	constructor(username: string, email: string) {
		this.username = username;
		this.email = email;
	}

	public static createUser(username: string, email: string) {
		if (!username || !email) throw 1;
		return new User(username, email);
	}

	public getName() {
		return this.username;
	}
	public getEmail() {
		return this.email;
	}
}
