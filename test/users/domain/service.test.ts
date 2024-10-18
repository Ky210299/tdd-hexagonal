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
			expect(followers[0]).toBe(user1);
		} catch (err) {}
	});

	it("Should retrieve a list with all followers of an user", async () => {
		try {
			const followers = await userService.findFollowersOfUser(exampleUUID);
			expect(Array.isArray(followers)).toBeTruthy();
			expect(followers.length > 0);
			expect(followers.every((follower) => follower instanceof User));
		} catch (err) {}
	});
});
