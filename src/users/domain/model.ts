import { InvalidUserEmailError, InvalidUserIdError, InvalidUsernameError } from "./errors";

export default class User {
	private readonly id: UserId;
	private username: Username;
	private email: UserEmail;

	constructor(id: string, username: string, email: string) {
		this.id = new UserId(id);
		this.username = new Username(username);
		this.email = new UserEmail(email);
	}

	public static createUser(id: string, username: string, email: string) {
		return new User(id, username, email);
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
		if (newUsername === this.username.value)
			throw new InvalidUsernameError("That's already the current username");
		else this.username = new Username(newUsername);
	}

	public changeEmail(newEmail: string) {
		if (newEmail === this.email.value)
			throw new InvalidUserEmailError("That's alredy the current email");
		else this.email = new UserEmail(newEmail);
	}
}

export class UserId {
	readonly value: string;

	constructor(id: string) {
		if (!UserId.isValidUUID(id)) throw new InvalidUserIdError();
		this.value = id;
	}
	private static isValidUUID(uuid: string): boolean {
		if (!uuid || typeof uuid !== "string") return false;
		const RegExpForUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;
		return RegExpForUUID.test(uuid);
	}
}

export class Username {
	readonly value: string;

	constructor(username: string) {
		if (!Username.isValidUsername(username)) throw new InvalidUsernameError();
		this.value = username;
	}
	private static isValidUsername(username: string): boolean {
		if (!username || typeof username !== "string") return false;
		const RegExpForUsername = /^[a-zA-Z0-9_]+$/;
		return RegExpForUsername.test(username);
	}
}

export class UserEmail {
	readonly value: string;

	constructor(email: string) {
		if (!UserEmail.isValidEmail(email)) throw new InvalidUserEmailError();
		this.value = email;
	}
	private static isValidEmail(email: string): boolean {
		if (!email || typeof email !== "string") return false;
		const RegExpForEmail =
			/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
		return RegExpForEmail.test(email);
	}
}
