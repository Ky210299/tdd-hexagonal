import User from "../../../src/users/domain/model";
import { userService } from "../../../src/users/infrastructure/dependecies";

describe("User Services", () => {
	const exampleUUID = "123e4567-e89b-12d3-a456-426655440000";
	const exampleEmail = "example@email.com";
	const exampleUsername = "Robert";

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
});
