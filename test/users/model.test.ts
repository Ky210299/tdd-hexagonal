import User from "../../src/users/model";

describe("Jest should work", () => {
	it("should work", () => {
		expect(1 + 1).toEqual(2);
	});
});

describe("Users functionalities", () => {
	describe("Create an user", () => {
		it("User model should have an method for create a user calle createUser", () => {
			expect("createUser" in User).toBeTruthy();
		});
	});
});
