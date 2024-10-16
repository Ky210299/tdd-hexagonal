import User from "../../src/users/model";

describe("Jest should work", () => {
	it("should work", () => {
		expect(1 + 1).toEqual(2);
	});
});

describe("Users functionalities", () => {
	describe("Create an user", () => {
		const uuidExample = "123e4567-e89b-12d3-a456-426655440000";
		const exampleEmail = "example@email.com";
		const exampleUsername = "Robert";

		it("Should throw an error if not uuid, username or email is passed", () => {
			expect(() => User.createUser(null, null, null)).toThrow;
			expect(() => User.createUser("", "", "")).toThrow();
			expect(() => User.createUser(undefined, undefined, undefined)).toThrow();
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
			expect(() => User.createUser(uuidExample, 1 as unknown as string, exampleEmail)).toThrow();
			expect(() => User.createUser(uuidExample, true as unknown as string, exampleEmail)).toThrow();
			expect(() => User.createUser(uuidExample, "a s d f ", exampleEmail)).toThrow();
			expect(() => User.createUser(uuidExample, "a!@$", exampleEmail)).toThrow();
			expect(() => User.createUser(uuidExample, {} as unknown as string, exampleEmail)).toThrow();
		});

		it("Should throw an error if not valid email is passed", () => {
			expect(() => User.createUser(uuidExample, exampleUsername, 1 as unknown as string)).toThrow();
			expect(() =>
				User.createUser(uuidExample, exampleUsername, [] as unknown as string),
			).toThrow();
			expect(() =>
				User.createUser(uuidExample, exampleUsername, {} as unknown as string),
			).toThrow();
			expect(() =>
				User.createUser(uuidExample, exampleUsername, true as unknown as string),
			).toThrow();
			expect(() =>
				User.createUser(uuidExample, exampleUsername, "bademail" as unknown as string),
			).toThrow();
			expect(() =>
				User.createUser(uuidExample, exampleUsername, "bad email" as unknown as string),
			).toThrow();
			expect(() =>
				User.createUser(uuidExample, exampleUsername, "bademail.com" as unknown as string),
			).toThrow();
			expect(() =>
				User.createUser(uuidExample, exampleUsername, "@email" as unknown as string),
			).toThrow();
			expect(() =>
				User.createUser(uuidExample, exampleUsername, "bad@email." as unknown as string),
			).toThrow();
			expect(() =>
				User.createUser(uuidExample, exampleUsername, "bad@email!.com" as unknown as string),
			).toThrow();
			expect(() =>
				User.createUser(uuidExample, exampleUsername, "bad.com@email" as unknown as string),
			).toThrow();
			expect(() =>
				User.createUser(uuidExample, exampleUsername, "bad@@email.com" as unknown as string),
			).toThrow();
			expect(() =>
				User.createUser(uuidExample, exampleUsername, "bad@email..com" as unknown as string),
			).toThrow();
			expect(() =>
				User.createUser(uuidExample, exampleUsername, "用户@示例.email" as unknown as string),
			).toThrow();
		});

		it("Should return an user instance", () => {
			const newUser = User.createUser(uuidExample, exampleUsername, exampleEmail);
			expect(newUser instanceof User).toBeTruthy();
		});

		it("The created user should have the passed username and email", () => {
			const username = exampleUsername;
			const email = exampleEmail;
			const newUser = User.createUser(uuidExample, username, email);
			expect(newUser.getEmail() === email).toBeTruthy();
			expect(newUser.getName() === username).toBeTruthy();
		});
	});
});
