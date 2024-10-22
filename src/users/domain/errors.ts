const ERRORS_CODE = {
	INVALID_USER_ID: 1,
	INVALID_USERNAME: 2,
	INVALID_USER_EMAIL: 3,
};

export class UserError extends Error {}

export class InvalidUserIdError extends UserError {
	public readonly name: string;
	public readonly code: number;
	constructor(msg: string = "Invalid ID") {
		super(msg);
		this.name = "invalid_user_id_error";
		this.code = ERRORS_CODE.INVALID_USER_ID;
	}
}

export class InvalidUsernameError extends UserError {
	public readonly name: string;
	public readonly code: number;
	constructor(msg: string = "Invalid username") {
		super(msg);
		this.name = "invalid_username_error";
		this.code = ERRORS_CODE.INVALID_USERNAME;
	}
}

export class InvalidUserEmailError extends UserError {
	public readonly name: string;
	public readonly code: number;
	constructor(msg: string = "Invalid email") {
		super(msg);
		this.name = "invalid_user_email_error";
		this.code = ERRORS_CODE.INVALID_USER_EMAIL;
	}
}
