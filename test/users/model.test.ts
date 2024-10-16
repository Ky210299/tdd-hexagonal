import User from "../../src/users/model";

describe("Jest should work", () => {
	it("should work", () => {
		expect(1 + 1).toEqual(2);
	});
});

describe("Users functionalities", () => {
	const exampleUUID = "123e4567-e89b-12d3-a456-426655440000";
	const exampleEmail = "example@email.com";
	const exampleUsername = "Robert";
	describe("Create an user", () => {
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

		it("The created user should have the passed username and email", () => {
			const username = exampleUsername;
			const email = exampleEmail;
			const newUser = User.createUser(exampleUUID, username, email);
			expect(newUser.getEmail() === email).toBeTruthy();
			expect(newUser.getName() === username).toBeTruthy();
		});
	});

	describe("Follow others users", () => {
		let user1: User;
		let user2: User;
		let user3: User;
		let user4: User;
		beforeEach(() => {
			user1 = User.createUser(exampleUUID, exampleUsername, exampleEmail);
			user2 = User.createUser(
				"123e4567-e89b-12d3-a456-42665544200a",
				"Alfonso",
				"alfonso@email.com",
			);
			user3 = User.createUser("123e4567-e89b-12d3-a456-42665544200b", "Pedro", "pedro@email.com");
			user4 = User.createUser("123e4567-e89b-12d3-a456-42665544200c", "Leo", "leo@email.com");
		});

		it("A new User dont have any follow", () => {
			expect(user1.getTotalFollowers()).toEqual(0);
		});
		it("An new user do not follow to anyone", () => {
			expect(user1.getTotalFolloweds()).toEqual(0);
		});

		it("Should retrive an empty list of followers a new user", () => {
			const followers = user1.getListOfFollowers();
			expect(Array.isArray(followers)).toBeTruthy();
			expect(followers.length).toEqual(0);
		});

		it("Should retrive an empty list of followeds for a new user", () => {
			const followeds = user1.getListOfFollowers();
			expect(Array.isArray(followeds)).toBeTruthy();
			expect(followeds.length).toEqual(0);
		});

		it("Should throw an error if an user try to follow to itself", () => {
			expect(() => user1.follow(user1)).toThrow();
		});

		// })
		// it("An User can follow to other user", () => {
		// 	user1.startToFollow(user2);
		// 	expect(user2.getTotalFollowers()).toEqual(1);
		// });
	});
});
