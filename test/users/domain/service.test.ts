import User, { UserId, Username, UserEmail } from "../../../src/users/domain/model";
import { userService } from "../../../src/users/infrastructure/dependecies";

describe("User Services", () => {
	const exampleUUID = "123e4567-e89b-12d3-a456-426655440000";
	const exampleEmail = "example@email.com";
	const exampleUsername = "Jhon";

	it("Should save an user in the database", async () => {
		const user = new User(exampleUUID, exampleUsername, exampleEmail);
		expect(async () => await userService.saveUser(user)).not.toThrow();
	});

	it("Should retrieve an user in the database", async () => {
		const user = new User(exampleUUID, exampleUsername, exampleEmail);
		await userService.saveUser(user);
		const sameUser = await userService.findUser(user.getID().value);
		expect(sameUser).not.toBe(undefined);
		if (sameUser) expect(user.getID().value === sameUser.getID().value);
	});

	it("Should return an list of users", async () => {
		const user1 = new User(exampleUUID, exampleUsername, exampleEmail);
		const user2 = new User("123e4567-e89b-12d3-a456-42665544000a", "ky21", "email2@gmail.com");
		const user3 = new User("123e4567-e89b-12d3-a456-42665544000b", "Rob", "email1@go.com");
		await userService.saveUser(user1);
		await userService.saveUser(user2);
		await userService.saveUser(user3);
		const users = await userService.findAllUsers();
		expect(users).toBeDefined();
		expect(Array.isArray(users)).toBeTruthy();
		expect(users.length > 0).toBeTruthy();
		expect(users.every((e) => e instanceof User)).toBeTruthy();
	});

	it("Should change the email and username of an user", async () => {
		const user = new User(exampleUUID, exampleUsername, exampleEmail);
		const newUserData = new User("123e4567-e89b-12d3-a456-426655440000", "rob", "rob@mail.com");
		try {
			await userService.saveUser(user);
			await userService.changeUserData(user.getID().value, newUserData);
			const changedUser = await userService.findUser(newUserData.getID().value);
			expect(changedUser).toBeDefined();
			if (!changedUser) throw 1;
			expect(
				changedUser.getEmail().value !== exampleEmail &&
					changedUser.getEmail().value === "rob@mail.com",
			).toBe(true);
			expect(
				changedUser.getName().value !== exampleUsername && changedUser.getName().value === "rob",
			).toBe(true);
		} catch (err) {
			throw err;
		}
	});

	it("Should delete an user", async () => {
		const user = new User(exampleUUID, exampleUsername, exampleEmail);
		try {
			await userService.saveUser(user);
			expect((await userService.findUser(user.getID().value)) instanceof User).toBe(true);
			await userService.deleteUser(user.getID().value);
			expect(await userService.findUser(user.getID().value)).toBeUndefined();
		} catch (err) {
			throw err;
		}
	});

	it("Should throw an error if the user does not exist when try to delete it", async () => {
		try {
			await userService.deleteUser(exampleUUID);
		} catch (err) {
			console.log(err);
			expect(err).toBe(1);
		}
	});

	it("Should return undefind when try to find an user that does not exist", async () => {
		try {
			const user = await userService.findUser(exampleUUID);
			expect(user).toBeUndefined();
		} catch (err) {
			throw err;
		}
	});

	describe("Following feature", () => {
		it("Should throw an error if try to follow it self", async () => {
			try {
				await userService.follow(exampleUUID, exampleUUID);
			} catch (err) {
				expect(err).toMatch("follow it self");
			}
		});

		it("Should follow to other user", async () => {
			const user1 = new User("123e4567-e89b-12d3-a456-426655440000", "rob", "rob@mail.com");
			const user2 = new User("123e4567-e89b-12d3-a456-42665544000a", "Jhon", "jhon@mail.com");
			try {
				await userService.follow(user2.getID().value, user1.getID().value);
				const followers = await userService.findFollowersOfUser(user1.getID().value);
				expect(followers[0]).toStrictEqual(user1);
			} catch (err) {
				throw err;
			}
		});

		it("Should retrieve a list with all followers of an user", async () => {
			const user1 = new User("123e4567-e89b-12d3-a456-426655440000", "rob", "rob@mail.com");
			const user2 = new User("123e4567-e89b-12d3-a456-42665544000a", "Jhon", "jhon@mail.com");
			try {
				await userService.follow(user2.getID().value, user1.getID().value);
				const followers = await userService.findFollowersOfUser(user1.getID().value);
				expect(Array.isArray(followers)).toBeTruthy();
				expect(followers.length > 0).toBeTruthy();
				expect(followers.every((follower) => follower instanceof User)).toBeTruthy();
			} catch (err) {
				throw err;
			}
		});

		it("Should retrieve a list with all followers users of a specific user", async () => {
			const user1 = new User("123e4567-e89b-12d3-a456-426655440000", "rob", "rob@mail.com");
			const user2 = new User("123e4567-e89b-12d3-a456-42665544000a", "Jhon", "jhon@mail.com");
			try {
				userService.follow(user2.getID().value, user1.getID().value);
			} catch (err) {
				throw err;
			}
			try {
				const followers = await userService.findFollowersOfUser(exampleUUID);
				expect(Array.isArray(followers)).toBeTruthy();
				expect(followers.length > 0);
				expect(followers.every((follower) => follower instanceof User));
			} catch (err) {
				throw err;
			}
		});

		it("Should retrieve a list with the followed users by an user", async () => {
			const user1 = new User("123e4567-e89b-12d3-a456-426655440000", "rob", "rob@mail.com");
			const user2 = new User("123e4567-e89b-12d3-a456-42665544000a", "Jhon", "jhon@mail.com");
			try {
				await userService.follow(user2.getID().value, user1.getID().value);
				await userService.follow(user2.getID().value, user1.getID().value);
			} catch (err) {
				throw err;
			}

			try {
				const user1Id = user1.getID().value;
				const followeds = await userService.findFollowedsByUser(user1Id);
				expect(Array.isArray(followeds)).toBeTruthy();
				expect(followeds.length > 0).toBeTruthy();
				expect(followeds.every((followed) => followed instanceof User)).toBeTruthy();
			} catch (err) {
				throw err;
			}
		});

		it("Should return true when an user is following to another", async () => {
			const user1 = new User("123e4567-e89b-12d3-a456-426655440000", "rob", "rob@mail.com");
			const user2 = new User("123e4567-e89b-12d3-a456-42665544000a", "Jhon", "jhon@mail.com");
			try {
				await userService.follow(user2.getID().value, user1.getID().value);
				const user1Id = user1.getID().value;
				const user2Id = user2.getID().value;
				const isFollowing = await userService.isFollowing(user2Id, user1Id);
				expect(isFollowing).toBe(true);
			} catch (err) {
				throw err;
			}
		});
	});
});
