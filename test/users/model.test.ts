import User from "../../src/users/model";

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
			expect(() => User.createUser("1234", exampleUsername, exampleEmail)).toThrow();

			expect(() =>
				User.createUser(1 as unknown as string, exampleUsername, exampleEmail),
			).toThrow();

			expect(() =>
				User.createUser(true as unknown as string, exampleUsername, exampleEmail),
			).toThrow();

			expect(() =>
				User.createUser({} as unknown as string, exampleUsername, exampleEmail),
			).toThrow();
		});

		it("Should throw an error if not valid username", () => {
			expect(() => User.createUser(exampleUUID, 1 as unknown as string, exampleEmail)).toThrow();

			expect(() => User.createUser(exampleUUID, true as unknown as string, exampleEmail)).toThrow();

			expect(() => User.createUser(exampleUUID, "a s d f ", exampleEmail)).toThrow();

			expect(() => User.createUser(exampleUUID, "a!@$", exampleEmail)).toThrow();

			expect(() => User.createUser(exampleUUID, {} as unknown as string, exampleEmail)).toThrow();
		});

		it("Should throw an error if not valid email is passed", () => {
			expect(() => User.createUser(exampleUUID, exampleUsername, 1 as unknown as string)).toThrow();

			expect(() =>
				User.createUser(exampleUUID, exampleUsername, [] as unknown as string),
			).toThrow();

			expect(() =>
				User.createUser(exampleUUID, exampleUsername, {} as unknown as string),
			).toThrow();

			expect(() =>
				User.createUser(exampleUUID, exampleUsername, true as unknown as string),
			).toThrow();

			expect(() =>
				User.createUser(exampleUUID, exampleUsername, "bademail" as unknown as string),
			).toThrow();

			expect(() =>
				User.createUser(exampleUUID, exampleUsername, "bad email" as unknown as string),
			).toThrow();

			expect(() =>
				User.createUser(exampleUUID, exampleUsername, "bademail.com" as unknown as string),
			).toThrow();

			expect(() =>
				User.createUser(exampleUUID, exampleUsername, "@email" as unknown as string),
			).toThrow();

			expect(() =>
				User.createUser(exampleUUID, exampleUsername, "bad@email." as unknown as string),
			).toThrow();

			expect(() =>
				User.createUser(exampleUUID, exampleUsername, "bad@email!.com" as unknown as string),
			).toThrow();

			expect(() =>
				User.createUser(exampleUUID, exampleUsername, "bad.com@email" as unknown as string),
			).toThrow();

			expect(() =>
				User.createUser(exampleUUID, exampleUsername, "bad@@email.com" as unknown as string),
			).toThrow();

			expect(() =>
				User.createUser(exampleUUID, exampleUsername, "bad@email..com" as unknown as string),
			).toThrow();

			expect(() =>
				User.createUser(exampleUUID, exampleUsername, "用户@示例.email" as unknown as string),
			).toThrow();

			expect(() =>
				User.createUser(exampleUUID, exampleUsername, "bad@email" as unknown as string),
			).toThrow();
		});

		it("Should return an user instance", () => {
			const newUser = User.createUser(exampleUUID, exampleUsername, exampleEmail);
			expect(newUser instanceof User).toBeTruthy();
		});

		it("The created user should have the passed id, username and email", () => {
			const newUser = User.createUser(exampleUUID, exampleUsername, exampleEmail);
			expect(newUser.getID() === exampleUUID).toBeTruthy();
			expect(newUser.getEmail() === exampleEmail).toBeTruthy();
			expect(newUser.getName() === exampleUsername).toBeTruthy();
		});
	});
});