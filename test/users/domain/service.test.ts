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
		const sameUser = await userService.findUser(user.getID());
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
});
