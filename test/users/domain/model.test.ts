import User from "../../../src/users/domain/model";
import { UserId, Username, UserEmail } from "../../../src/users/domain/model";
import * as UserError from "../../../src/users/domain/errors";

describe("Jest should work", () => {
	it("should work", () => {
		expect(1 + 1).toEqual(2);
	});
});

describe("Users Model", () => {
	const exampleUUID = "123e4567-e89b-12d3-a456-426655440000";
	const exampleEmail = "example@email.com";
	const exampleUsername = "Robert";
	describe("Create an user", () => {
		it("Should throw an error if not uuid, username or email is passed", () => {
			expect(
				() =>
					new User(null as unknown as string, null as unknown as string, null as unknown as string),
			).toThrow;
			expect(() => new User("", "", "")).toThrow();
			expect(
				() =>
					new User(
						undefined as unknown as string,
						undefined as unknown as string,
						undefined as unknown as string,
					),
			).toThrow();
		});

		it("Should throw an error if not valid uuid is passed", () => {
			expect(() => User.createUser("1 2 3 4 5", exampleUsername, exampleEmail)).toThrow(
				UserError.InvalidUserIdError,
			);

			expect(() => User.createUser("abc123abc", exampleUsername, exampleEmail)).toThrow(
				UserError.InvalidUserIdError,
			);

			expect(() => User.createUser("12-123-123", exampleUsername, exampleEmail)).toThrow(
				UserError.InvalidUserIdError,
			);

			expect(() => User.createUser("1234", exampleUsername, exampleEmail)).toThrow(
				UserError.InvalidUserIdError,
			);

			expect(() => User.createUser(1 as unknown as string, exampleUsername, exampleEmail)).toThrow(
				UserError.InvalidUserIdError,
			);

			expect(() =>
				User.createUser(true as unknown as string, exampleUsername, exampleEmail),
			).toThrow(UserError.InvalidUserIdError);

			expect(() => User.createUser({} as unknown as string, exampleUsername, exampleEmail)).toThrow(
				UserError.InvalidUserIdError,
			);
		});

		it("Should throw an error if not valid username", () => {
			expect(() => User.createUser(exampleUUID, 1 as unknown as string, exampleEmail)).toThrow(
				UserError.InvalidUsernameError,
			);
			expect(() => User.createUser(exampleUUID, true as unknown as string, exampleEmail)).toThrow(
				UserError.InvalidUsernameError,
			);
			expect(() => User.createUser(exampleUUID, "a s d f ", exampleEmail)).toThrow(
				UserError.InvalidUsernameError,
			);
			expect(() => User.createUser(exampleUUID, "a!@$", exampleEmail)).toThrow(
				UserError.InvalidUsernameError,
			);
			expect(() => User.createUser(exampleUUID, {} as unknown as string, exampleEmail)).toThrow(
				UserError.InvalidUsernameError,
			);

			expect(() => User.createUser(exampleUUID, "Robert", exampleEmail)).not.toThrow(
				UserError.InvalidUsernameError,
			);
			expect(() => User.createUser(exampleUUID, "Jhon", exampleEmail)).not.toThrow(
				UserError.InvalidUsernameError,
			);
			expect(() => User.createUser(exampleUUID, "Ky2102", exampleEmail)).not.toThrow(
				UserError.InvalidUsernameError,
			);
			expect(() => User.createUser(exampleUUID, "Act__2", exampleEmail)).not.toThrow(
				UserError.InvalidUsernameError,
			);
		});

		it("Should throw an error if not valid email is passed", () => {
			expect(() => User.createUser(exampleUUID, exampleUsername, 1 as unknown as string)).toThrow(
				UserError.InvalidUserEmailError,
			);

			expect(() => User.createUser(exampleUUID, exampleUsername, [] as unknown as string)).toThrow(
				UserError.InvalidUserEmailError,
			);

			expect(() => User.createUser(exampleUUID, exampleUsername, {} as unknown as string)).toThrow(
				UserError.InvalidUserEmailError,
			);

			expect(() =>
				User.createUser(exampleUUID, exampleUsername, true as unknown as string),
			).toThrow(UserError.InvalidUserEmailError);

			expect(() => User.createUser(exampleUUID, exampleUsername, "bademail")).toThrow(
				UserError.InvalidUserEmailError,
			);
			expect(() => User.createUser(exampleUUID, exampleUsername, "bad email")).toThrow(
				UserError.InvalidUserEmailError,
			);
			expect(() => User.createUser(exampleUUID, exampleUsername, "bademail.com")).toThrow(
				UserError.InvalidUserEmailError,
			);
			expect(() => User.createUser(exampleUUID, exampleUsername, "@email")).toThrow(
				UserError.InvalidUserEmailError,
			);
			expect(() => User.createUser(exampleUUID, exampleUsername, "bad@email.")).toThrow(
				UserError.InvalidUserEmailError,
			);
			expect(() => User.createUser(exampleUUID, exampleUsername, "bad@email!.com")).toThrow(
				UserError.InvalidUserEmailError,
			);
			expect(() => User.createUser(exampleUUID, exampleUsername, "bad.com@email")).toThrow(
				UserError.InvalidUserEmailError,
			);
			expect(() => User.createUser(exampleUUID, exampleUsername, "bad@@email.com")).toThrow(
				UserError.InvalidUserEmailError,
			);
			expect(() => User.createUser(exampleUUID, exampleUsername, "bad@email..com")).toThrow(
				UserError.InvalidUserEmailError,
			);
			expect(() => User.createUser(exampleUUID, exampleUsername, "用户@示例.email")).toThrow(
				UserError.InvalidUserEmailError,
			);
			expect(() => User.createUser(exampleUUID, exampleUsername, "bad@email")).toThrow(
				UserError.InvalidUserEmailError,
			);

			expect(() => User.createUser(exampleUUID, exampleUsername, "good@email.com")).not.toThrow();
			expect(() => User.createUser(exampleUUID, exampleUsername, "Jhon@email.com")).not.toThrow();
			expect(() => User.createUser(exampleUUID, exampleUsername, "Leo@email.cu")).not.toThrow();
			expect(() => User.createUser(exampleUUID, exampleUsername, "alf24@email.org")).not.toThrow();
		});

		it("Should return an user instance", () => {
			const newUser = User.createUser(exampleUUID, exampleUsername, exampleEmail);
			expect(newUser instanceof User).toBeTruthy();
		});

		it("The created user should have the passed id, username and email", () => {
			const newUser = User.createUser(exampleUUID, exampleUsername, exampleEmail);
			expect(newUser.getID().value === exampleUUID).toBeTruthy();
			expect(newUser.getEmail().value === exampleEmail).toBeTruthy();
			expect(newUser.getName().value === exampleUsername).toBeTruthy();
		});

		it("Should return error if the user try to change they username by the same or for an invalid username", () => {
			const user = new User(exampleUUID, exampleUsername, exampleEmail);
			expect(() => user.changeUsername(user.getName().value)).toThrow(
				UserError.InvalidUsernameError,
			);
			expect(() => user.changeUsername(1 as unknown as string)).toThrow(
				UserError.InvalidUsernameError,
			);
			expect(() => user.changeUsername([] as unknown as string)).toThrow(
				UserError.InvalidUsernameError,
			);
			expect(() => user.changeUsername({} as unknown as string)).toThrow(
				UserError.InvalidUsernameError,
			);
			expect(() => user.changeUsername(true as unknown as string)).toThrow(
				UserError.InvalidUsernameError,
			);
			expect(() => user.changeUsername(undefined as unknown as string)).toThrow(
				UserError.InvalidUsernameError,
			);
			expect(() => user.changeUsername(null as unknown as string)).toThrow(
				UserError.InvalidUsernameError,
			);
			expect(() => user.changeUsername("" as unknown as string)).toThrow(
				UserError.InvalidUsernameError,
			);
			expect(() => user.changeUsername("a s f g" as unknown as string)).toThrow(
				UserError.InvalidUsernameError,
			);
			expect(() => user.changeUsername("i@sf!" as unknown as string)).toThrow(
				UserError.InvalidUsernameError,
			);
		});

		it("Should throw an error if try to change the user email for an invalid email, or the same", () => {
			const user = new User(exampleUUID, exampleUsername, exampleEmail);
			expect(() => user.changeEmail(user.getEmail().value)).toThrow(
				UserError.InvalidUserEmailError,
			);
			expect(() => user.changeEmail([] as unknown as string)).toThrow(
				UserError.InvalidUserEmailError,
			);
			expect(() => user.changeEmail({} as unknown as string)).toThrow(
				UserError.InvalidUserEmailError,
			);
			expect(() => user.changeEmail(true as unknown as string)).toThrow(
				UserError.InvalidUserEmailError,
			);
			expect(() => user.changeEmail(1 as unknown as string)).toThrow(
				UserError.InvalidUserEmailError,
			);
			expect(() => user.changeEmail(undefined as unknown as string)).toThrow(
				UserError.InvalidUserEmailError,
			);
			expect(() => user.changeEmail(null as unknown as string)).toThrow(
				UserError.InvalidUserEmailError,
			);
			expect(() => user.changeEmail(NaN as unknown as string)).toThrow(
				UserError.InvalidUserEmailError,
			);
			expect(() => user.changeEmail("")).toThrow(UserError.InvalidUserEmailError);
			expect(() => user.changeEmail("bademail")).toThrow(UserError.InvalidUserEmailError);
			expect(() => user.changeEmail("bad email")).toThrow(UserError.InvalidUserEmailError);
			expect(() => user.changeEmail("bademail.com")).toThrow(UserError.InvalidUserEmailError);
			expect(() => user.changeEmail("@email")).toThrow(UserError.InvalidUserEmailError);
			expect(() => user.changeEmail("bad@email.")).toThrow(UserError.InvalidUserEmailError);
			expect(() => user.changeEmail("bad@email!.com")).toThrow(UserError.InvalidUserEmailError);
			expect(() => user.changeEmail("bad.com@email")).toThrow(UserError.InvalidUserEmailError);
			expect(() => user.changeEmail("bad@@email.com")).toThrow(UserError.InvalidUserEmailError);
			expect(() => user.changeEmail("bad@email..com")).toThrow(UserError.InvalidUserEmailError);
			expect(() => user.changeEmail("用户@示例.email")).toThrow(UserError.InvalidUserEmailError);
			expect(() => user.changeEmail("bad@email")).toThrow(UserError.InvalidUserEmailError);
		});

		it("Should change correctly the username", () => {
			const newUsername = "Jhon22";
			const user = new User(exampleUUID, exampleUsername, exampleEmail);
			user.changeUsername(newUsername);
			expect(user.getName().value === newUsername).toBeTruthy();
		});

		it("Should change correctly the email", () => {
			const newEmail = "new@email.com";
			const user = new User(exampleUUID, exampleUsername, exampleEmail);
			user.changeEmail(newEmail);
			expect(user.getEmail().value === newEmail);
		});
	});
});
