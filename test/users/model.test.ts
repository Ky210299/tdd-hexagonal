import User from "../../src/users/model";

describe("Jest should work", () => {
	it("should work", () => {
		expect(1 + 1).toEqual(2);
	});
});

describe("Users functionalities", () => {
	describe("Create an user", () => {
		const uuidExample = "123e4567-e89b-12d3-a456-426655440000";
		it("Should throw an error if not uuid, username or email is passed", () => {
			expect(() => User.createUser(null, null, null)).toThrow;
		});

		it("Should throw an error if not valid uuid is passed", () => {
			expect(() => User.createUser("1234", "Robert", "example@email.com")).toThrow();
		});

		it("Should return an user instance", () => {
			const newUser = User.createUser(uuidExample, "Robert", "example@email.com");
			expect(newUser instanceof User).toBeTruthy();
		});

		it("The created user should have the passed username and email", () => {
			const username = "Robert";
			const email = "example@email.com";
			const newUser = User.createUser(uuidExample, username, email);
			expect(newUser.getEmail() === email).toBeTruthy();
			expect(newUser.getName() === username).toBeTruthy();
		});

		// it("The created user must have an UUID", () => {
		// 	const newUser = User.createUser("id", "Robert", "example@email.com");
		// 	const uuid1 = "123e4567-e89b-12d3-a456-426655440000";
		// 	const uuid2 = "8ca0fd81-fd03-438c-8730-c6c4e7ef4aa9const uuid2 ";
		// 	expect(newUser.getId()).toMatch(
		// 		/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/,
		// 	);
		// });
	});
});
